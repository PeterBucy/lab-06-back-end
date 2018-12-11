'use strict';

//Application Dependencies
const express = require('express');
const cors = require('cors');

//Load env vars;
require('dotenv').config();
const PORT = process.env.PORT || 3000; //takes from a .env file and then the terminal env

//app
const app = express();
app.use(cors());

// Get Location data
app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data); // 'Lynnwood, WA'
  console.log(locationData);
  response.send(locationData);
// response.send({
//   "search_query": "seattle",
//   "formatted_query": "Seattle, WA, USA",
//   "latitude": "47.606210",
//   "longitude": "-122.332071"
// })
})

app.get('/weather', (request, response) => {
 response.send([
  {
    "forecast": "Partly cloudy until afternoon.",
    "time": "Mon Jan 01 2001"
  },
  {
    "forecast": "Mostly cloudy in the morning.",
    "time": "Tue Jan 02 2001"
  },
  
])
})

function searchToLatLong(query){
  const geoData = require('./data/geo.json');
  //if statement
  if (query === geoData.results[0].address_components[0].long_name) {
    const location = new Location(geoData.results[0]);
    return location;
  } else {
    app.get('/*', function (req, res) {
      res.status(500).send('Sorry! Something went horribly wrong!');
    })
  }
}

function Location(location){
  this.formatted_query = location.formatted_address;
  this.latitude = location.geometry.location.lat;
  this.longitude = location.geometry.location.lng;  
}

// function Weather(weather) {
//   this.forcast = weather.dark
// }

// Give error messages if incorrect

app.get('/*', function(req, res) {
  res.status(404).send('Success!');
})

// app.get('/*', function (req, res) {
//   res.status(500).send('Sorry! Something went horribly wrong!');
// })

app.listen(PORT, () => {
  console.log(`app is up on port : ${PORT}`)
})