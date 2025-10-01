// Импортируем настройки
import { config } from '../config/config.js';

// Класс для создания тестовых пользователей
export class UserFixtures {

  // Метод для создания уникального имени пользователя
  static generateUniqueUserName() {
    return `testuser_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  }
  static getValidPassword() {
    return config.testData.validPassword;
  }
  static generateValidUser() {
    return {
      userName: this.generateUniqueUserName(), // Уникальное имя
      password: this.getValidPassword()        // Правильный пароль
    };
  }

  // Метод для создания невалидного пользователя (для тестов ошибок)
  static generateInvalidUser() {
    return {
      userName: 'nonexistentuser',       // Несуществующее имя
      password: 'WrongPassword123!'      // Неправильный пароль
    };
  }
}
