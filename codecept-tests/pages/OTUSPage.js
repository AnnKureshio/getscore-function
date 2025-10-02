const { I } = inject();

module.exports = {
  // Локаторы
  searchInput: 'input[placeholder="Поиск курса"]',
  logo: 'img[alt="OTUS Logo"]',
  chatIcon: '.logoIconCloud__INNZR.icons__W1nid',

  // Методы
  open() {
    I.amOnPage('/');
    I.wait(2);
  },

  searchFor(query) {
    I.fillField(this.searchInput, query);
    I.pressKey('Enter');
    I.wait(2);
  },

  clickLogo() {
    I.click(this.logo);
  }
};
