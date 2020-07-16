const habitacionesSection = document.querySelector('#habitaciones'),
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
      <img src="${hab.image}" class="card-img">
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
        <button id="btn-reservar" class="btn-primary"> Reservar </button>
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

//Inicializando ...
txtNoches.value = cantidadNoches
txtNoches.setAttribute('disabled',true)
renderOpciones()
renderHabitacion('todo')