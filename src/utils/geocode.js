
exports.geocode = getLocation

const request = require('request')
const env = require('../env.json')

const MESSAGES = {
  network: 'Unable to contact location services!',
  location: 'Unable to find location'
}

function getLocation (search, cb) {
  const opts = {
    url: `${env.geo.url}/${search}.json`,
    json: true,
    qs: {
      access_token: env.geo.key,
      limit: 1
    }
  }
  request(opts, (error, response) => {
    if (error) {
      return cb(MESSAGES.network, undefined)
    } else if (response.body.features.length === 0) {
      cb(MESSAGES.location, undefined)
    } else {
      const latitude = response.body.features[0].center[0]
      const longitude = response.body.features[0].center[1]
      const location = response.body.features[0].place_name
      return cb(undefined, { latitude: latitude, longitude: longitude, location: location })
    }
  })
}
