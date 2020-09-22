export default class Reservation {
  constructor(id, people, dateStart, dateEnd, pay, person, room) {
    this._id = id
    this._people = people
    this._dateStart = dateStart
    this._dateEnd = dateEnd
    this._pay = pay
    this._person = person
    this._room = room
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id
  }

  get people() {
    return this._people;
  }

  set people(people) {
    this._people = people
  }

  get dateStart() {
    return this._dateStart;
  }

  set dateStart(dateStart) {
    this._dateStart = dateStart
  }

  get dateEnd() {
    return this._dateEnd;
  }

  set dateEnd(dateEnd) {
    this._dateEnd = dateEnd
  }

  get pay() {
    return this._pay;
  }

  set pay(pay) {
    this._pay = pay
  }

  get person() {
    return this._person;
  }

  set person(person) {
    this._person = person
  }

  get room() {
    return this._room;
  }

  set room(room) {
    this._room = room
  }
}