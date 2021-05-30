const request = require("postman-request");

const geocode = (address, callback) => {
  address = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXl1c2g5N2dvZWwiLCJhIjoiY2twNjlpbDljMmc4bjJ2cXd0YjJ6ZWplMyJ9.e5772GcNetGIP2YiS1002g&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location service, Please check your internet connection or your site address", undefined);
    } else if (response.body.features.length === 0) {
      callback('Please check the location or try another location', undefined);
    } else {
      const { center, place_name: location } = response.body.features[0];
      const [longitude, latitude] = center;
      callback(undefined, {
        latitude,
        longitude,
        location
      })
    }

  })



}

module.exports = geocode;
