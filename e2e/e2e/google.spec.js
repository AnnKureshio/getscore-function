const { test, expect } = require('@playwright/test');

test('Проверка ввода и очистки поискового запроса', async ({ page }) => {
  await page.goto('https://google.com');

  const searchInput = page.locator('[name="q"]');

  // Вводим текст
  await searchInput.fill('playwright testing');
  await expect(searchInput).toHaveValue('playwright testing');

  // Очищаем поле
  await searchInput.clear();
  await expect(searchInput).toHaveValue('');

  console.log('✅ Функция ввода и очистки запроса работает');
});

test('Проверка доступности и функциональности поисковой строки', async ({ page }) => {
  await page.goto('https://google.com');

  const searchInput = page.locator('[name="q"]');

  // Проверяем что поле доступно для ввода
  await expect(searchInput).toBeEnabled();
  await expect(searchInput).toBeEditable();

  // Проверяем возможность фокуса
  await searchInput.click();
  await expect(searchInput).toBeFocused();

  console.log('✅ Поисковая строка полностью функциональна');
});

test('Проверка базовой навигации по странице', async ({ page }) => {
  await page.goto('https://google.com');

  // Проверяем заголовок страницы
  await expect(page).toHaveTitle(/Google/);

  // Проверяем что страница загрузилась
  await expect(page.locator('body')).toBeVisible();

  // Проверяем URL
  await expect(page).toHaveURL('https://www.google.com/');

  console.log('✅ Базовая навигация и загрузка страницы работает');
});

test('Проверка изменения состояния поисковой строки', async ({ page }) => {
  await page.goto('https://google.com');

  const searchInput = page.locator('[name="q"]');

  // Проверяем начальное состояние
  await expect(searchInput).toHaveValue('');

  // Изменяем состояние - вводим текст
  await searchInput.fill('тестовый запрос');
  await expect(searchInput).toHaveValue('тестовый запрос');

  // Проверяем что состояние изменилось
  await expect(searchInput).not.toHaveValue('');

  console.log('✅ Изменение состояния поисковой строки работает корректно');
});

test('Проверка responsiveness интерфейса', async ({ page }) => {
  await page.goto('https://google.com');

  // Проверяем что интерфейс реагирует на действия
  const searchInput = page.locator('[name="q"]');

  // Фокус на поле ввода
  await searchInput.click();
  await expect(searchInput).toBeFocused();

  // Ввод текста
  await searchInput.fill('test');
  await expect(searchInput).toHaveValue('test');

  // Проверяем что страница не сломалась после действий
  await expect(page.locator('body')).toBeVisible();

  console.log('✅ Интерфейс корректно реагирует на пользовательские действия');
});
