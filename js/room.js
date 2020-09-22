export default class Room {
  constructor(id, name, price, available, description, image) {
    this._id = id
    this._name = name
    this._price = price
    this._available = available
    this._description = description
    this._image = image
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name
  }

  get price() {
    return this._price;
  }

  set price(price) {
    this._price = price
  }

  get available() {
    return this._available;
  }

  set available(available) {
    this._available = available
  }
  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description
  }

  get image() {
    return this._image;
  }

  set image(image) {
    this._image = image
  }
}