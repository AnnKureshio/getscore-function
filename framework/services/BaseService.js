// Импортируем библиотеку для отправки запросов и настройки
import axios from 'axios';
import { config } from '../config/config.js';

// Главный класс-помощник для работы с сайтом
class BaseService {
  constructor() {
    // Настраиваем axios
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000
    });
  }

  // Метод для получения информации (GET запрос)
  async get(url, options = {}) {
    const response = await this.client.get(url, options);
    return response.data;
  }

  // Метод для отправки информации (POST запрос)
  async post(url, data, options = {}) {
    const response = await this.client.post(url, data, options);
    return response.data;
  }

  // Метод для обновления информации (PUT запрос)
  async put(url, data, options = {}) {
    const response = await this.client.put(url, data, options);
    return response.data;
  }

  // Метод для удаления информации (DELETE запрос)
  async delete(url, options = {}) {
    const response = await this.client.delete(url, options);
    return response.data;
  }
}

// Делаем класс доступным для использования в других файлах
export default BaseService;
