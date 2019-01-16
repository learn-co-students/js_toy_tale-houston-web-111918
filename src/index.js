const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

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


// OR HERE!\

function c(arg){
  return document.createElement(arg)
}

function s(arg){
  return document.querySelector(arg)
}




fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(res => {
    toys = res
    render()
  }) //fetch end

  //VARIABLES
  
  let form = s('.add-toy-form')
  let toyButton = form.submit
  let newToy;
  let toyCollection = s('#toy-collection')
  let toys;
  
  toyButton.addEventListener('click', (e) => {
    e.preventDefault()
    name = form.name.value 
    image = form.image.value
    let likes; 
    // console.log(form.name.value)
    newToy = {
      name: `${name}`,
      image: `${image}`,
      likes: "0"
    }

    toys.push(newToy)

     fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
        // Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })
    render()
      
  })

  
function render(){
  toyCollection.innerHTML = ''
  toys.forEach(toy => {
    
    let toyCard = c('div') 
    toyCard.setAttribute("class", "card") //CANNOT DO on ONE line //attributename, attirbutevalue
    let name = c('h2')
    let likes = c('p')
    let image = c('img')
    let button = c('button')
    image.setAttribute("class", "toy-avatar") //for some reason made images smaller and attached properly
    button.setAttribute("class", "like-btn")
    button.innerText = "LIKE"
    name.innerText = toy.name
    likes.innerText = toy.likes
    image.src = toy.image

  
      toyCard.append(name, likes, image, button)
    
    
    toyCollection.append(toyCard)

    button.addEventListener('click', () => {
      let currentToy = toy
      currentToy.likes += 1
      fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",  
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(toy)

      })
      render()
    })

    
  
    })
    
} //render end