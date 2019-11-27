const express = require('express')
const path = require('path')
const app = express();
const hbs = require('hbs');
const geocode = require('./geocoding.js')
const forecast = require('./forecast.js')

console.log(__dirname);
console.log(__filename);
var pulbicDirectoryPath = path.join(__dirname,'../public')
var viewPath = path.join(__dirname,'../../templates/views');
var partialPath = path.join(__dirname,'../../templates/partials')
console.log(viewPath)


app.use(express.static(pulbicDirectoryPath));
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

    // console.log(req.query)
    
    // res.send({
    //     forecast : 'It is Snowing',
    //     Location: 'Patiala',
    //     address : req.query.address
    // })
app.get('/',(req,res) => {
    res.render('weather')
})

app.get('/weather',(req,res) => {
    if (!req.query.address){
        return res.send("Please provide a search item")
    }
    geocode(req.query.address,(error,data = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(data.longitude,data.latitude,(error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location : data.timezone,
                address : req.query.address
            })
        })
    })
})  

app.get('/about',(req,res) => {
    res.render('about',{
        name : "divit joshi",
        age : "18",
        instagram_id : "dj_5353"
    })
})

app.get('/help',(req,res) => {
    res.render('help')
})
app.get('/help/*',(req,res) => {
    res.render('help_error')
})

app.get('*',(req,res) => {
    res.render('Page_404')
})



app.listen(8000,() => {
    console.log("Port has been started at port number 8000")
})
