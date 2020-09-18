import Room from './room.js'
import Reservation from './reservation.js'
import Person from './person.js'

const roomsSection = document.querySelector('#rooms'),
      reservationsSection = document.querySelector('#reservations'),
      divSpinner = document.querySelector('#spinner-number'),
      btnPlus = document.querySelector('#spinner-plus'),
      btnMinus = document.querySelector('#spinner-minus'),
      spinnerNights = document.querySelector('#spinner-input'),
      slcRooms = document.querySelector('#room-list'),
      modalReservation = document.querySelector('#modal-reservation'),
      btnHome = document.querySelector('#btn-home'),
      btnReservations = document.querySelector('#btn-reservations'),
      sectionHome = document.querySelector('#section-home'),
      sectionReservations = document.querySelector('#section-reservations')

// Elementos del formulario para reservación
const txtName = document.querySelector('#txt-name'),
      txtLastName = document.querySelector('#txt-lastname'),
      txtDui = document.querySelector('#txt-dui'),
      txtCreditCard = document.querySelector('#txt-credit-card'),
      txtEmail = document.querySelector('#txt-email'),
      txtPhone = document.querySelector('#txt-phone'),
      txtNights = document.querySelector('#txt-nights'),
      txtPeople = document.querySelector('#txt-people'),
      dateStart = document.querySelector('#date-start'),
      dateEnd = document.querySelector('#date-end'),
      formError = document.querySelector('#form-error')

let nights = 1,
    hab = null

const setRoomList = (roomList) => {
  localStorage.setItem('localRoomList', JSON.stringify(roomList))
}

const setReservationList = (reservationList) => {
  localStorage.setItem('localReservationList', JSON.stringify(reservationList))
}

const getRoomList = () => {
  let roomList = []
  const localRoomList = localStorage.getItem('localRoomList')
  if(localRoomList !== null) {
    roomList = JSON.parse(localRoomList)
  } else {
    roomList = [
      new Room('hab1', 'Normal', 100, 10, 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'https://cdn.pixabay.com/photo/2016/08/07/00/44/bed-1575491_960_720.jpg'),
      new Room('hab2', 'Elegante', 230, 5, 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'https://cdn.pixabay.com/photo/2014/08/11/21/40/bedroom-416063_960_720.jpg'),
      new Room('hab3', 'Lujosa', 300, 2, 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'https://cdn.pixabay.com/photo/2018/10/28/12/37/bedroom-3778695_960_720.jpg')
    ]
    setRoomList(roomList)
  }
  return roomList
}

const getReservationList = () => {
  let reservationList = []
  const localReservationList = localStorage.getItem('localReservationList')
  if(localReservationList !== null) {
    reservationList = JSON.parse(localReservationList)
  } else {
    setReservationList(reservationList)
  }
  return reservationList
}

let ROOMS = getRoomList()
let RESERVATIONS = getReservationList()
console.log(ROOMS)
console.log(RESERVATIONS)


const roomOptionTemplate = ( room ) => {
  const selectItem = document.createElement('option')
  selectItem.setAttribute('value', room.id)
  selectItem.insertAdjacentText('beforeend', room.name)
  slcRooms.insertAdjacentElement('beforeend', selectItem)
}

const roomArticleTemplate = ( room ) => {
  return  `<article class="card shadow">
            <img src="${room.image}" class="card-img" alt="${room.name}">
            <div class="p24">
              <div class="card-header row">
                <h2 class="text2">${room.name}</h2>
                <h3>$${room.price} por noche</h3>
                <h3>${room.available} roomitaciones disponibles</h3>
              </div>
              <p class="card-body">${room.description}</p>
            </div>
            <div class="card-price">
              <h2 class="text1 active">$${room.price * nights}</h2>
              <h4 class="text3">por ${nights} noche(s)</h4>
              <button class="btn-reserve btn-primary" value="${room.id}"> Reservar </button>
            </div>
          </article>`
}

