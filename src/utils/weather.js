
exports.forecast = getWeather

const request = require('request')
const weatherURL = process.env.WEATHER_URL || require('../env.json').weather.url
const weatherKey = process.env.WEATHER_KEY || require('../env.json').weather.key

const MESSAGES = {
  network: 'Unable to contact weather service',
  location: 'Unable to find location'
}
function getWeather (latitude, longitude, cb) {
  const opts = {
    url: `${weatherURL}/forecast/${weatherKey}/${latitude},${longitude}`,
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
      const precip = current.precipProbability * 100;
      const msg = `${today.summary} It is currently ${Math.round(current.temperature)}F degrees with a high expected of ${Math.round(today.temperatureHigh)}F. 
      There is a ${precipProbability < 1 ? '<1' : Math.round(precipProbability)}% chance of precipitation.
      `
      return cb(undefined, msg)
    }
  })
}
