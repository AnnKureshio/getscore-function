// Настройки для тестов
export const config = {
  // Адрес сайта, который тестируем
  baseUrl: 'https://bookstore.demoqa.com',

  // Адреса разных страниц сайта
  endpoints: {
    account: {
      authorized: '/Account/v1/Authorized',      // Страница входа
      user: '/Account/v1/User',                  // Страница пользователя
      generateToken: '/Account/v1/GenerateToken' // Страница получения ключа
    }
  },

  // Стандартный пароль для тестов
  testData: {
    validPassword: 'TestPassword123!'
  }
};
