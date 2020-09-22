export default class Person {
  constructor(dui, firstName, lastName, creditCard, email, phone) {
    this._dui = dui
    this._firstName = firstName
    this._lastName = lastName
    this._creditCard = creditCard
    this._email = email
    this._phone = phone
  }

  get dui() {
    return this._dui;
  }

  set dui(dui) {
    this._dui = dui
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(firstName) {
    this._firstName = firstName
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(lastName) {
    this._lastName = lastName
  }

  get creditCard() {
    return this._creditCard;
  }

  set creditCard(creditCard) {
    this._creditCard = creditCard
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email
  }

  get phone() {
    return this._phone;
  }

  set phone(phone) {
    this._phone = phone
  }
}