const BasePage = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);

    // Локаторы страницы товара
    this.productTitle = '.product-name';
    this.productPrice = '.product-price';
    this.addToCartButton = 'input[value="Add to cart"]';
    this.quantityInput = '.qty-input';
    this.addToWishlistButton = 'input[value="Add to wishlist"]';
    this.successMessage = '.content';
    this.shoppingCartLink = 'a.ico-cart';
    this.cartQuantity = '.cart-qty';
  }

  async addToCart(quantity = 1) {
    if (quantity > 1) {
      await this.fillField(this.quantityInput, quantity.toString());
    }
    await this.clickElement(this.addToCartButton);
    await this.waitForTimeout(2000);
  }

  async getProductTitle() {
    return await this.getText(this.productTitle);
  }

  async getProductPrice() {
    return await this.getText(this.productPrice);
  }

  async goToShoppingCart() {
    await this.clickElement(this.shoppingCartLink);
  }

  async getCartQuantity() {
    const quantityText = await this.getText(this.cartQuantity);
    return parseInt(quantityText.replace(/[()]/g, '')) || 0;
  }
}

module.exports = ProductPage;
