const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    // Локаторы
    this.emailInput = '#Email';
    this.passwordInput = '#Password';
    this.loginButton = 'input[value="Log in"]';
    this.loginLink = 'a[href="/login"]';
    this.logoutLink = 'a[href="/logout"]';
    this.errorMessage = '.validation-summary-errors';
    this.userEmail = '.header-links .account';
    this.rememberMeCheckbox = '#RememberMe';
  }

  async navigateToLogin() {
    await this.navigateTo('https://demowebshop.tricentis.com/login');
  }

  async login(email, password, rememberMe = false) {
    await this.fillField(this.emailInput, email);
    await this.fillField(this.passwordInput, password);

    if (rememberMe) {
      await this.clickElement(this.rememberMeCheckbox);
    }

    await this.clickElement(this.loginButton);
    await this.waitForTimeout(2000);
  }

  async isLoggedIn() {
    return await this.page.isVisible(this.logoutLink);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async getUserEmail() {
    return await this.getText(this.userEmail);
  }

  async logout() {
    if (await this.isLoggedIn()) {
      await this.clickElement(this.logoutLink);
    }
  }

  async goToLoginPage() {
    await this.clickElement(this.loginLink);
  }
}

module.exports = LoginPage;
