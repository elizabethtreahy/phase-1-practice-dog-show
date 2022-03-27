document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
});

function fetchDogs() {
  fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(data => loadDogs(data))
}

function loadDogs(dogData) {
  console.log(dogData)
  dogData.forEach(element => {
    const tr = document.createElement("tr")
    const dogName = document.createElement("td")
    dogName.innerText = element.name
    tr.append(dogName)
    const dogBreed = document.createElement("td")
    dogBreed.innerText = element.breed
    tr.append(dogBreed)
    const dogSex = document.createElement("td")
    dogSex.innerText = element.sex
    tr.append(dogSex)
    const dogButton = document.createElement("button")
    dogButton.innerText = ('Edit Dog')
    dogButton.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(element)
      const formName = document.querySelector('input[name=name]')
      const formBreed = document.querySelector('input[name=breed]')
      const formSex = document.querySelector('input[name=sex]')
      formName.value = element.name
      formBreed.value = element.breed
      formSex.value = element.sex
      document.getElementById('dog-form').addEventListener("submit", (event) => {
      // event.preventDefault();
      console.log(element)
      fetchUpdate(element.id, formName.value, formBreed.value, formSex.value)
      })
    })
    tr.append(dogButton)
    document.getElementById("table-body").append(tr)
  })
}
function fetchUpdate(id, name, breed, sex) {
  const dogData = {
    name: name,
    breed: breed,
    sex: sex
  }
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dogData)
  })
    .then(response => response.json())
    .then(dogs => console.log(dogs))
}

  // })

