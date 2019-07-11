const express = require('express')
const path = require('path')
const hbs = require('hbs')

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
    res.render('index', { title: 'Main', name: 'beagler'})
})
// app.get('/help', (req, res) =>{
//     res.sendFile(path.join(pub,"help.html"))
// }); 

app.get('/about', (req, res) =>{
    res.render('about', {title: 'About', name: 'beagler'})
}); 
app.get('/help', (req, res) =>{
    res.render('help', {title: 'Help', content: 'get help here', name: 'beagler'})
}); 

app.get('/weather', (req, res) =>{
    res.send({
        forcast: "some weather stuff"
        , location: "someplace"
    })
}); 

app.listen(3000, () =>{
    console.info('server is on port 3000')
})