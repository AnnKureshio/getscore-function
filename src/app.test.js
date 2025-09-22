//Функция nameIsValid
import { nameIsValid } from './app'

describe('nameIsValid function', () => {
  it('should return true for a valid name', () => {
    const result = nameIsValid('john')
    expect(result).toBe(true) // Имя состоит только из маленьких букв
  })

  it('should return false for a name that is too short', () => {
    const result = nameIsValid('a')
    expect(result).toBe(false) // Имя должно быть минимум 2 символа
  })

  it('should return false for a name with invalid characters', () => {
    const result = nameIsValid('john123')
    expect(result).toBe(false) // Имя не должно содержать цифр
  })

  it('should return false for a name with uppercase letters', () => {
    const result = nameIsValid('John')
    expect(result).toBe(false) // Имя должно быть в нижнем регистре
  })

  it('should return false for an empty name', () => {
    const result = nameIsValid('')
    expect(result).toBe(false) // Пустая строка
  })
})

//Функция fullTrim
import { fullTrim } from './app'

describe('fullTrim function', () => {
  it('should remove leading and trailing spaces from a string', () => {
    const result = fullTrim('  hello world  ')
    expect(result).toBe('helloworld') // Убираем пробелы по краям
  })

  it('should remove multiple spaces between words', () => {
    const result = fullTrim('hello    world')
    expect(result).toBe('helloworld') // Убираем все пробелы
  })

  it('should return an empty string unchanged', () => {
    const result = fullTrim('')
    expect(result).toBe('') // Пустая строка не изменяется
  })

  it('should return an empty string for null input', () => {
    const result = fullTrim(null)
    expect(result).toBe('') // null превращаем в пустую строку
  })

  it('should return an empty string for undefined input', () => {
    const result = fullTrim(undefined)
    expect(result).toBe('') // undefined превращаем в пустую строку
  })
})

//Функция getTotal
import { getTotal } from './app'

describe('getTotal function', () => {
  it('should return correct total without discount', () => {
    const result = getTotal([{ price: 10, quantity: 2 }])
    expect(result).toBe(20) // Без скидки
  })

  it('should return total with valid discount', () => {
    const result = getTotal([{ price: 10, quantity: 2 }], 10)
    expect(result).toBe(18) // Скидка 10%
  })

  it('should return total with 100% discount', () => {
    const result = getTotal([{ price: 10, quantity: 2 }], 100git checkout homework)
    expect(result).toBe(0) // Скидка 100% (всё бесплатно)
  })

  it('should throw an error for discount greater than 100', () => {
    expect(() => getTotal([{ price: 10, quantity: 2 }], 110)).toThrowError('Процент скидки должен быть от 0 до 99') // Ошибка при скидке > 99
  })

  it('should throw an error for negative discount', () => {
    expect(() => getTotal([{ price: 10, quantity: 2 }], -10)).toThrowError('Процент скидки должен быть от 0 до 99') // Ошибка при отрицательной скидке
  })

  it.each([
    [[{ price: 10, quantity: 2 }], 10, 18],
    [[{ price: 10, quantity: 1 }], 50, 5],
    [[{ price: 10, quantity: 5 }], 20, 40]
  ])('should return total with %i discount', (items, discount, expected) => {
    const result = getTotal(items, discount)
    expect(result).toBe(expected)
  })
})

describe('Simple test', () => {
  it('should display Hello, world!', () => {
    console.log = jest.fn(); // Подменяем console.log
    require('./app'); // Подключаем app.js, чтобы вызвался console.log
    expect(console.log).toHaveBeenCalledWith('Hello, world!');
  });
});
