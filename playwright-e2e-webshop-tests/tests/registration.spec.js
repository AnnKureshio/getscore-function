// playwright-e2e-webshop-tests/tests/registration.spec.js
const { test, expect } = require('@playwright/test');
const { getTestUser } = require('../utils/test-data');

test('Регистрация нового пользователя', async ({ page }) => {
  const testUser = getTestUser();

  await page.goto('https://demowebshop.tricentis.com/register');
  console.log('🆕 Регистрируем пользователя:', testUser.email);

  await page.fill('#FirstName', testUser.firstName);
  await page.fill('#LastName', testUser.lastName);
  await page.fill('#Email', testUser.email);
  await page.fill('#Password', testUser.password);
  await page.fill('#ConfirmPassword', testUser.password);
  await page.click('#register-button');

  await expect(page.locator('text=Your registration completed')).toBeVisible();
  console.log('✅ Пользователь зарегистрирован!');

  // Сохраняем данные
  global.registeredUser = testUser;
});
