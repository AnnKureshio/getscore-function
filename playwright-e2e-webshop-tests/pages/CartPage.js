const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);

    // Локаторы корзины
    this.cartItems = '.cart-item-row';
    this.productName = '.product-name';
    this.quantityInput = '.qty-input';
    this.updateCartButton = 'input[name="updatecart"]';
    this.removeCheckbox = 'input[name="removefromcart"]';
    this.emptyCartMessage = '.order-summary-content';
    this.unitPrice = '.product-unit-price';
    this.subTotal = '.product-subtotal';
    this.continueShoppingButton = 'input[name="continueshopping"]';
    this.checkoutButton = 'input[value="Checkout"]';
  }

  async navigateToCart() {
    await this.navigateTo('https://demowebshop.tricentis.com/cart');
  }

  async getCartItemsCount() {
    return await this.page.locator(this.cartItems).count();
  }

  async getProductNames() {
    return await this.page.locator(this.productName).allTextContents();
  }

  async updateQuantity(itemIndex, newQuantity) {
    const quantityInputs = await this.page.locator(this.quantityInput).all();
    if (quantityInputs[itemIndex]) {
      await quantityInputs[itemIndex].fill(newQuantity.toString());
    }
    await this.clickElement(this.updateCartButton);
    await this.waitForTimeout(2000);
  }

  async removeItem(itemIndex) {
    const removeCheckboxes = await this.page.locator(this.removeCheckbox).all();
    if (removeCheckboxes[itemIndex]) {
      await removeCheckboxes[itemIndex].check();
    }
    await this.clickElement(this.updateCartButton);
    await this.waitForTimeout(2000);
  }

  async removeAllItems() {
    const checkboxes = await this.page.locator(this.removeCheckbox).all();
    for (const checkbox of checkboxes) {
      await checkbox.check();
    }
    await this.clickElement(this.updateCartButton);
    await this.waitForTimeout(2000);
  }

  async isEmptyCartMessageVisible() {
    const message = await this.getText(this.emptyCartMessage);
    return message.includes('Your Shopping Cart is empty!');
  }

  async continueShopping() {
    await this.clickElement(this.continueShoppingButton);
  }
}

module.exports = CartPage;
