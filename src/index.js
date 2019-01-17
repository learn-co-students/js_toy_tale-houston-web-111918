// Utilities
let c = function (tagName) {
  return document.createElement(tagName)}


  // Variables
  let addToy = false
  let toys = [] 

  // HTML Elements
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.querySelector('#toy-collection')
let createBtn = document.querySelector('#submit')
const inputName = document.querySelector('#name-input')
const inputImage = document.querySelector('#image-input')


// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

function toyLike(toy){
  
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      likes: toy.likes++
    })
  })
  .then(render)
}

createBtn.addEventListener('click', (e) => {
  e.preventDefault()
  fetch('http://localhost:3000/toys/',{
  method: 'POST',
  headers:{
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: inputName.value,
    image: inputImage.value,
    likes: 0
  })
})
.then(fetchData)

})



function render(){
  
  toyContainer.innerHTML = ''
  toys.forEach(toy => {
    let toyInfo = c('div')
    toyInfo.setAttribute("class", "card")
    let toyName = c('h2')
    let toyImage = c('img')
    toyImage.setAttribute("class", "toy-avatar" )
    let toyLikes = c('p')
    let likeButton = c('button')
    toyName.innerText = toy.name 
    toyImage.src = toy.image
    toyLikes.innerText = toy.likes
    likeButton.innerText = "like!"
    toyInfo.append(toyName, toyImage, toyLikes, likeButton)
    toyContainer.append(toyInfo)

    likeButton.addEventListener('click', () => {toyLike(toy)} )
  })
}

function fetchData(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(res => toys = res)
  .then(render)
}
 fetchData()



