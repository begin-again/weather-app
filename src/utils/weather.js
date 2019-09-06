
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
      const today = response.body.daily.data[0];
	const precip = Math.round(current.precipProbability * 100);
	const alerts = response.body.alerts;
      const msg = `${today.summary} It is currently ${current.summary} and ${Math.round(current.temperature)}F degrees with a high expected of ${Math.round(today.temperatureHigh)}F. 
      There is a ${precip}% chance of precipitation.
      \n\n${alerts ? alerts[0].title : ``}
      `
      return cb(undefined, msg)
    }
  })
}
