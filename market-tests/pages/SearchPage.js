const BasePage = require('./BasePage');

class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchResults = '[data-zone-name="searchResults"]';
    this.productCards = '[data-zone-name="product"]';
    this.priceFilter = '[data-auto="filter-range-glprice"]';
    this.sortDropdown = '[data-autotest-id="sorting"]';
  }

  async getSearchResultsCount() {
    return await this.page.locator(this.productCards).count();
  }

  async selectFirstProduct() {
    await this.page.locator(this.productCards).first().click();
  }

  async setPriceFilter(minPrice, maxPrice) {
    await this.page.fill('[data-auto="range-filter-input-min"]', minPrice);
    await this.page.fill('[data-auto="range-filter-input-max"]', maxPrice);
    await this.page.click('[data-auto="filter-range-apply"]');
  }

  async sortBy(sortType) {
    await this.page.selectOption(this.sortDropdown, sortType);
  }

  async getProductTitles() {
    return await this.page.locator('[data-zone-name="title"]').allTextContents();
  }
}

module.exports = SearchPage;
