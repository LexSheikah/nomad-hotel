export default class Reservacion {
  constructor(id, cantidadPersonas, fechaInicio, fechaFin, dui, idHabitacion) {
    this.id = id
    this.cantidadPersonas = cantidadPersonas
    this.fechaInicio = fechaInicio
    this.fechaFin = fechaFin
    this.dui = dui
    this.idHabitacion = idHabitacion
  }
}