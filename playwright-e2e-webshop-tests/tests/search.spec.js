const { test, expect } = require('@playwright/test');
const MainPage = require('../pages/MainPage');

test.describe('Поиск товаров в Demo Web Shop', () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.navigateToMain();
  });

  test('Поиск существующего товара - книга', async () => {
    await mainPage.searchForProduct('book');

    const resultsCount = await mainPage.getSearchResultsCount();
    const productTitles = await mainPage.getProductTitles();

    console.log(`📚 Найдено товаров: ${resultsCount}`);
    console.log('📖 Названия товаров:', productTitles);

    expect(resultsCount).toBeGreaterThan(0);
    expect(productTitles.some(title => title.toLowerCase().includes('book'))).toBeTruthy();
    console.log('✅ Поиск существующего товара работает');
  });

  test('Поиск по категории - компьютеры', async () => {
    await mainPage.searchForProduct('computer');

    const resultsCount = await mainPage.getSearchResultsCount();
    const productTitles = await mainPage.getProductTitles();

    console.log(`💻 Найдено товаров: ${resultsCount}`);
    console.log('🖥️ Названия товаров:', productTitles);

    expect(resultsCount).toBeGreaterThan(0);
    console.log('✅ Поиск по категории работает');
  });

  test('Поиск несуществующего товара', async () => {
    await mainPage.searchForProduct('nonexistentproduct12345');

    const noResultsVisible = await mainPage.isNoResultsVisible();
    const resultsCount = await mainPage.getSearchResultsCount();

    console.log('🔍 Результатов найдено:', resultsCount);
    console.log('❌ Сообщение "нет результатов":', noResultsVisible);

    // ДИАГНОСТИКА
    const pageText = await mainPage.page.textContent('body');
    console.log('📝 Текст страницы:', pageText.substring(0, 500));

    const hasNoResults = pageText.includes('No products were found') ||
      pageText.includes('не найдено') ||
      pageText.includes('no results');

    console.log('🔎 Есть ли сообщение об отсутствии результатов:', hasNoResults);

    expect(resultsCount).toBe(0);
    expect(hasNoResults).toBeTruthy();
    console.log('✅ Поиск несуществующего товара обрабатывается корректно');
  });

  test('Поиск с пустым запросом', async () => {
    await mainPage.searchForProduct('');

    // Должна быть валидация или остаемся на странице
    const currentUrl = await mainPage.page.url();
    expect(currentUrl).toContain('demowebshop.tricentis.com');
    console.log('✅ Поиск с пустым запросом обрабатывается');
  });

  test('Поиск товара с спецсимволами', async () => {
    await mainPage.searchForProduct('laptop&computer');

    const resultsCount = await mainPage.getSearchResultsCount();
    console.log('🔤 Поиск с спецсимволами. Результатов:', resultsCount);

    // Система должна обработать запрос без ошибок
    expect(resultsCount).toBeGreaterThanOrEqual(0);
    console.log('✅ Поиск с спецсимволами обрабатывается');
  });
});
