const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'https://google.com',
  },

  projects: [
    {
      name: 'google-tests',
      testDir: './e2e',
      use: {
        baseURL: 'https://google.com',
      },
    },
    {
      name: 'market-tests',
      testDir: './market-tests/tests',
      use: {
        baseURL: 'https://market.yandex.ru',
      },
    },
    {
      name: 'webshop-tests',
      testDir: './playwright-e2e-webshop-tests/tests',
      use: {
        baseURL: 'https://demowebshop.tricentis.com',
        headless: false,
        screenshot: 'on',
        trace: 'on',
      },
    }
  ],

  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }]
  ],
});
