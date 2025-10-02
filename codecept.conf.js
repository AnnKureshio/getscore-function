const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

exports.config = {
  tests: './codecept-tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://otus.ru',
      show: true,
      waitForTimeout: 10000
    }
  },
  include: {
    I: './steps_file.js',
    OTUSPage: './codecept-tests/pages/OTUSPage.js'
  },
  name: 'getscore-function'
};
