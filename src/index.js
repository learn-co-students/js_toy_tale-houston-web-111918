const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const submitBtn = document.querySelector('.submit')

let nameInput = document.querySelector(`.add-toy-form input[name="name"]`)
let imgInput = document.querySelector(`.add-toy-form input[name="image"]`)

let addToy = false
let allToys = []


let fetchToys = function(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => allToys = json)
  .then(render)
}

let fetchNewToy = function(data){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then( () => {
    nameInput.value = '',
    imgInput.value = ''
    addToy = !addToy
  })
  .then(render)
}

let fetchLikes = function(toy){
  toy.likes = parseInt(toy.likes) + 1
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(render)
}

let render = function(){
  toyCollection.innerHTML = ''
  allToys.forEach( toy => {
    let card = document.createElement('div')
    let name = document.createElement('h2')
    let img = document.createElement('img')
    let likes = document.createElement('p')
    let likeButton = document.createElement('button')

    card.setAttribute('class', 'card')
    name.innerText = toy.name
    likes.innerText = toy.likes + " likes"
    img.src = toy.image
    img.className = 'toy-avatar'

    likeButton.setAttribute('class', 'like-btn')
    likeButton.innerText = "Like"
    likeButton.addEventListener('click', (e) => {
      e.preventDefault()
      fetchLikes(toy)
    })
    
    card.append(name, img, likes, likeButton)
    toyCollection.append(card)
  })
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  console.log('something happened')
  let data = {
    'name': nameInput.value,
    'image': imgInput.value, 
    'likes': '0'
  }

  allToys.push(data)
  fetchNewToy(data)
})

fetchToys()
