# Automated E2E Testing for Demo Web Shop

## Project Overview
Разработка E2E тестов для интернет-магазина Demo Web Shop с использованием Playwright Framework

## Выполненные требования
- ✅ **10+ функциональных тестов** (реализовано 12 тестов)
- ✅ **Page Object Pattern** (5 Page Objects)
- ✅ **Репортер** (HTML отчет)
- ✅ **Техники тест-дизайна** (эквивалентные классы, граничные значения)
- ✅ **E2E тестирование** реального сайта

## Покрытие тестами
| Модуль | Количество тестов | Статус |
|--------|------------------|---------|
| 🔐 Авторизация | 4 теста | ✅ |
| 📝 Регистрация | 1 тест | ✅ |
| 🔍 Поиск товаров | 5 тестов | ✅ |
| 🛒 Корзина покупок | 5 тестов | ✅ |
| **Всего** | **15 тестовых сценариев** | **✅** |

## Архитектура проекта
playwright-e2e-webshop-tests
├── pages
│ ├── BasePage.js
│ ├── CartPage.js
│ ├── LoginPage.js
│ ├── MainPage.js
│ └── ProductPage.js
├── tests
│ ├── auth.spec.js
│ ├── cart.spec.js
│ ├── registration.spec.js
│ └── search.spec.js
├── utils
│ └── test-data.js
└── README.md

# Установка зависимостей
npm install

# Запуск всех тестов
npx playwright test --project=webshop-tests --reporter=html

# Запуск тестов с браузером
npx playwright test --project=webshop-tests --headed

# Просмотр отчета
npx playwright show-report

Примененные техники тест-дизайна:
- Эквивалентное разбиение (валидные/невалидные данные)
- Граничные значения (длина запросов)
- Позитивные и негативные сценарии
- Переходы между состояниями
- Таблицы решений

Технологии:
- Playwright 1.40+
- JavaScript/Node.js
- HTML Reporter
- Page Object Pattern
