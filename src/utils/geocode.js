const got = require('got')

/**
 * @callback requestCallback
 */

const MESSAGES = {
  network: 'Unable to contact location services!',
  location: 'Unable to find location'
}

/**
 * Obtains coordinates for specified location
 *
 * @param {String|Number} search
 * @param {requestCallback} cb
 */
const getLocation = async (search, cb) => {
  const searchParams = {
    access_token: process.env.APP_GEO_KEY,
    limit: 1
  }
  const url = `${process.env.APP_GEO_URL}/${search}.json`
  const responseType = 'json'

  try {
    const response = await got(url, { searchParams, responseType })
    if (response.body.features.length === 0) {
      cb(MESSAGES.location, undefined)
    } else {
      const latitude = response.body.features[0].center[1]
      const longitude = response.body.features[0].center[0]
      const location = response.body.features[0].place_name
      return cb(undefined, { latitude: latitude, longitude: longitude, location: location })
    }
  } catch (error) {
    return cb(MESSAGES.network, undefined)
  }
}

module.exports = getLocation
