const BasePage = require('./BasePage');

class MainPage extends BasePage {
  constructor(page) {
    super(page);

    // Локаторы главной страницы
    this.searchInput = '#small-searchterms';
    this.searchButton = 'input[value="Search"]';
    this.searchResults = '.product-item';
    this.productTitles = '.product-title a';
    this.noResultsMessage = '.no-result';
    this.categoriesMenu = '.top-menu';
  }

  async navigateToMain() {
    await this.navigateTo('https://demowebshop.tricentis.com');
  }

  async searchForProduct(productName) {
    await this.fillField(this.searchInput, productName);
    await this.clickElement(this.searchButton);
    await this.waitForTimeout(2000);
  }

  async getSearchResultsCount() {
    return await this.page.locator(this.searchResults).count();
  }

  async getProductTitles() {
    return await this.page.locator(this.productTitles).allTextContents();
  }

  async isNoResultsVisible() {
    return await this.page.isVisible(this.noResultsMessage);
  }

  async selectCategory(categoryName) {
    await this.clickElement(`a:has-text("${categoryName}")`);
  }
}

module.exports = MainPage;
