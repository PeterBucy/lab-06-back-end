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
  response.send(locationData);
})

function searchToLatLong(query){
  const geoData = require('./data/geo.json');
  //if statement
  if (query.toLowerCase() === geoData.results[0].address_components[0].long_name.toLowerCase()) {
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

// Give error messages if incorrect
// you should have this in the finished app but you dont need it yet

app.get('/*', function(req, res) {
  res.status(404).send('Success!');
})

// app.get('/*', function (req, res) {
//   res.status(500).send('Sorry! Something went horribly wrong!');
// })

app.listen(PORT, () => {
  console.log(`app is up on port : ${PORT}`)
})
