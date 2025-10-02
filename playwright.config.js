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
    }
  ]
});
