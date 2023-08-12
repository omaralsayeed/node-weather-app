const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const app = express()

// Define paths of directories
let dirPath = path.join(__dirname, '../public')
let viewsPath = path.join(__dirname, '../templates/views')
let partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(dirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Hello World',
        author: 'Omar El Sayed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Omar El Sayed'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'We would love to help.',
        author: 'Omar El Sayed'
    })
})

/* app.get('', (req, res) => {
    res.send('Hello, Express!')
}) */


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        })
    }
    url = `http://api.weatherstack.com/current?access_key=6e12cbd2d9ce6d1df49cdb3a14d7eb78&query=${req.query.address}`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            return res.send({
                error
            })
        } else if (response.body.error) {
            return res.send({
                error: response.body.error.info
            })
        } else {
            return res.send({
                forecast: response.body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain.'
            })
        }
    })
    // Geocoding
    // Address -> Lat/Long -> Weather
    /* const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.query.address}.json?access_token=pk.eyJ1Ijoib21hcmlpYnJhaGVlbTciLCJhIjoiY2xremZkYXN6MXN0bTNkcHBsbHo4bnd2MCJ9.mepThvjah-qk3a_wDROr8g&limit=1`
    request({ url: geocodeURL, json: true }, (error, response) => {
        // console.log(response.body)
        latitude = response.body.features[0].center[0]
        longitude = response.body.features[0].center[1]
        console.log(latitude, longitude)
        url = `http://api.weatherstack.com/current?access_key=6e12cbd2d9ce6d1df49cdb3a14d7eb78&query=${latitude},${longitude}`
        request({ url: url, json: true }, (error, response) => {
            if (error) {
                return res.send({
                    error
                })
            } else if (response.body.error) {
                return res.send({
                    error: response.body.error.info
                })
            } else {
                return res.send({
                    forecast: response.body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain.'
                })
            }
        })
    }) */
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/me/*', (req, res) => {
    res.render('404', {
        error: 'About Me Article is not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is running!')
})