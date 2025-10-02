const { test, expect } = require('@playwright/test');
const MainPage = require('../pages/MainPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');

test.describe('Корзина покупок в Demo Web Shop', () => {
  let mainPage, productPage, cartPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await mainPage.navigateToMain();
  });

  test('Добавление товара в корзину', async () => {
    // Ищем и добавляем товар
    await mainPage.searchForProduct('book');
    await mainPage.page.click('.product-title a'); // Переходим на страницу товара

    const productTitle = await productPage.getProductTitle();
    console.log('📖 Добавляем товар:', productTitle);

    await productPage.addToCart();

    // Проверяем что товар добавлен в корзину
    const cartQuantity = await productPage.getCartQuantity();
    console.log('🛒 Количество товаров в корзине:', cartQuantity);

    expect(cartQuantity).toBeGreaterThan(0);
    console.log('✅ Товар успешно добавлен в корзину');
  });

  test('Добавление нескольких товаров в корзину', async () => {
    // Добавляем первый товар
    await mainPage.searchForProduct('computer');
    await mainPage.page.locator('.product-title a').first().click();
    await productPage.addToCart(2); // 2 штуки

    // Возвращаемся и добавляем второй товар
    await mainPage.navigateToMain();
    await mainPage.searchForProduct('book');
    await mainPage.page.click('.product-title a');
    await productPage.addToCart();

    const cartQuantity = await productPage.getCartQuantity();
    console.log('🛒 Общее количество товаров в корзине:', cartQuantity);

    expect(cartQuantity).toBeGreaterThan(2);
    console.log('✅ Несколько товаров добавлены в корзину');
  });

  test('Просмотр корзины и проверка содержимого', async () => {
    // Сначала добавляем товар
    await mainPage.searchForProduct('book');
    await mainPage.page.click('.product-title a');
    await productPage.addToCart();

    // Переходим в корзину
    await productPage.goToShoppingCart();

    const itemsCount = await cartPage.getCartItemsCount();
    const productNames = await cartPage.getProductNames();

    console.log('📋 Товаров в корзине:', itemsCount);
    console.log('🏷️ Названия товаров:', productNames);

    expect(itemsCount).toBeGreaterThan(0);
    expect(productNames.length).toBeGreaterThan(0);
    console.log('✅ Корзина отображается корректно');
  });

  test('Изменение количества товара в корзине', async () => {
    // Добавляем товар
    await mainPage.searchForProduct('book');
    await mainPage.page.click('.product-title a');
    await productPage.addToCart();

    // Переходим в корзину и меняем количество
    await cartPage.navigateToCart();
    await cartPage.updateQuantity(0, 3); // Меняем на 3 штуки

    const itemsCount = await cartPage.getCartItemsCount();
    console.log('🔢 Количество товаров после изменения:', itemsCount);

    expect(itemsCount).toBe(1); // Все еще один товар, но в большем количестве
    console.log('✅ Количество товара изменено');
  });

  test('Удаление товара из корзины', async () => {
    // Добавляем товар
    await mainPage.searchForProduct('book');
    await mainPage.page.click('.product-title a');
    await productPage.addToCart();

    // Переходим в корзину и удаляем
    await cartPage.navigateToCart();
    await cartPage.removeItem(0);

    const isCartEmpty = await cartPage.isEmptyCartMessageVisible();
    const itemsCount = await cartPage.getCartItemsCount();

    console.log('🗑️ Корзина пуста:', isCartEmpty);
    console.log('📦 Товаров в корзине:', itemsCount);

    expect(isCartEmpty).toBeTruthy();
    expect(itemsCount).toBe(0);
    console.log('✅ Товар успешно удален из корзины');
  });
});