const reservationArticleTemplate = ( reservation ) => {
  return  `<article class="card-reservation card">
            <label><span class="active">Nombre responsable: </span> ${reservation.person.name} ${reservation.person.lastName}</label>
            <label><span class="active">DUI: </span> ${reservation.person.dui}</label>
            <label><span class="active">Email: </span> ${reservation.person.email}</label>
            <label><span class="active">Teléfono: </span> ${reservation.person.phone}</label>
            <label><span class="active">Habitacion: </span> ${reservation.room.name}</label>
            <label><span class="active">Cantidad de personas: </span> ${reservation.people}</label>
            <label><span class="active">Fecha inicial: </span> ${reservation.dateStart}</label>
            <label><span class="active">Fecha final: </span> ${reservation.dateEnd}</label>
          </article>`
}

const renderRoom = (id) => {
  roomsSection.innerHTML = ''
  ROOMS.forEach( r => {
    if( r.id === id || id === 'all') {
      const room = roomArticleTemplate(r)
      roomsSection.insertAdjacentHTML('beforeend', room)
    }
  })

  addModal();

  // Habilitando el Spinner de Número de noches
  (id === 'all') ? divSpinner.classList.add('hidden') : divSpinner.classList.remove('hidden')
}

const renderRooms = () => {
  reservationsSection.innerHTML = ''
  RESERVATIONS.forEach( r => {
    const reservation = reservationArticleTemplate(r)
    reservationsSection.insertAdjacentHTML('beforeend', reservation)
  })

  if(RESERVATIONS.length == 0) reservationsSection.insertAdjacentHTML('beforeend', '<h4 id="not-found">Aún no existen reservaciones</h4>')

}
const renderOptions = () => {
  ROOMS.forEach( room => {
    roomOptionTemplate( room )
  })
}

slcRooms.addEventListener('change', () => {
  const id = slcRooms.options[slcRooms.selectedIndex].value
  renderRoom(id)
})

// Método para aumentar o decrementar el número de noches y renderizar los cambios
const updateNights = (n) => {
  const id = slcRooms.options[slcRooms.selectedIndex].value
  nights = nights + n
  spinnerNights.value = nights
  renderRoom(id)
}

btnPlus.addEventListener('click', () => {
  updateNights(1)
})

btnMinus.addEventListener('click', () => {
  if( nights > 1 ) {
    updateNights(-1)
  }
})

const searchRoomById = ( id ) => {
  let room = ROOMS.filter( r => r.id === id)
  return room[0]
}

// Manejo del modal para reservar habitación
const showModal = ( id ) => {
  let date = new Date();
  hab = searchRoomById(id)

  document.querySelector('#room-img').setAttribute('src', hab.image)
  document.querySelector('#room-name').innerText = hab.name
  document.querySelector('#room-description').innerText = `${hab.description}`
  document.querySelector('#room-price').innerText = `$${hab.price}`
  document.querySelector('#room-stay').innerText = `${nights} noche(s)`
  document.querySelector('#room-pay').innerText = `$${hab.price * nights}`

  modalReservation.classList.remove('hidden')

  // Seteando valores por defecto para la reservación
  txtNights.value = nights
  dateStart.value = date.toISOString().substr(0, 10)
  date.setDate(date.getDate() + nights)
  dateEnd.value = date.toISOString().substr(0, 10)
}

// Validar formulario
let formFields = document.querySelectorAll('.field-input')
formFields.forEach( campo => campo.oninput = () => activeColor(campo))

const validateReservationPeople = () => {
  if(txtPeople.value > 0 && txtPeople.value <= 5)  {
    txtPeople.style.setProperty("border-color","transparent")
    formError.innerText = ``
  } else {
    txtPeople.style.setProperty("border-color","#e8505b")
    formError.innerText = `Verifique la cantidad de personas`
  }
}

