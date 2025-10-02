const { test, expect } = require('@playwright/test');
const MainPage = require('../pages/MainPage');

test.describe('OTUS.ru - Ключевые техники тест-дизайна', () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.open();
  });

  // 1. ГРАНИЧНЫЕ ЗНАЧЕНИЯ - Boundary Value Analysis
  test('1. Граничные значения поисковых запросов - BVA', async ({ page }) => {
    const boundaryQueries = ['', 'Java'];

    for (const query of boundaryQueries) {
      await mainPage.searchFor(query);
      const hasContent = await page.locator('body').isVisible();
      expect(hasContent).toBeTruthy();
      console.log(`✅ BVA: "${query || 'пустой запрос'}" - страница загружена`);
      await mainPage.open();
    }
  });

  // 2. ПОЗИТИВНЫЕ СЦЕНАРИИ - Positive Testing
  test('2. Позитивные сценарии поиска курсов', async ({ page }) => {
    const positiveQueries = ['Java', 'Python'];

    for (const query of positiveQueries) {
      await mainPage.searchFor(query);
      await expect(page.locator('body')).toContainText(/курс|найдено|результат/i);
      console.log(`✅ Позитивный: "${query}" - курсы найдены`);
      await mainPage.open();
    }
  });

  // 3. ТАБЛИЦА РЕШЕНИЙ - Decision Table
  test('3. Таблица решений для комбинаций поиска', async ({ page }) => {
    const decisionTable = [
      { query: 'программирование', expected: 'курс' }
    ];

    for (const testCase of decisionTable) {
      await mainPage.searchFor(testCase.query);
      await expect(page.locator('body')).toContainText(new RegExp(testCase.expected, 'i'));
      console.log(`✅ Таблица решений: "${testCase.query}" → "${testCase.expected}"`);
      await mainPage.open();
    }
  });

  // 4. ПЕРЕХОДЫ СОСТОЯНИЙ - State Transition
  test('4. Переходы между состояниями сайта', async ({ page }) => {
    // Состояние 1: Главная страница
    await expect(page.locator(mainPage.logo)).toBeVisible();
    console.log('✅ Состояние 1: Главная страница');

    // Переход 1: Поиск → Состояние 2: Результаты
    await mainPage.searchFor('JavaScript');
    await expect(page.locator('body')).toContainText(/JavaScript|курс/i);
    console.log('✅ Состояние 2: Страница результатов');

    // Переход 2: Клик по лого → Состояние 3: Главная
    await page.click(mainPage.logo);
    await expect(page.locator(mainPage.searchInput)).toBeVisible();
    console.log('✅ Состояние 3: Возврат на главную');
  });

  // 5. НЕГАТИВНОЕ ТЕСТИРОВАНИЕ - Negative Testing
  test('5. Негативные сценарии поиска', async ({ page }) => {
    const negativeQueries = [
      'asdfghjkl12345', // Бессмысленный запрос
      '!!!!!!!!!'       // Спецсимволы
    ];

    for (const query of negativeQueries) {
      await mainPage.searchFor(query);
      const bodyText = await page.locator('body').textContent();
      const hasReasonableResponse = bodyText.includes('найдено') ||
        bodyText.includes('результат') ||
        bodyText.includes('курс');
      expect(hasReasonableResponse).toBeTruthy();
      console.log(`✅ Негативный: "${query}" - система не сломалась`);
      await mainPage.open();
    }
  });
});
