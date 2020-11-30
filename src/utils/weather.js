
const request = require('request')

const MESSAGES = {
  network: 'Unable to contact weather service',
  location: 'Unable to find location'
}
exports.forecast = getWeather = (latitude, longitude, cb) => {
  const opts = {
    method: 'GET',
    url: `${process.env.APP_WEATHER_URL}/onecall`,
    qs: {
      appid: process.env.APP_WEATHER_KEY,
      lat: latitude,
      lon: longitude,
      units: 'imperial',
      exclude: 'minutely,hourly'
    },

  }
  return request(opts, (error, response) => {
    if (error) {
      return cb(MESSAGES.network, undefined)
    } else if (response.body.error) {
      return cb(MESSAGES.location, undefined)
    } else {
      const {current, daily, alerts} = JSON.parse(response.body)
      const today = daily[0] || {}
      const alert = alerts ? alerts[0].description : ''
      const icon = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
      const msg = `It is currently ${current.weather[0].description} and ${Math.round(current.temp)}F with an expected high of ${Math.round(daily[0].temp.max)}F and a low of ${Math.round(daily[0].temp.min)}F. `
      return cb(undefined, {msg, alert, icon})
    }
  })
}
