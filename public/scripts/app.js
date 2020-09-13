
function getWeather (location) {
  return fetch(`/weather?address=${location}`)
    .then(resp => {
      if (resp.ok) return resp.json()
      throw { error: 'Network response was not ok.' }
        .then(data => {
          if (data.error) {
            return Promise.reject(data)
          }
          return Promise.resolve(data)
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#fetch-success')
const msg2 = document.querySelector('#fetch-error')
const msg3 = document.querySelector('#fetch-alerts')

msg2.textContent = ''
msg3.textContent = ''

document.addEventListener('DOMContentLoaded', (e) => {
  if (search.value) {
    process(search.value)
  }
}, { once: true })

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  process(search.value)
})

const process = (location) => {
  msg2.textContent = msg3.textContent = ''
  msg1.textContent = 'Loading...'
  return getWeather(location)
    .then((data) => {
      if (data.error) {
        msg1.textContent = data.error
      } else {
        msg1.textContent = data.location
        msg2.textContent = data.forecast.msg
        msg3.textContent = data.forecast.alert
      }
    })
    .catch(data => {
      msg1.textContent = data.error
    })
}
