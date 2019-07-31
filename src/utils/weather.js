
exports.forecast = getWeather

const request = require('request')

const MESSAGES = {
  network: 'Unable to contact weather service',
  location: 'Unable to find location'
}
function getWeather (latitude, longitude, cb) {
  const opts = {
    url: `${process.env.APP_WEATHER_URL}/forecast/${process.env.APP_WEATHER_KEY}/${latitude},${longitude}`,
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
      const msg = `${today.summary} It is currently ${Math.round(current.temperature)}F degrees with a high expected of ${Math.round(today.temperatureHigh)}F. 
      There is a ${current.precipProbability < 1 ? '<1' : Math.round(current.precipProbability)}% chance of precipitation.
      `
      return cb(undefined, msg)
    }
  })
}
