console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

// const baseURL = 

getAllBtn.addEventListener('click', () => { // .then only runs the funciton if you get a good response back 
  axios.get('http://localhost:4000/characters').then((response) => { // makes a request to your own computer
  clearCharacters()
  for (let i = 0; i < response.data.length; i++) {
    createCharacterCard(response.data[i]);
  }
  })
  .catch(() => { // .catch runs if you get a bad response back // you need the catch if a website goes down it will change to show the user it didnt work

  }) 
})

createForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let maBod = {
    firstName: newFirstInput.value, 
    lastName: newLastInput.value, 
    gender: newGenderDropDown.value,
    age: newAgeInput.value, 
    likes: newLikesText.value.split(',')
  }

  axios.post(`${baseURL}/character`, maBod)
  .then((response) => {
    clearCharacters()
    for (let i = 0; i < response.data.length; i++) {
      createCharacterCard(response.data[i]);
    }
    newFirstInput.value = "";
    newLastInput.value = "";
    newAgeInput.value = "";
    newLikesText.value = "";
  })
  .catch(() => {
    
  })

})

const baseURL = 'http://localhost:4000'

ageForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

  let age = ageInput.value;

  axios.get(`${baseURL}/character?age=${age}`)
  .then((response) => {
    clearCharacters()
    for (let i = 0; i < response.data.length; i++) {
      createCharacterCard(response.data[i]);
    }
  })
  .catch((error) => {

  })
})

// if you do a backend log it shows up in the termial
// if you do a frontend log it shows up in chrome 

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}