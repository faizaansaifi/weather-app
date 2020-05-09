const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geo = require('./utils/geocode');
const fore = require('./utils/forecast');


const app = express();

const port = process.env.PORT || 3000

//Define paths for Express.js Config
const publicDir = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine  and views location
app.use(express.static(publicDir))
app.set('view engine','hbs');
app.set('views',viewsPath );
hbs.registerPartials(partialpath)

//Setup static directory to serve
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Scriptkiddy'
    })
})
app.get('/weather',(req,res) => {
    geo.geocode(req.query.search, (error, data) => {
        if(!req.query.search) {
            return res.send({
                error,
            })
        }
        else {
            fore.forcast(data, (error, forecast) => {
                if(!req.query.search) {
                    return res.send({
                        error,
                    })
                }
                console.log(data)
            res.send([{
                location: data.location,
                forecast: forecast,
                address: req.query.search
            }])
            })
        }
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About me',
        author: 'Script Kiddy'
    })
})
app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help',
        author: 'Script Kiddy'

    })
})

app.get('/help/*', (resq,res) => {
    res.render('404error', {
        title: '404',
        author: 'Script Kiddy',
        errorMsg: 'Help article not found'
    })
})
app.get('*', (req,res) => {
    res.render('404error', {
        title: '404',
        author: 'Script Kiddy',
        errorMsg: 'Somethhing went wrong. Please try again after some time'
    })
})
app.listen(port, () => {
    console.log("Server is running at localhost:"+port)
});