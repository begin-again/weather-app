const express = require('express')
const path = require('path')
const hbs = require('hbs')

const { report } = require('./utils/helper')

const app = express()
const port = process.env.PORT || 5000

const pubPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// handlebars config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// static config
app.use(express.static(pubPath))

app.get('', (req, res) => {
  res.render('index', { title: 'Weather', name: 'beagler' })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'beagler' })
})

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help', content: 'get help here', name: 'beagler' })
})

app.get('/weather/:zip', (req, res, next) => {
  return report(req.params.zip, res)
})

app.get('/weather', (req, res) => {
  if (req.query.address) {
    return report(req.query.address, res)
  }
  return res.send({ error: 'address is required' })
})

app.get('/help/*', (req, res) => {
  res.render('404', { title: 'help', errorMessage: 'article not found' })
})

app.get('*', (req, res) => {
  res.render('404', { title: '404', errorMessage: `Sorry that page does not exist: ${req.url}` })
})

app.listen(port, () => {
  console.info(`server is on port ${port}`)
})
