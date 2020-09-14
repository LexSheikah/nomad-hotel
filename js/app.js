import Habitacion from './habitacion.js'
import Reservacion from './reservacion.js'
import Persona from './persona.js'

const habitacionesSection = document.querySelector('#habitaciones'),
      reservacionesSection = document.querySelector('#reservaciones'),
      divSpinner = document.querySelector('#spinner-number'),
      btnMas = document.querySelector('#spinner-plus'),
      btnMenos = document.querySelector('#spinner-minus'),
      txtNoches = document.querySelector('#spinner-input'),
      slcHabitaciones = document.querySelector('#lista-habitaciones'),
      modalBackground = document.querySelector('#modal-background'),
      modalReservacion = document.querySelector('#modal-reservaciones'),
      btnHome = document.querySelector('#btn-home'),
      btnReservaciones = document.querySelector('#btn-reservaciones'),
      seccionInicio = document.querySelector('#seccion-inicio'),
      seccionReservaciones = document.querySelector('#seccion-reservaciones')

// Elementos del formulario para reservación
const txtNombre = document.querySelector('#txt-nombre'),
      txtApellido = document.querySelector('#txt-apellido'),
      txtDui = document.querySelector('#txt-dui'),
      txtEmail = document.querySelector('#txt-email'),
      txtTel = document.querySelector('#txt-tel'),
      txtCantidadPersonas = document.querySelector('#txt-personas'),
      fechaInicio = document.querySelector('#fecha-inicio'),
      fechaFin = document.querySelector('#fecha-fin')

let cantidadNoches = 1,
    RESERVACIONES = [],
    PERSONAS = [],
    hab = null

//#region DATOS DE PRUEBA
const person1 = new Persona('12345678-9','Lex Marvin','Ortiz Canizález','lex.ortizc@gmail.com','7477-4734')
const reserva1 = new Reservacion('r01',3,'2020-08-30','2020-09-01','12345678-9','hab3')
// PERSONAS.push(person1)
// RESERVACIONES.push(reserva1)
// RESERVACIONES.push(reserva1)
//#endregion

const HABITACIONES = [
  new Habitacion('hab1', 'Normal', 100, 10, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'https://cdn.pixabay.com/photo/2016/08/07/00/44/bed-1575491_960_720.jpg'),
  new Habitacion('hab2', 'Elegante', 230, 5, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'https://cdn.pixabay.com/photo/2014/08/11/21/40/bedroom-416063_960_720.jpg'),
  new Habitacion('hab3', 'Lujosa', 300, 2, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'https://cdn.pixabay.com/photo/2018/10/28/12/37/bedroom-3778695_960_720.jpg')
]

const habitacionOptionTemplate = ( hab ) => {
  const selectItem = document.createElement('option')
  selectItem.setAttribute('value', hab.id)
  selectItem.insertAdjacentText('beforeend', hab.nombre)
  slcHabitaciones.insertAdjacentElement('beforeend', selectItem)
}

const habitacionArticleTemplate = ( hab ) => {
  return  `<article class="card">
            <img src="${hab.image}" class="card-img" alt="${hab.nombre}">
            <div class="card-text">
              <div class="card-text-header">
                <h2>${hab.nombre}</h2>
                <h3>$${hab.precio} la noche</h3>
                <h3>${hab.disponibles} habitaciones disponibles</h3>
              </div>
              <p class="card-text-body">${hab.descripcion}</p>
            </div>
            <div class="card-price">
              <h2>$${hab.precio * cantidadNoches}</h2>
              <h5>por ${cantidadNoches} noche(s)</h5>
              <button class="btn-reservar btn-primary" value="${hab.id}"> Reservar </button>
            </div>
          </article>`
}

