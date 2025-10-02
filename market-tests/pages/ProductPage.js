const BasePage = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.productTitle = '[data-zone-name="productTitle"]';
    this.productPrice = '[data-zone-name="price"]';
    this.addToCartButton = '[data-zone-name="cart"]';
    this.buyButton = '[data-zone-name="buyButton"]';
    this.productDescription = '[data-zone-name="productDescription"]';
  }

  async getProductTitle() {
    return await this.page.locator(this.productTitle).textContent();
  }

  async getProductPrice() {
    return await this.page.locator(this.productPrice).first().textContent();
  }

  async addToCart() {
    await this.page.click(this.addToCartButton);
  }

  async buyNow() {
    await this.page.click(this.buyButton);
  }

  async getProductDescription() {
    return await this.page.locator(this.productDescription).textContent();
  }

  async isProductAvailable() {
    const buyButton = this.page.locator(this.buyButton);
    return await buyButton.isEnabled();
  }
}

module.exports = ProductPage;
