export default async function getCurrentWeather(locationCoords){

    const axios = require('axios')

    const lat = locationCoords.latitude
    
    const log = locationCoords.longitude

    var results = []
    console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=c09caca83bd0a4a6fa8379348c5ea8a2`)

    await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=c09caca83bd0a4a6fa8379348c5ea8a2`)
        .then(function (response){

            const data = response.data     
            console.log(data)
            const locationName = (data.sys.country + ', ' + ' ' + data.name)
            const temperatureMin = data.main.temp_min
            const temperatureMax = data.main.temp_max
            const wind = data.wind.speed
            const humidity = data.main.humidity
            const currentTemperature = data.main.temp
            
            results = [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity]
            // [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity]
            
        })
        .catch(function (error) {
            console.log(error)
        })

    return results
  }