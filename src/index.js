let s = function(selector) {
  return document.querySelector(selector);
};
let c = function(tagName) {
  return document.createElement(tagName);
};
let toys = [];
let addToy = false;
const addBtn = s("#new-toy-btn");
const toyForm = s(".container");
let toyListCollection = s("#toy-collection");
let createToyButton = s("#create-button");
let createImage = s("#image-url");
let createName = s("#toy-name");
let toyFormSelector = s(".add-toy-form");

function render() {
  if (addToy) {
    toyForm.style.display = "block";
    toyFormSelector.addEventListener("submit", createToy);
    // submitot listener here
  } else {
    toyForm.style.display = "none";
  }

  toyListCollection.innerText = "";
  toys.forEach(toy => {
    let newDiv = c("div");
    let toyHeader = c("h2");
    let toyImage = c("img");

    newDiv.setAttribute("class", "card");
    toyListCollection.append(newDiv);
    toyHeader.innerText = toy.name;
    toyImage.src = toy.image;
    toyImage.setAttribute("class", "toy-avatar");

    let toyLikes = c("p");
    let toyLikesButton = c("button");

    toyLikesButton.setAttribute("class", "like-btn");
    toyLikesButton.innerText = "Like <3";
    toyLikes.innerText = toy.likes;
    toyLikesButton.addEventListener("click", e => {
      e.preventDefault();
      toy.likes += 1;

      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toy)
      }).then(render);
    });

    newDiv.append(toyHeader, toyImage, toyLikes, toyLikesButton);
  });

  function createToy(e) {
    e.preventDefault();

    let inputs = document.querySelectorAll(".input-text");
    let name = inputs[0].value;
    let image = inputs[1].value;

    let toyData = {
      name: name,
      image: image,
      likes: 0
    };

    fetch(`http://localhost:3000/toys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toyData)
    })
      .then((addToy = !addToy))
      .then(fetchData);
  }
  // createToyButton.addEventListener("click", e => {
  //   e.preventDefault();
  //   createName.innerText = "";
  //   createImage.innerText = "";

  //   toy.name = createName.value;
  //   toy.value = createImage.value;

  //   console.log("name ", toy.name);
  //   console.log("value ", toy.value);

  // });
}

function fetchData() {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(res => (toys = res))
    .then(render);
}

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  render();
});

fetchData();
// OR HERE!
