import Habitacion from './habitacion.js'
import Huesped from './huesped.js'

const habitacionesSection = document.querySelector('#habitaciones'),
      divSpinner = document.querySelector('#spinner-number'),
      btnMas = document.querySelector('#spinner-plus'),
      btnMenos = document.querySelector('#spinner-minus'),
      txtNoches = document.querySelector('#spinner-input'),
      slcHabitaciones = document.querySelector('#lista-habitaciones'),
      modalBackground = document.querySelector('#modal-background'),
      modalReservacion = document.querySelector('#reservaciones')

let cantidadNoches = 1

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
  const element =
    `<article class="card">
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

  return element
}

const renderHabitacion = (id) => {
  // Eliminando cualquier nodo hijo de habitacionesSection
  while (habitacionesSection.firstChild) {
    habitacionesSection.removeChild(habitacionesSection.firstChild)
  }

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

// Manejo del modal para reservar habitación
const mostrarModal = ( id ) => {
  let fecha = new Date();
  const hab = buscarHabitacion(id)

  document.querySelector('#box-img').setAttribute('src', hab.image)
  document.querySelector('#box-precio').innerText = `$${hab.precio * cantidadNoches}`
  document.querySelector('#box-nombre').innerText = `Habitación  ${hab.nombre} por ${cantidadNoches} noche(s)`
  modalBackground.classList.remove('hidden')
  modalReservacion.classList.remove('hidden')
  // document.body.classList.add('stop-scrolling') // Deshabilitar el scroll

  // Seteando fechas para la reservación
  document.querySelector('#fecha-inicio').value = fecha.toISOString().substr(0, 10);
  fecha.setDate(fecha.getDate() + cantidadNoches);
  document.querySelector('#fecha-fin').value = fecha.toISOString().substr(0, 10);

  // Validar formulario
  let formCampos = document.querySelectorAll('.campo')
  formCampos.forEach( campo => campo.oninput = () => activarColor(campo))

  document.querySelector('#btn-confirmar').addEventListener('click', (e) => {
    e.preventDefault()
    let formCompleto = true

    formCampos.forEach( campo => {
      if(campo.value === "") {
        activarColor(campo)
        formCompleto = false
      }
    })

    if(formCompleto) {
      ocultarModal()
    }
  })

}

const activarColor = (elemento) => {
  if(elemento.value === "") {
    elemento.style.setProperty("border-color","#e8505b")
  } else {
    elemento.style.setProperty("border-color","transparent")
  }
}

document.querySelector("#btn-cerrar").addEventListener('click', (e) => {
  e.preventDefault();
  ocultarModal();
})

const ocultarModal = () => {
  modalBackground.classList.add('hidden')
  modalReservacion.classList.add('hidden')
  document.body.classList.remove('stop-scrolling') // Habilitar el scroll
}

const agregarModal = () => {
  const btnReservar = document.querySelectorAll('.btn-reservar')

  btnReservar.forEach( btn => {
    btn.addEventListener('click', () => {
      mostrarModal(btn.value)
    })
  })
}

//Inicializando ...
txtNoches.value = cantidadNoches
txtNoches.setAttribute('disabled',true)
renderOpciones()
renderHabitacion('todo')