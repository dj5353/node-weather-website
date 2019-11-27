const request = require('request')

const fore = (long,lat,callback) =>{
    var url =  'https://api.darksky.net/forecast/e49d7069ba477a383de692fee5d05f4b/'+lat+','+long+'?units=si'
    var obj = {
        url : url,
        json : true
    }
    request(obj,(error,res,body) => {
        if(error){
            return callback('The forecasting service is currently unavailable',undefined)
        }
        else if(body.error){
            return callback("No Location Found with this name",undefined)
        }
        else{
            return callback(undefined,
                `The place is in  ${ body.timezone } currently having temperature ${ Math.round(body.currently.apparentTemperature) } having windspeed ${ body.currently.windSpeed} the day will be ${ body.currently.summary }`
            )
        }
    })
}

// fore(-122.4233,37.8267,(err,data) => {
//     console.log("Error",err),
//     console.log("DATA",data)
// })

module.exports = fore