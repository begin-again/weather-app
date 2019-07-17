console.log('client app loaded')

function getWeather(location){
    return fetch(`/weather?address=${location}`)
    .then(resp =>{
        if(resp.ok) return resp.json()
        throw { error: 'Network response was not ok.'}
    .then(data =>{
        if(data.error) {
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

msg2.textContent = ""

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    msg2.textContent = ""
    msg1.textContent = "Loading..."
    return getWeather(location)    
        .then((data) =>{
            if(data.error) {
                msg2.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
        .catch(data =>{
            msg2.textContent = data.error
        })
})