import moment from 'moment'
import request from 'request'

class WeatherController {

  constructor(router) {
    router.post('/', this.getWeather.bind(this))
  }

///////////////////////
//Get account by session
///////////////////////
  async getWeather(req, res) {

    let data = req.body.data
    let date = moment(req.body.date)
      .toISOString()

    let url = `http://api.openweathermap.org/pollution/v1/co/${data.coord.lon},${data.coord.lat}/${date}.json?appid=${process.env.WEATHER_API_KEY}`
    console.log(url)

    request(url, function (err, response, body) {
      if (err) {
        console.log(err)
        res.json({ weather: null, error: 'Error, please try again' })
      } else {
        console.log(body)
        let weather = JSON.parse(body)
        console.log('TEST ==> ', weather)
        res.json({ weather: weather, error: null })
      }
    })
  }
}

module.exports = WeatherController