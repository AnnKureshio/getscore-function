// Импорт
import AccountService from '../../framework/services/AccountService.js';
import { UserFixtures } from '../../framework/fixtures/userFixtures.js';

// Тесты для сайта BookStore
describe('BookStore API Tests', () => {
  let accountService;
  let testUser;
  let userId;
  let token;

  beforeAll(() => {
    accountService = new AccountService();
  });

  // Новый пользователь
  beforeEach(() => {
    testUser = UserFixtures.generateValidUser();
  });

  // ТЕСТ Проверка входа на сайт
  describe('POST /Account/v1/Authorized - Авторизация пользователя', () => {
    test('Должен успешно войти с правильными логином и паролем', async () => {
      // 1. Создание пользователя на сайте
      const createResponse = await accountService.createUser(
        testUser.userName,
        testUser.password
      );
      expect(createResponse.success).toBe(true);
      userId = createResponse.data.userID;

      // Генерируем токен для пользователя
      const tokenResponse = await accountService.generateToken(
        testUser.userName,
        testUser.password
      );
      console.log('🔑 Ответ генерации токена:', tokenResponse);
      expect(tokenResponse.success).toBe(true);
      expect(tokenResponse.data.token).toBeDefined();
      expect(tokenResponse.data.status).toBe('Success');

      // Авторизация
      const authResponse = await accountService.authorizeUser(
        testUser.userName,
        testUser.password
      );
      console.log('📦 Ответ авторизации:', authResponse);

      // Проверка
      expect(authResponse.success).toBe(true);
      expect(authResponse.data).toBe(true);
    });

    test('Не должен войти с неправильными логином и паролем', async () => {
      // Создаем невалидного пользователя
      const invalidUser = UserFixtures.generateInvalidUser();

      // Пытаемся войти с неправильными данными
      const authResponse = await accountService.authorizeUser(
        invalidUser.userName,
        invalidUser.password
      );

      // Проверяем, что получили ошибку
      expect(authResponse.success).toBe(false);
      expect(authResponse.error.code).toBe('1207');
      expect(authResponse.error.message).toBe('User not found!');
    });
  });

  // ТЕСТ 2: Получение информации о пользователе
  describe('GET /Account/v1/User/{userId} - Получение информации о пользователе', () => {
    beforeEach(async () => {
      // Создаем пользователя
      const createResponse = await accountService.createUser(
        testUser.userName,
        testUser.password
      );
      userId = createResponse.data.userID;

      // Получаем ключ доступа
      const tokenResponse = await accountService.generateToken(
        testUser.userName,
        testUser.password
      );
      token = tokenResponse.data.token;
    });

    test('Должен получить информацию о пользователе с правильным ключом', async () => {
      // Получаем информацию о пользователе
      const userResponse = await accountService.getUser(userId, token);

      // Проверяем, что информация правильная
      expect(userResponse.success).toBe(true);
      expect(userResponse.data.userId).toBe(userId);
      expect(userResponse.data.username).toBe(testUser.userName);
      expect(Array.isArray(userResponse.data.books)).toBe(true); // Должен быть массив книг
    });

    test('Не должен получить информацию с неправильным ключом', async () => {
      // Пытаемся получить информацию с неправильным ключом
      const userResponse = await accountService.getUser(userId, 'invalid_token');

      // Проверяем, что получили ошибку
      expect(userResponse.success).toBe(false);
      expect(userResponse.error.code).toBe('1200');
    });
  });

  // ТЕСТ 3: Удаление пользователя
  describe('DELETE /Account/v1/User/{userId} - Удаление пользователя', () => {
    beforeEach(async () => {
      const createResponse = await accountService.createUser(
        testUser.userName,
        testUser.password
      );
      userId = createResponse.data.userID;

      const tokenResponse = await accountService.generateToken(
        testUser.userName,
        testUser.password
      );
      token = tokenResponse.data.token;
    });

    test('Должен успешно удалить пользователя', async () => {
      const deleteResponse = await accountService.deleteUser(userId, token);

      // Проверяем, что удаление успешно
      expect(deleteResponse.success).toBe(true);

      // Проверяем, что пользователь действительно удален
      const getUserResponse = await accountService.getUser(userId, token);
      expect(getUserResponse.success).toBe(false);
    });

    test('Не должен удалить пользователя с неправильным ключом', async () => {
      // Пытаемся удалить с неправильным ключом
      const deleteResponse = await accountService.deleteUser(userId, 'invalid_token');

      // Проверяем, что получили ошибку
      expect(deleteResponse.success).toBe(false);
      expect(deleteResponse.error.code).toBe('1200');
    });
  });
});
