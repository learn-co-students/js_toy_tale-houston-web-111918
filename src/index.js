const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const form = document.querySelector('.add-toy-form')
let addToy = false
let data

// YOUR CODE HERE

function updateLikes(one) {
  one.likes++
  fetch(`http://localhost:3000/toys/${one.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({'likes': one.likes})
  })
  .then(render)
}

function render(){
  toyCollection.innerHTML = ''
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
  data.forEach(one => {
    let div = document.createElement('div')
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let p = document.createElement('p')
    let button = document.createElement('button')
    div.className = 'card'
    h2.innerText = one.name
    img.src = one.image
    img.className = 'toy-avatar'
    p.innerText = one.likes
    button.className = 'like-btn'
    button.innerText = 'Like'
    button.addEventListener('click', e => {
      updateLikes(one)
    })
    div.append(h2, img, p, button)
    toyCollection.append(div)
  })
}

addBtn.addEventListener('click', () => {
  addToy = !addToy
  render()
})

document.addEventListener('DOMContentLoaded', e => {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(res => {
      data = res
      render()
    })
})

form.addEventListener('submit', e => {
  e.preventDefault()
  let formData = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  data.push(formData)
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(() => {
    e.target.name.value = ''
    e.target.image.value = ''
    addToy = !addToy
  })
  .then(render)
})



// OR HERE!
