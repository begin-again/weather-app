const {geocode} = require('./geocode')
const {forecast} = require('./weather')

const report = (address, res) => {
  return geocode(address, (err, { longitude, latitude, location } = {}) => {
    if (err) return res.send({ error: err })
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) return res.send({ error: err })
      return res.send({
        forecast: forecastData,
        location,
        address
      })
    })
  })
}

module.exports = {
  report
}
