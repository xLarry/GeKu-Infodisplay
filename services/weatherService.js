// Require the module 
var Forecast = require('forecast.io');

module.exports = function(key) {

  var forecast = new Forecast({APIKey: key});

  var options = {
      units: 'si'
      , lang: 'de'
      , exclude: 'minutely,hourly'
  }

  function getDetails() {
    return new Promise(function(resolve, reject) {
      forecast.get(51.459265, 7.013491, options, function(err, res, weather) {
          if(err) reject(err);
          resolve(weather);
        });
    });
  }

  var weatherService = {
    forecast: forecast
    , getDetails: getDetails
  };

  return weatherService;
}