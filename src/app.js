const express = require('express')
const path = require('path')
const hbs = require('hbs')

const {geocode} = require('./utils/geocode')
const {forecast} = require('./utils/weather')

const app = express() 

const pubPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// handlebars config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// static config    
app.use(express.static(pubPath))

app.get('', (req, res) =>{
    res.render('index', { title: 'Weather', name: 'beagler'})
})

app.get('/about', (req, res) =>{
    res.render('about', {title: 'About', name: 'beagler'})
}); 
app.get('/help', (req, res) =>{
    res.render('help', {title: 'Help', content: 'get help here', name: 'beagler'})
}); 

app.get('/weather', (req, res) =>{
    if(req.query.address){
        // return res.send({ forecast: 'something', location: 'somewhere', address: req.query.address })
        return geocode(req.query.address, (err, { longitude, latitude, location} = {}) => {
            if (err) return res.send({error: err})
            // console.log('Data', data)
            forecast(latitude, longitude, (err, forecastData) => {
                if (err) return res.send({ error: err })
                return res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
            })
        })
    }
    return res.send({error: 'address is required'}) 
}); 

app.get('/help/*', (req,res) =>{
    res.render('404', {title: "help", errorMessage: 'article not found'})
})

app.get('*', (req,res) =>{
    res.render('404', {title: "404", errorMessage: `Sorry that page does not exist: ${req.url}`})
})

app.listen(3000, () =>{
    console.info('server is on port 3000')
})