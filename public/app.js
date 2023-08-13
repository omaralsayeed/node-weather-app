let formElement = document.querySelector('form')
let inputElement = formElement.querySelector('input')

let messageOne = document.querySelector('p#message-1')
let messageTwo = document.querySelector('p#message-2')
formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    fetch(`/weather?address=${inputElement.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

