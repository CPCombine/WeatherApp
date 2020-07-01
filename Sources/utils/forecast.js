const request = require('request')

const forecast =(latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=59d1dd879ff6ffdd11b15fa69e2ce407&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true},(error, {body})=>{
        if(error){
                 callback("Unable to connect to Weather Service!")
                }else if(body.error){
                    callback('Unable to find location')
                }
                else{
                 callback(undefined,"Current conditions are: " + body.current.weather_descriptions[0] + 
                 '. It is currently ' + body.current.temperature + 'F and feels like ' + body.current.feelslike+ 'F. '+ 
                 'The humidity is: '+ body.current.humidity + "%"
                 )
            }
    })
}

module.exports = forecast