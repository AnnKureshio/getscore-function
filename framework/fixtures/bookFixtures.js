// Импортируем настройки
import { config } from '../config/config.js';

// Класс для создания тестовых данных книг
export class BookFixtures {

  // Метод для получения тестовой книги из конфига
  static getTestBook() {
    return {
      isbn: config.testData.testBook.isbn,
      title: config.testData.testBook.title
    };
  }

  // Метод для создания данных добавления книги
  static generateAddBookData(userId, isbn) {
    return {
      userId: userId,
      collectionOfIsbns: [
        {
          isbn: isbn
        }
      ]
    };
  }

  // Метод для создания данных обновления книги
  static generateUpdateBookData(userId, newIsbn) {
    return {
      userId: userId,
      isbn: newIsbn
    };
  }

  // Метод для создания данных удаления книги
  static generateDeleteBookData(userId, isbn) {
    return {
      isbn: isbn,
      userId: userId
    };
  }

  // Метод для получения разных ISBN книг (для параметризованных тестов)
  static getDifferentBooks() {
    return [
      {
        isbn: '9781449325862',
        title: 'Git Pocket Guide'
      },
      {
        isbn: '9781449331818',
        title: 'Learning JavaScript Design Patterns'
      },
      {
        isbn: '9781491904244',
        title: 'You Don\'t Know JS'
      }
    ];
  }

  // Метод для создания невалидных данных книги
  static generateInvalidBookData() {
    return {
      userId: 'invalid-user-id',
      collectionOfIsbns: [
        {
          isbn: 'invalid-isbn-123'
        }
      ]
    };
  }
}
