const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// express package exposes only a single function
const app = express();
const port = process.env.PORT || 3000;
// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// const publicDirectoryPath = path.join(__dirname, '../../../Profile');

// setup handlebars and views directory location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setting up public folder to expose to web browser
app.use(express.static(publicDirectoryPath));

// setting routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ayush Goel'

  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Ayush Goel'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    name: 'Ayush Goel',
    title: 'Help Page',
    helptext: 'Enter the location to get the weather. Don\'t worry, location doesn\'t need to be exact'
  });
})


app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide an adress'
    });
  }

  // calling geocode with the addess
  geocode(address, (error, response) => {
    if (error) {
      return res.send({ error });
    }
    const { latitude, longitude, location } = response
    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast,
        location,
        address
      });
    });
  });

});

app.get('/help/*', (req, res) => {
  res.render('404', {
    name: 'server',
    errorString: 'Help article not found',
    title: 'Error 404'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    name: 'server',
    errorString: 'Page not found',
    title: 'Error 404'
  });
});

// starting the server on port 3000
app.listen(port, () => {
  console.log("Server is up on port" + port);
})