const reservacionArticleTemplate = ( reserva, persona, habitacion) => {
  return  `<article class="card-reservation card">
            <label><span class="active">Nombre responsable: </span> ${persona.nombre} ${persona.apellido}</label>
            <label><span class="active">DUI: </span> ${persona.dui}</label>
            <label><span class="active">Email: </span> ${persona.email}</label>
            <label><span class="active">Teléfono: </span> ${persona.telefono}</label>
            <label><span class="active">Habitacion: </span> ${habitacion.nombre}</label>
            <label><span class="active">Cantidad de personas: </span> ${reserva.cantidadPersonas}</label>
            <label><span class="active">Fecha inicial: </span> ${reserva.fechaInicio}</label>
            <label><span class="active">Fecha final: </span> ${reserva.fechaFin}</label>
          </article>`
}

const renderHabitacion = (id) => {
  habitacionesSection.innerHTML = ''
  HABITACIONES.forEach( hab => {
    if( hab.id === id || id === 'todo') {
      const habitacion = habitacionArticleTemplate(hab)
      habitacionesSection.insertAdjacentHTML('beforeend', habitacion)
    }
  })

  agregarModal()

  // Habilitando el Spinner de Número de noches
  if(id === 'todo'){
    if(!divSpinner.classList.contains('hidden')) divSpinner.classList.add('hidden')
  } else {
    if(divSpinner.classList.contains('hidden')) divSpinner.classList.remove('hidden')
  }
}

const renderReservaciones = () => {
  reservacionesSection.innerHTML = ''
  RESERVACIONES.forEach( reserva => {
    const r = reservacionArticleTemplate(reserva, buscarPersona(reserva.dui), buscarHabitacion(reserva.idHabitacion))
    reservacionesSection.insertAdjacentHTML('beforeend', r)
  })

  if(RESERVACIONES.length == 0) reservacionesSection.insertAdjacentHTML('beforeend', '<h4 id="not-found">Aún no existen reservaciones</h4>')

}
const renderOpciones = () => {
  HABITACIONES.forEach( hab => {
    habitacionOptionTemplate( hab )
  })
}

slcHabitaciones.addEventListener('change', () => {
  const id = slcHabitaciones.options[slcHabitaciones.selectedIndex].value
  renderHabitacion(id)
})

// Método para aumentar o decrementar el número de noches y renderizar los cambios
const actualizarNoches = (n) => {
  const id = slcHabitaciones.options[slcHabitaciones.selectedIndex].value
  cantidadNoches = cantidadNoches + n
  txtNoches.value = cantidadNoches
  renderHabitacion(id)
}

btnMas.addEventListener('click', () => {
  actualizarNoches(1)
})

btnMenos.addEventListener('click', () => {
  if( cantidadNoches > 1 ) {
    actualizarNoches(-1)
  }
})

const buscarHabitacion = ( id ) => {
  let habitacion = HABITACIONES.filter( hab => hab.id === id)
  return habitacion[0]
}

const buscarPersona = ( dui ) => {
  let persona = PERSONAS.filter( p => p.dui === dui)
  return persona[0]
}

// Manejo del modal para reservar habitación
const mostrarModal = ( id ) => {
  const fechaInicio = document.querySelector('#fecha-inicio')
  const fechaFin = document.querySelector('#fecha-fin')
  let fecha = new Date();
  hab = buscarHabitacion(id)

  document.querySelector('#box-img').setAttribute('src', hab.image)
  document.querySelector('#box-price').innerText = `$${hab.precio * cantidadNoches}`
  document.querySelector('#box-name').innerText = `Habitación  ${hab.nombre} por ${cantidadNoches} noche(s)`
  modalBackground.classList.remove('hidden')
  modalReservacion.classList.remove('hidden')
  // document.body.classList.add('stop-scrolling') // Deshabilitar el scroll

  // Seteando fechas para la reservación
  fechaInicio.value = fecha.toISOString().substr(0, 10);
  fecha.setDate(fecha.getDate() + cantidadNoches);
  fechaFin.value = fecha.toISOString().substr(0, 10);
}

// Validar formulario
let formCampos = document.querySelectorAll('.campo')
formCampos.forEach( campo => campo.oninput = () => activarColor(campo))

