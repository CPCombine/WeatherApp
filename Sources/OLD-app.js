const express = require('express')
const path = require('path')  //lets us manipulate the path to resources
 

//  console.log(__dirname)  //default variables provided by node.js points to core directory
//  console.log(__filename) //default variables provided by node.js
//  console.log(path.join(__dirname,'../..'))   //will move backwards 2 directory levels but use the html forward slash / and not the platform specific \ for windows
//  console.log(path.join(__dirname, '../public'))      //will move back a folder level then forward into the public folder

//run the express function
const app = express()

//serve up the path to public for resources like index.html
const publicPath = path.join(__dirname, '../public')  //taken from console.log command above

app.use(express.static(publicPath))

//pretend I own app.com
//It also has other pages like perhaps app.com/help or app.com/about
//to access these resources use app.get

// app.get('',(req,res) =>{  //TAKES 2 ARGUMENTS: REQUEST AND RESPONSE
// //    res.send('Hello Express!')  //lets us send a string back to the requester
//     res.send('<h1>Weather</h1>')  //lets us specify HTML to send back
// })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Create Pages

//Manually create a help page
// app.get('/help',(req,res) =>{
//     res.send([{      //Can send JSON as an object with properties and express will parse it automatically
//         name: 'Britt',
//         age: 46
//     }, {            //Or can send an array with a comma and next set of curly braces and encapsulating all pairs of curly braces in []
//         name: 'Miranda',
//         age:30
//     }])
// })

// Manually create an about page
// app.get('/about',(req,res) =>{
//     res.send('<h1>About Page</h1>')
// })

//create a weather page
app.get('/weather',(req,res) =>{
    res.send({
        forecast:"cloudy",
        location:"Seattle"
    })
})

//start the server
app.listen(3000,() =>{  //listens on a port. We chose the common dev port but it is not the default port
    console.log('Server is up on port 3000') //only viewable on terminal and not to web visitors
}) 