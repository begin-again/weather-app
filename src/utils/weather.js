
exports.forecast = getWeather

const request = require('request')
const env = require('../env.json')

const MESSAGES = {
  network: 'Unable to contact weather service',
  location: 'Unable to find location'
}
function getWeather (latitude, longitude, cb) {
  const opts = {
    url: `${env.weather.url}/forecast/${env.weather.key}/${latitude},${longitude}`,
    json: true,
    qs: {
      units: 'us'
    }
  }
  return request(opts, (error, response) => {
    if (error) {
      return cb(MESSAGES.network, undefined)
    } else if (response.body.error) {
      return cb(MESSAGES.location, undefined)
    } else {
      const current = response.body.currently
      const today = response.body.daily.data[0]
      const msg = `${today.summary} It is currently ${current.temperature} degrees out. There is a ${current.precipProbability}% chance of rain.`
      return cb(undefined, msg)
    }
  })
}
