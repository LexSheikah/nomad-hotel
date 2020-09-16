import Room from './room.js'
import Reservation from './reservation.js'
import Person from './person.js'

const roomsSection = document.querySelector('#rooms'),
      reservationsSection = document.querySelector('#reservations'),
      divSpinner = document.querySelector('#spinner-number'),
      btnPlus = document.querySelector('#spinner-plus'),
      btnMinus = document.querySelector('#spinner-minus'),
      txtNights = document.querySelector('#spinner-input'),
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
      txtEmail = document.querySelector('#txt-email'),
      txtPhone = document.querySelector('#txt-phone'),
      txtPeople = document.querySelector('#txt-people'),
      dateStart = document.querySelector('#date-start'),
      dateEnd = document.querySelector('#date-end')

let nights = 1,
    RESERVATIONS = [],
    PEOPLE = [],
    hab = null

//#region DATOS DE PRUEBA
const person1 = new Person('12345678-9','Lex Marvin','Ortiz Canizález','lex.ortizc@gmail.com','7477-4734')
const reservation1 = new Reservation('r01',3,'2020-08-30','2020-09-01','12345678-9','hab3')
// PEOPLE.push(person1)
// RESERVATIONS.push(reserva1)
// RESERVATIONS.push(reserva1)
//#endregion

const ROOMS = [
  new Room('hab1', 'Normal', 100, 10, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'https://cdn.pixabay.com/photo/2016/08/07/00/44/bed-1575491_960_720.jpg'),
  new Room('hab2', 'Elegante', 230, 5, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'https://cdn.pixabay.com/photo/2014/08/11/21/40/bedroom-416063_960_720.jpg'),
  new Room('hab3', 'Lujosa', 300, 2, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'https://cdn.pixabay.com/photo/2018/10/28/12/37/bedroom-3778695_960_720.jpg')
]

const roomOptionTemplate = ( hab ) => {
  const selectItem = document.createElement('option')
  selectItem.setAttribute('value', hab.id)
  selectItem.insertAdjacentText('beforeend', hab.name)
  slcRooms.insertAdjacentElement('beforeend', selectItem)
}

const roomArticleTemplate = ( hab ) => {
  return  `<article class="card shadow">
            <img src="${hab.image}" class="card-img" alt="${hab.name}">
            <div class="p24">
              <div class="card-header row">
                <h2 class="text2">${hab.name}</h2>
                <h3>$${hab.price} por noche</h3>
                <h3>${hab.available} habitaciones disponibles</h3>
              </div>
              <p class="card-body">${hab.description}</p>
            </div>
            <div class="card-price">
              <h2 class="text1 active">$${hab.price * nights}</h2>
              <h4 class="text3">por ${nights} noche(s)</h4>
              <button class="btn-reserve btn-primary" value="${hab.id}"> Reservar </button>
            </div>
          </article>`
}

const reservationArticleTemplate = ( reserva, persona, habitacion) => {
  return  `<article class="card-reservation card">
            <label><span class="active">Nombre responsable: </span> ${persona.name} ${persona.lastName}</label>
            <label><span class="active">DUI: </span> ${persona.dui}</label>
            <label><span class="active">Email: </span> ${persona.email}</label>
            <label><span class="active">Teléfono: </span> ${persona.phone}</label>
            <label><span class="active">Habitacion: </span> ${habitacion.name}</label>
            <label><span class="active">Cantidad de personas: </span> ${reserva.people}</label>
            <label><span class="active">Fecha inicial: </span> ${reserva.dateStart}</label>
            <label><span class="active">Fecha final: </span> ${reserva.dateEnd}</label>
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
    const reservation = reservationArticleTemplate(r, searchPersonById(r.dui), searchRoomById(r.idRoom))
    reservationsSection.insertAdjacentHTML('beforeend', reservation)
  })

  if(RESERVATIONS.length == 0) reservationsSection.insertAdjacentHTML('beforeend', '<h4 id="not-found">Aún no existen reservaciones</h4>')

}
const renderOptions = () => {
  ROOMS.forEach( hab => {
    roomOptionTemplate( hab )
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
  txtNights.value = nights
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

const searchPersonById = ( dui ) => {
  let person = PEOPLE.filter( p => p.dui === dui)
  return person[0]
}

// Manejo del modal para reservar habitación
const showModal = ( id ) => {
  let date = new Date();
  hab = searchRoomById(id)
  console.log(hab)
  document.querySelector('#room-img').setAttribute('src', hab.image)
  document.querySelector('#room-name').innerText = hab.name
  document.querySelector('#room-description').innerText = `${hab.description}`
  document.querySelector('#room-price').innerText = `$${hab.price}`
  document.querySelector('#room-stay').innerText = `${nights} noche(s)`
  document.querySelector('#room-pay').innerText = `$${hab.price * nights}`

  modalReservation.classList.remove('hidden')

  // Seteando fechas para la reservación
  dateStart.value = date.toISOString().substr(0, 10);
  date.setDate(date.getDate() + nights);
  dateEnd.value = date.toISOString().substr(0, 10);
}

// Validar formulario
let formFields = document.querySelectorAll('.field')
formFields.forEach( campo => campo.oninput = () => activeColor(campo))

const validateReservationDate = () => {
  let dStart = new Date(dateStart.value),
      dEnd = new Date(dateEnd.value)

      dStart.setDate(dStart.getDate() + 1)
      dEnd.setDate(dEnd.getDate() + 1)

  if(Date.now() <= dStart && dEnd > dStart) {
    nights = (dEnd.getTime() - dStart.getTime()) / 86400000
    // document.querySelector('#box-img').setAttribute('src', hab.image)
    // document.querySelector('#box-price').innerText = `$${hab.price * nights}`
    // document.querySelector('#box-name').innerText = `Habitación  ${hab.name} por ${nights} noche(s)`
    dateStart.style.setProperty("border-color","transparent")
    dateEnd.style.setProperty("border-color","transparent")
    return true
  } else {
    document.querySelector('#form-error').innerText = `Verifique la fecha de reservación`
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
}

const activeColor = (element) => {
  if(element.value === "") {
    element.style.setProperty("border-color","#e8505b")
  } else {
    element.style.setProperty("border-color","transparent")
  }
}

dateStart.addEventListener('change', validateReservationDate)
dateEnd.addEventListener('change', validateReservationDate)

document.querySelector("#btn-close").addEventListener('click', (e) => {
  e.preventDefault();
  hideModal();
})

document.querySelector('#btn-confirm').addEventListener('click', (e) => {
  e.preventDefault()
  let formComplete = true

  formFields.forEach( campo => {
    if(campo.value === "") {
      activeColor(campo)
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
  const r = new Reservation(txtDui.value + dateStart.value, txtPeople.value, dateStart.value, dateEnd.value, txtDui.value, hab.id)
  PEOPLE.push(p)
  RESERVATIONS.push(r)
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
txtNights.value = nights
txtNights.setAttribute('disabled',true)
renderOptions()
renderRoom('all')