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
      new Room('hab1', 'Normal', 100, 50, 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'https://cdn.pixabay.com/photo/2016/08/07/00/44/bed-1575491_960_720.jpg'),
      new Room('hab2', 'Elegante', 230, 30, 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'https://cdn.pixabay.com/photo/2014/08/11/21/40/bedroom-416063_960_720.jpg'),
      new Room('hab3', 'Lujosa', 300, 20, 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'https://cdn.pixabay.com/photo/2018/10/28/12/37/bedroom-3778695_960_720.jpg')
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
                <h3>${room.available} habitaciones disponibles</h3>
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
  return  `<tr>
            <td class="cell">${reservation.id}</td>
            <td class="cell">${reservation.person.firstName} ${reservation.person.lastName}</td>
            <td class="cell">${reservation.person.dui}</td>
            <td class="cell">${reservation.person.creditCard}</td>
            <td class="cell">${reservation.person.email}</td>
            <td class="cell">${reservation.person.phone}</td>
            <td class="cell">${reservation.room.name}</td>
            <td class="cell">${reservation.people}</td>
            <td class="cell">${reservation.dateStart}</td>
            <td class="cell">${reservation.dateEnd}</td>
            <td class="cell">$${reservation.pay}</td>
          </tr>`
}

const renderRoom = (id) => {
  roomsSection.innerHTML = ''
  ROOMS.forEach( r => {
    if(r.available > 0) {
      if( r.id === id || id === 'all') {
        const room = roomArticleTemplate(r)
        roomsSection.insertAdjacentHTML('beforeend', room)
      }
    }
  })

  addModal();

  // Habilitando el Spinner de Número de noches
  (id === 'all') ? divSpinner.classList.add('hidden') : divSpinner.classList.remove('hidden')
}

const renderReservations = () => {
  const headers = '<th>ID</th><th>Responsable</th><th>DUI</th><th>Tarjeta</th><th>Email</th><th>Teléfono</th><th>Habitación</th><th>Personas</th><th>Fecha inicial</th><th>Fecha final</th><th>Total</th>'
  reservationsSection.innerHTML = `<table id='tbl-reservations'><tr id="tbl-headers">${headers}</tr></table>`
  RESERVATIONS.forEach( r => {
    const reservation = reservationArticleTemplate(r)
    document.querySelector('#tbl-reservations').insertAdjacentHTML('beforeend', reservation)
  })
}
const renderOptions = () => {
  ROOMS.forEach( room => {
    if(room.available > 0) roomOptionTemplate( room )
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

const validateCreditCard = () => {
  let card = txtCreditCard.value
  let naux = 0
  card = card.replaceAll("-","")
  card = card.split('').reverse();
  for (const key in card) {
    if (key % 2 === 1) {
      card[key] = card[key] * 2
      if(card[key] >= 10) {
        card[key] = card[key].toString().split('')
        card[key] = parseInt(card[key][0]) + parseInt(card[key][1])
      }
    }
    naux += parseInt(card[key])
  }

  if(naux % 10 === 0 && naux !== 0) activeColorMsg(txtCreditCard, null)
  else activeColorMsg(txtCreditCard, 'Tarjeta invalida. Verifique su tarjeta')
}

const validateReservationPeople = () => {
  if(txtPeople.value > 0 && txtPeople.value <= 5) activeColorMsg(txtPeople, null)
  else activeColorMsg(txtPeople, 'Verifique la cantidad de personas')
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
    activeColorMsg(txtNights, null)
    spinnerNights.value = nights
  } else {
    activeColorMsg(txtNights, 'Verifique la cantidad de noches')
  }
}

const validateReservationDate = () => {
  let dStart = new Date(dateStart.value)
  dStart.setDate(dStart.getDate() + 1)

  if(Date.now() <= dStart) {
    validateReservationStay()
    activeColorMsg(dateStart, null)

    return true
  } else {
    activeColorMsg(dateStart, 'Verifique la fecha de reservación')
    return false
  }
}

const cleanForm = () => {
  let date = new Date()

  txtDui.value = ''
  txtName.value = ''
  txtLastName.value = ''
  txtCreditCard.value = ''
  txtEmail.value = ''
  txtPhone.value = ''
  txtPeople.value = ''
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

const activeColorMsg = (element, msg) => {
  if(!msg){
    element.style.setProperty("border-color","transparent")
    formError.innerText = ''
  } else {
    element.style.setProperty("border-color","#e8505b")
    formError.innerText = msg
  }
}

txtCreditCard.oninput = () => validateCreditCard()
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

const updateRoomsAvailable = () => {
  for (const key in ROOMS) {
    if (ROOMS[key].id == hab.id) {
      ROOMS[key].available--
      setRoomList(ROOMS)
    }
  }
}

const makeReservation = () => {
  const p = new Person(txtDui.value, txtName.value, txtLastName.value, txtCreditCard.value, txtEmail.value, txtPhone.value)
  const r = new Reservation(txtDui.value + dateStart.value, txtPeople.value, dateStart.value, dateEnd.value, hab.price * nights, p, hab)
  RESERVATIONS.push(r)
  setReservationList(RESERVATIONS)
  updateRoomsAvailable()
  goToSection('reservations')
}

const hideModal = () => {
  modalReservation.classList.add('hidden')
  nights = 1
  spinnerNights.value = nights
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
const goToSection = (section) => {
  switch (section) {
    case 'rooms':
      btnHome.classList.add('active-border')
      btnReservations.classList.remove('active-border')
      sectionHome.classList.remove('hidden')
      sectionReservations.classList.add('hidden')
      renderRoom('all')
      break;
    case 'reservations':
      btnReservations.classList.add('active-border')
      btnHome.classList.remove('active-border')
      sectionReservations.classList.remove('hidden')
      sectionHome.classList.add('hidden')
      renderReservations()
      break;
  }
}

btnHome.addEventListener('click', () => goToSection('rooms'))
btnReservations.addEventListener('click', () => goToSection('reservations'))

//Inicializando ...
spinnerNights.value = nights
spinnerNights.setAttribute('disabled',true)
dateEnd.setAttribute('disabled',true)
renderOptions()
renderRoom('all')