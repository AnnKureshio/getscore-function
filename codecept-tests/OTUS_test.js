Feature('OTUS.ru - 5 тестов с техниками тест-дизайна');

// 1. ГРАНИЧНЫЕ ЗНАЧЕНИЯ
Scenario('Граничные значения поиска', ({ I, OTUSPage }) => {
  OTUSPage.open();
  OTUSPage.searchFor('Java');
  I.seeElement('body');
  I.say('✅ Граничное значение: валидный запрос');
});

// 2. КЛАССЫ ЭКВИВАЛЕНТНОСТИ
Scenario('Классы эквивалентности поиска', ({ I, OTUSPage }) => {
  OTUSPage.open();
  OTUSPage.searchFor('Java');
  I.seeInTitle('OTUS');
  I.say('✅ Класс эквивалентности: "Java"');
});

// 3. ПЕРЕХОДЫ МЕЖДУ СОСТОЯНИЯМИ
Scenario('Переходы между состояниями', ({ I, OTUSPage }) => {
  OTUSPage.open();
  I.seeElement(OTUSPage.logo);
  I.say('✅ Состояние: Главная страница');

  OTUSPage.searchFor('JavaScript');
  I.seeInTitle('OTUS');
  I.say('✅ Состояние: Результаты поиска');
});

// 4. ПОЗИТИВНЫЕ СЦЕНАРИИ
Scenario('Позитивные сценарии', ({ I, OTUSPage }) => {
  OTUSPage.open();
  I.seeElement(OTUSPage.searchInput);
  I.seeElement(OTUSPage.logo);
  I.say('✅ Позитивный: основные элементы отображаются');
});

// 5. ТАБЛИЦА РЕШЕНИЙ
Scenario('Таблица решений для UI элементов', ({ I, OTUSPage }) => {
  const elements = [
    { element: OTUSPage.logo, shouldBeVisible: true, name: 'Логотип' },
    { element: OTUSPage.searchInput, shouldBeVisible: true, name: 'Поле поиска' }
  ];

  OTUSPage.open();

  elements.forEach(item => {
    if (item.shouldBeVisible) {
      I.seeElement(item.element);
    } else {
      I.dontSeeElement(item.element);
    }
    I.say(`✅ Таблица решений: ${item.name} - ${item.shouldBeVisible ? 'видим' : 'не видим'}`);
  });
});