const validateReservationStay = () => {
  if(txtNights.value > 0) {
    nights = parseInt(txtNights.value)
    let dStart = new Date(dateStart.value)
    let dEnd = new Date(dateEnd.value)
    dStart.setDate(dStart.getDate())
    dEnd.setDate(dStart.getDate() + nights)
    dateEnd.value = dEnd.toISOString().substr(0, 10)
    document.querySelector('#room-stay').innerText = `${nights} noche(s)`
    document.querySelector('#room-pay').innerText = `$${hab.price * nights}`
    txtNights.style.setProperty("border-color","transparent")
    formError.innerText = ``
    spinnerNights.value = nights
  } else {
    txtNights.style.setProperty("border-color","#e8505b")
    formError.innerText = `Verifique la cantidad de noches`
  }
}

const validateReservationDate = () => {
  let dStart = new Date(dateStart.value)
  dStart.setDate(dStart.getDate() + 1)

  if(Date.now() <= dStart) {
    validateReservationStay()
    dateStart.style.setProperty("border-color","transparent")
    dateEnd.style.setProperty("border-color","transparent")
    return true
  } else {
    formError.innerText = `Verifique la fecha de reservación`
    dateStart.style.setProperty("border-color","#e8505b")
    dateEnd.style.setProperty("border-color","#e8505b")
    return false
  }
}

const cleanForm = () => {
  let date = new Date()

  txtDui.value = ''
  txtName.value = ''
  txtLastName.value = ''
  txtEmail.value = ''
  txtPhone.value = ''
  txtPeople.value = 0
  dateStart.value = date
  dateEnd.value = date.setDate(date.getDate() + nights)
  formError.innerText = ``
  formFields.forEach( field => { field.style.setProperty("border-color","transparent") })
}

const activeColor = (element) => {
  if(element.value === "") {
    element.style.setProperty("border-color","#e8505b")
  } else {
    element.style.setProperty("border-color","transparent")
  }
}

txtPeople.oninput = () => validateReservationPeople()
txtNights.oninput = () => validateReservationStay()
txtNights.addEventListener('change', validateReservationStay)
dateStart.addEventListener('change', validateReservationDate)

document.querySelector("#btn-close").addEventListener('click', (e) => {
  e.preventDefault();
  hideModal();
})

document.querySelector('#btn-confirm').addEventListener('click', (e) => {
  e.preventDefault()
  let formComplete = true

  formFields.forEach( field => {
    if(field.value === "") {
      activeColor(field)
      formComplete = false
    }
  })

  if(formComplete && validateReservationDate()) {
    makeReservation()
    hideModal()
  }
})

const makeReservation = () => {
  const p = new Person(txtDui.value, txtName.value, txtLastName.value, txtEmail.value, txtPhone.value)
  const r = new Reservation(txtDui.value + dateStart.value, txtPeople.value, dateStart.value, dateEnd.value, p, hab)
  RESERVATIONS.push(r)
  setReservationList(RESERVATIONS)
  cleanForm()
}

const hideModal = () => {
  modalReservation.classList.add('hidden')
  cleanForm()
}

const addModal = () => {
  const btnReserve = document.querySelectorAll('.btn-reserve')

  btnReserve.forEach( btn => {
    btn.addEventListener('click', () => {
      showModal(btn.value)
    })
  })
}

// Manejando la barra de navegación
btnHome.addEventListener('click', () => {
  btnHome.classList.add('active-border')
  btnReservations.classList.remove('active-border')
  sectionHome.classList.remove('hidden')
  sectionReservations.classList.add('hidden')

})

btnReservations.addEventListener('click', () => {
  btnReservations.classList.add('active-border')
  btnHome.classList.remove('active-border')
  sectionReservations.classList.remove('hidden')
  sectionHome.classList.add('hidden')

  renderRooms()
})

//Inicializando ...
spinnerNights.value = nights
spinnerNights.setAttribute('disabled',true)
dateEnd.setAttribute('disabled',true)
renderOptions()
renderRoom('all')