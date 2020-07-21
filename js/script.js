const habitacionesSection = document.querySelector('#habitaciones'),
      divSpinner = document.querySelector('#spinner-number'),
      btnMas = document.querySelector('#spinner-plus'),
      btnMenos = document.querySelector('#spinner-minus'),
      txtNoches = document.querySelector('#spinner-input'),
      slcHabitaciones = document.querySelector('#lista-habitaciones')

let cantidadNoches = 1

HABITACIONES = [
  {
    id: 'hab1',
    nombre: 'Normal',
    precio: 100,
    disponibles: 10,
    descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image: 'https://cdn.pixabay.com/photo/2016/08/07/00/44/bed-1575491_960_720.jpg'
  },
  {
    id: 'hab2',
    nombre: 'Elegante',
    precio: 230,
    disponibles: 5,
    descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image: 'https://cdn.pixabay.com/photo/2014/08/11/21/40/bedroom-416063_960_720.jpg'
  },
  {
    id: 'hab3',
    nombre: 'Lujosa',
    precio: 300,
    disponibles: 2,
    descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image: 'https://cdn.pixabay.com/photo/2018/10/28/12/37/bedroom-3778695_960_720.jpg'
  }
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
  const hab = buscarHabitacion(id);

  const modalBackground = document.createElement('div')
  modalBackground.id = 'modalBackground'

  const modalBox =
    `<section id="modal">
      <article id="modalBox">
        <div id="box-resumen">
          <img src="${hab.image}" class="box-img" alt="${hab.nombre}"/>
          <h2>$${hab.precio * cantidadNoches}</h2>
          <h4>Habitación ${hab.nombre} por ${cantidadNoches} noche(s)</h2>
        </div>
        <form id="box-form">
          <button id="btn-cerrar"><i class="fas fa-times"></i></button>
          <label id="form-title">Información de la reservación</label>
          <div>
            <label class="icono"><i class="fas fa-user"></i></label>
            <input type="text" id="txt-nombre" class="campo" placeholder="NOMBRE">
            <label class="icono"><i class="fas fa-user"></i></label>
            <input type="text" id="txt-apellido" class="campo" placeholder="APELLIDO">
          </div>
          <div>
            <label class="icono"><i class="fas fa-envelope"></i></label>
            <input type="email" id="txt-email" class="campo" placeholder="EMAIL">
            <label class="icono"><i class="fas fa-phone-alt"></i></label>
            <input type="text" id="txt-tel" class="campo" placeholder="TELEFONO">
          </div>
          <div>
            <label class="icono"><i class="far fa-calendar"></i></label>
            <input type="date" id="fecha-inicio" class="campo">
            <label class="icono"><i class="far fa-calendar-check"></i></label>
            <input type="date" id="fecha-fin" class="campo">
          </div>
          <div>
            <label class="icono"><i class="fas fa-user-plus"></i></label>
            <input type="number" id="txt-personas" class="campo" placeholder="CANTIDAD DE PERSONAS" min="1" max="5">
          </div>
          <button id="btn-confirmar" class="btn-primary">Aceptar</button>
        </form>
      </article>
    </section>`

  document.body.insertAdjacentHTML('afterbegin', modalBox)
  document.body.insertAdjacentElement('afterbegin', modalBackground)
  document.body.classList.add('stop-scrolling') // Deshabilitar el scroll

  document.querySelector("#btn-cerrar").addEventListener('click', (e) => {
    e.preventDefault();
    ocultarModal();
  })

  // Validar formulario
  formCampos = document.querySelectorAll('.campo')
  formCampos.forEach( campo => {
    campo.oninput = () => activarColor(campo)
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

const ocultarModal = () => {
  document.body.removeChild(document.querySelector('#modalBackground'))
  document.body.removeChild(document.querySelector('#modal'))
  document.body.classList.remove('stop-scrolling') // Habilitar el scroll
}

const agregarModal = () => {
  btnReserva = document.querySelectorAll('.btn-reservar')

  btnReserva.forEach( btn => {
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