const validarFechaRecervacion = () => {
  let fInicio = new Date(fechaInicio.value),
      fFin = new Date(fechaFin.value)

      fInicio.setDate(fInicio.getDate() + 1)
      fFin.setDate(fFin.getDate() + 1)

  if(Date.now() <= fInicio && fFin > fInicio) {
    cantidadNoches = (fFin.getTime() - fInicio.getTime()) / 86400000
    document.querySelector('#box-img').setAttribute('src', hab.image)
    document.querySelector('#box-price').innerText = `$${hab.precio * cantidadNoches}`
    document.querySelector('#box-name').innerText = `Habitación  ${hab.nombre} por ${cantidadNoches} noche(s)`
    fechaInicio.style.setProperty("border-color","transparent")
    fechaFin.style.setProperty("border-color","transparent")

    return true
  } else {
    document.querySelector('#box-price').innerText = 'Fecha invalida'
    document.querySelector('#box-name').innerText = `Verifique la fecha de reservación`
    fechaInicio.style.setProperty("border-color","#e8505b")
    fechaFin.style.setProperty("border-color","#e8505b")

    return false
  }
}

const limpiarFormulario = () => {
  let fecha = new Date()

  txtDui.value = ''
  txtNombre.value = ''
  txtApellido.value = ''
  txtEmail.value = ''
  txtTel.value = ''
  txtCantidadPersonas.value = 0
  fechaInicio.value = fecha
  fechaFin.value = fecha.setDate(fecha.getDate() + cantidadNoches)
}

const activarColor = (elemento) => {
  if(elemento.value === "") {
    elemento.style.setProperty("border-color","#e8505b")
  } else {
    elemento.style.setProperty("border-color","transparent")
  }
}

fechaInicio.addEventListener('change', validarFechaRecervacion)
fechaFin.addEventListener('change', validarFechaRecervacion)

document.querySelector("#btn-cerrar").addEventListener('click', (e) => {
  e.preventDefault();
  ocultarModal();
})

document.querySelector('#btn-confirmar').addEventListener('click', (e) => {
  e.preventDefault()
  let formCompleto = true

  formCampos.forEach( campo => {
    if(campo.value === "") {
      activarColor(campo)
      formCompleto = false
    }
  })

  if(formCompleto && validarFechaRecervacion()) {
    hacerReservacion()
    ocultarModal()
  }
})

const hacerReservacion = () => {
  const p = new Persona(txtDui.value, txtNombre.value, txtApellido.value, txtEmail.value, txtTel.value)
  const r = new Reservacion(txtDui.value + fechaInicio.value, txtCantidadPersonas.value, fechaInicio.value, fechaFin.value, txtDui.value, hab.id)
  PERSONAS.push(p)
  RESERVACIONES.push(r)
  limpiarFormulario()
}

const ocultarModal = () => {
  modalBackground.classList.add('hidden')
  modalReservacion.classList.add('hidden')
  document.body.classList.remove('stop-scrolling') // Habilitar el scroll
  limpiarFormulario()
}

const agregarModal = () => {
  const btnReservar = document.querySelectorAll('.btn-reservar')

  btnReservar.forEach( btn => {
    btn.addEventListener('click', () => {
      mostrarModal(btn.value)
    })
  })
}

// Manejando la barra de navegación
btnHome.addEventListener('click', () => {
  btnHome.classList.add('active')
  btnReservaciones.classList.remove('active')
  seccionInicio.classList.remove('hidden')
  seccionReservaciones.classList.add('hidden')

})

btnReservaciones.addEventListener('click', () => {
  btnReservaciones.classList.add('active')
  btnHome.classList.remove('active')
  seccionReservaciones.classList.remove('hidden')
  seccionInicio.classList.add('hidden')

  renderReservaciones()
})

//Inicializando ...
txtNoches.value = cantidadNoches
txtNoches.setAttribute('disabled',true)
renderOpciones()
renderHabitacion('todo')