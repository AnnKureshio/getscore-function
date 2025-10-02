const BasePage = require('./BasePage');

class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = 'input[placeholder="Поиск курса"]';
    this.logo = 'img[alt="OTUS Logo"]';
  }

  async open() {
    await this.navigateTo('https://otus.ru');
    await this.page.waitForTimeout(1000);
  }

  async searchFor(query) {
    await this.page.fill(this.searchInput, query);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(1000);
  }
}

module.exports = MainPage;
