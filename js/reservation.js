export default class Reservation {
  constructor(id, people, dateStart, dateEnd, person, room) {
    this.id = id
    this.people = people
    this.dateStart = dateStart
    this.dateEnd = dateEnd
    this.person = person
    this.room = room
  }
}