// playwright-e2e-webshop-tests/tests/auth.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const { getTestUser } = require('../utils/test-data');

test.describe('Авторизация в Demo Web Shop', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('Успешная авторизация с зарегистрированным пользователем', async ({ page }) => {
    // Регистрация пользователя
    const testUser = getTestUser();

    console.log('🆕 Сначала регистрируем:', testUser.email);
    await page.goto('https://demowebshop.tricentis.com/register');
    await page.fill('#FirstName', testUser.firstName);
    await page.fill('#LastName', testUser.lastName);
    await page.fill('#Email', testUser.email);
    await page.fill('#Password', testUser.password);
    await page.fill('#ConfirmPassword', testUser.password);
    await page.click('#register-button');
    await expect(page.locator('text=Your registration completed')).toBeVisible();

    // Логинимся
    console.log('🔐 Логинимся с:', testUser.email);
    await loginPage.navigateToLogin();
    await loginPage.login(testUser.email, testUser.password);

    // Проверяем
    console.log('📄 Текущий URL:', await page.url());
    const isLoggedIn = await page.isVisible('a[href="/logout"]');
    console.log('👀 Logout виден:', isLoggedIn);

    expect(isLoggedIn).toBeTruthy();
    console.log('✅ Успешная авторизация!');
  });
});
