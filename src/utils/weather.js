const got = require('got')

/**
 * @callback requestCallback
 */

const MESSAGES = {
  network: 'Unable to contact weather service',
  location: 'Unable to find location'
}

/**
 * Obtains and formats forecast data
 *
 * @param {Number} latitude
 * @param {Number} longitude
 * @param {requestCallback} cb
 */
const forecast = async (latitude, longitude, cb) => {
  const searchParams = {
    appid: process.env.APP_WEATHER_KEY,
    lat: latitude,
    lon: longitude,
    units: 'imperial',
    exclude: 'minutely,hourly'
  }
  const url = `${process.env.APP_WEATHER_URL}/onecall`
  const responseType = 'json'

  try {
    const response = await got(url, { searchParams, responseType })
    if (response.body.error) {
      return cb(MESSAGES.location, undefined)
    } else {
      const { current, daily, alerts } = response.body
      const alert = alerts ? alerts[0].description : ''
      const icon = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
      const msg = `It is currently ${current.weather[0].description} and ${Math.round(current.temp)}F with an expected high of ${Math.round(daily[0].temp.max)}F and a low of ${Math.round(daily[0].temp.min)}F. `
      return cb(undefined, { msg, alert, icon })
    }
  } catch (error) {
    return cb(MESSAGES.network, undefined)
  }
}

module.exports = forecast
