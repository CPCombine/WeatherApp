const express = require('express')
const path = require('path')  //lets us manipulate the path to resources
const hbs = require('hbs')  //loads hbs so we can use partials
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

 

//run the express function
const app = express()
const port = process.env.PORT  || 3000

//Define paths for Express config
const publicPath = path.join(__dirname, '../public')  //serve up the path to public for resources
const viewsPath = path.join(__dirname, '../templates/views') //lets us customize the location of hbs views files from the default '<project root>/views/' folder
const partPath = path.join(__dirname, '../templates/partials') //lets us customize the location of hbs partial files

//setup static directory to serve
app.use(express.static(publicPath))

//Setup Handlebars engive views location
app.set('view engine', 'hbs')  //tell express what engine we installed: handlebars
app.set('views', viewsPath) //custom 'views' folder name and location
hbs.registerPartials(partPath)

//setup default page to use index.hbs
app.get('', (req, res) =>{  
    res.render('index', {
        title:'Weather',
        name:'Britt ROOLZ'
    })
})

//setup /about page with hbs
app.get('/about', (req, res) =>{  //setup default page to use index.hbs
    res.render('about', {
        title:'About Me',
        name:'Britt McAwesomeville'
    })
})

//setup /help page with hbs
app.get('/help', (req, res) =>{  //setup default page to use index.hbs
    res.render('help', {
        title:'Help Page',
        message:'This is the help message',
        name:'Britt McAwesomeville'
    })
})

//create a weather page
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'Please enter a valid city name or zipcode'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})  =>{
        if(error){ 
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, fcData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: fcData,
                location,
                address: req.query.address
            })
            
          })
    })
})

//testing query strings
app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({    //starting this with the return command will stop the code and prevent the second res.send command from executing
            error:'You must provide a search term.'
        })
    }
   console.log(req.query.search)
    res.send({
        products:[]
    })
})

//setup error page for /help child pages
app.get('/help/*',(req,res) => {
    res.render('404',{
        errorMSG:'Help page not found!',
        name:'NEWB-CAKES'
    })
})

//setup 404 page
app.get('*',(req,res) => {
    res.render('404',{
        errorMSG:'Page not found!',
        name:'You borked it!'
    })
})

//start the server
app.listen(port,() =>{  //listens on a port. We chose the common dev port but it is not the default port
    console.log('Server is up on port '+ port) //only viewable on terminal and not to web visitors
}) 