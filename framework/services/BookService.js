// Импорт
import BaseService from './BaseService.js';
import { config } from '../config/config.js';

// Специальный класс для работы с книгами
class BookService extends BaseService {

  // Метод для получения всех книг
  async getBooks() {
    try {
      const response = await this.get(config.endpoints.bookstore.books);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Метод для получения информации о книге
  async getBook(isbn) {
    try {
      const response = await this.get(
        `${config.endpoints.bookstore.book}?ISBN=${isbn}`
      );
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Метод для добавления книги
  async addBookToUser(userId, isbn, token) {
    try {
      const response = await this.post(
        config.endpoints.bookstore.books,
        {
          userId: userId,
          collectionOfIsbns: [
            {
              isbn: isbn
            }
          ]
        },
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

  // Метод для обновления книги
  async updateBookForUser(userId, currentIsbn, newIsbn, token) {
    try {
      const response = await this.put(
        `${config.endpoints.bookstore.books}/${currentIsbn}`,
        {
          userId: userId,
          isbn: newIsbn
        },
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

  // Метод для удаления книги
  async deleteBookFromUser(userId, isbn, token) {
    try {
      const response = await this.delete(
        config.endpoints.bookstore.book,
        {
          data: {
            isbn: isbn,
            userId: userId
          },
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

  // Метод для удаления всех книг у пользователя
  async deleteAllBooksFromUser(userId, token) {
    try {
      const response = await this.delete(
        `${config.endpoints.bookstore.books}?UserId=${userId}`,
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
export default BookService;
