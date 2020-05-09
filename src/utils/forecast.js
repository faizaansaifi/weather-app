const request = require('postman-request');

const forcast = ({lat, long}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=254485c9964eb7e89f1f229b47064eec&query='+lat+','+long

    request({url, 'json': true}, (e, res) => {
        const { current, error } = res.body;
        if(e) {
            callback('Unable to fetch data', undefined)
        }
        else if (error) {
            callback('Something is missing', undefined)
        }
        else {
            callback(undefined, current.weather_descriptions[0]+'. Currently it is '+current.temperature+' here and feels like '+current.feelslike)

        }
    })
}

module.exports = {
    forcast,
}