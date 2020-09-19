export default class Reservation {
  constructor(id, people, dateStart, dateEnd, pay, person, room) {
    this.id = id
    this.people = people
    this.dateStart = dateStart
    this.dateEnd = dateEnd
    this.pay = pay
    this.person = person
    this.room = room
  }
}