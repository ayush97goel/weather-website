const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e5a4b8ac91d4975f18dc260018b69924&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service, Please check your internet connection or your site address", undefined);
    } else if (response.body.error) {
      callback('Please check the location or try another location', undefined);
    } else {
      const { weather_descriptions, temperature, feelslike, precip, humidity } = response.body.current;
      const weatherString = `${weather_descriptions[0]}, it is ${temperature} degrees celsius outside and feels like ${feelslike} degrees.<BR>There is ${precip}% chances of rain with ${humidity}% humidity`;
      callback(undefined, weatherString);
    }
  })
}

module.exports = forecast;