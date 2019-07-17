
exports.geocode = getLocation

const request = require('request')
const geoURL = process.env.GEO_URL || require('../env.json').geo.url
const geoKey = process.env.GEO_KEY || require('../env.json').geo.key

const MESSAGES = {
  network: 'Unable to contact location services!',
  location: 'Unable to find location'
}

function getLocation (search, cb) {
  const opts = {
    url: `${geoURL}/${search}.json`,
    json: true,
    qs: {
      access_token: geoKey,
      limit: 1
    }
  }
  request(opts, (error, response) => {
    if (error) {
      return cb(MESSAGES.network, undefined)
    } else if (response.body.features.length === 0) {
      cb(MESSAGES.location, undefined)
    } else {
      const latitude = response.body.features[0].center[1]
      const longitude = response.body.features[0].center[0]
      const location = response.body.features[0].place_name
      return cb(undefined, { latitude: latitude, longitude: longitude, location: location })
    }
  })
}
