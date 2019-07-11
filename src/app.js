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
    if(req.query.address){
        return res.send({ forecast: 'something', location: 'somewhere', address: req.query.address })
    }
    return res.send({
        error: 'address is required'
    }) 
}); 

app.get('/products', (req, res) =>{
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error: 'search term required'
        })
    }
    res.send({products: []})
})

app.get('/help/*', (req,res) =>{
    res.render('404', {title: "help", errorMessage: 'article not found'})
})

app.get('*', (req,res) =>{
    res.render('404', {title: "404", errorMessage: `Sorry that page does not exist: ${req.url}`})
})

app.listen(3000, () =>{
    console.info('server is on port 3000')
})