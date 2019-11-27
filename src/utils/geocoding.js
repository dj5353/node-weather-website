const request = require('request')

const geocode = (address,callback) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGl2aXQiLCJhIjoiY2sycjlkZ2dsMG5qdjNtbWIxNDFldTF2MSJ9.fiZK0YVcil1R8nivQ1bJIg'
    const obj = {
        url : url,
        json : true
    }
    request(obj,(error,res,body) => {
        if(error){
            return callback("The location services are currently unavailable",undefined)
        }
        else if(body.features.length===0)
        {
            return callback("Location field cannnot be empty.Please enter a location",undefined)
        }
        else{
            return callback(undefined,{
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1]
            })
        }
    })
}

// geocode("&",(error,data) => {
//     console.log("Error",error),
//     console.log("DATA",data)
// })

module.exports = geocode