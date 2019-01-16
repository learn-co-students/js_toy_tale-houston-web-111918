const qs = (arg) => {
  return document.querySelector(arg)
}
const ce = (arg) => {
  return document.createElement(arg)
}
const toyDiv = qs('#toy-collection')
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toys;
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


// OR HERE!
const render = () => {
  fetch('http://localhost:3000/toys')
      .then(res => res.json())
      .then(res => toys = res)
      .then(renderToys)
}

function renderToys(toys) {
  toyDiv.innerHTML = ''
  toys.forEach((toy) => {
    // return (
    //     div({class: 'card'},
    //       h2({}, toy.name),
    //         img({class: 'toy-avatar'}, toy.image),
    //
    //
    //     )
    // )
    let toyCard = ce('div')
    toyCard.setAttribute('class', 'card')
    let toyName = ce('h2');
    toyName.innerText = toy.name
    let toyImage = ce('img');
    toyImage.setAttribute('class', 'toy-avatar')
    toyImage.src = toy.image
    let toyLikes = ce('p');
    toyLikes.innerText = `${toy.likes}`
    let toyLikeButton = ce('button')
    toyLikeButton.setAttribute('class', 'like-btn')
    toyLikeButton.innerText = '🖤To Infinity🖤'

    toyLikeButton.addEventListener('click', e => {
      addLikeToy(toy)
    })
    toyDiv.append(toyCard)
    toyCard.append(toyName, toyImage, toyLikes, toyLikeButton)
  })
}

function addLikeToy(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      likes: (toy.likes + 1)
    })
  })
      .then(render);
}

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    document.body.querySelector('.submit').addEventListener('click', (e) => {
      e.preventDefault()
      createNewToy()
    })
  } else {
    toyForm.style.display = 'none'
  }
})

function createNewToy() {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify (
        {
          name: document.querySelector('input[name = "name"]').value,
          image: document.querySelector('input[name = "name"]').value,
          likes: 0
        })
  })
      .then(render);
}

render();
