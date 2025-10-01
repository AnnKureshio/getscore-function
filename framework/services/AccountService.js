// Импорт
import BaseService from './BaseService.js';
import { config } from '../config/config.js';

// Класс для работы с пользователями
class AccountService extends BaseService {

  // Метод для проверки логина и пароля (авторизация)
  async authorizeUser(userName, password) {
    try {
      const response = await this.post(config.endpoints.account.authorized, {
        userName,
        password
      });
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Метод для создания нового пользователя
  async createUser(userName, password) {
    try {
      // Создаем нового пользователя на сайте
      const response = await this.post(config.endpoints.account.user, {
        userName,
        password
      });
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Метод для получения специального ключа (токена)
  async generateToken(userName, password) {
    try {
      // Получаем ключ для доступа к сайту
      const response = await this.post(config.endpoints.account.generateToken, {
        userName,
        password
      });
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Метод для получения информации о пользователе
  async getUser(userId, token) {
    try {
      const response = await this.get(
        `${config.endpoints.account.user}/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Метод для удаления пользователя
  async deleteUser(userId, token) {
    try {
      const response = await this.delete(
        `${config.endpoints.account.user}/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }
}

// Делаем класс доступным для использования
export default AccountService;
