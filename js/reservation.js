export default class Reservation {
  constructor(id, people, dateStart, dateEnd, dui, idRoom) {
    this.id = id
    this.people = people
    this.dateStart = dateStart
    this.dateEnd = dateEnd
    this.dui = dui
    this.idRoom = idRoom
  }
}