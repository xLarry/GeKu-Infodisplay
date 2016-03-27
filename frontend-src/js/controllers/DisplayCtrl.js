angular.module("GekuInfodisplay")

  .controller("DisplayCtrl", function (CalendarService, MessageService, SaunaService, WeatherService, $interval, $location) {

    var display = this;

    var skycons = new Skycons();

    display.events = [];
    display.sauna = {};
    display.weather = {};

    /* Events */

    display.getEvents = function getEvents () {
      CalendarService.get(function (events) {
        display.events = events;
      })
    }

    display.getEvents();

    /* Sauna */

    display.getSauna = function getSauna () {
      SaunaService.get(function (sauna) {
        display.sauna = sauna;
      })
    };

    display.getSauna();

    /* Weather */

    display.getWeather = function getWeather () {
      WeatherService.get(function (weather) {
        display.weather = weather;
        skycons.add("weatherCurrent", display.weather.currently.icon);
        skycons.add("weatherDay1", display.weather.daily.data[1].icon);
        skycons.add("weatherDay2", display.weather.daily.data[2].icon);
        skycons.add("weatherDay3", display.weather.daily.data[3].icon);
        skycons.play();
      });
    };

    display.getWeather();

    display.getTemp = function getTemp (offset) {
      if (!display.weather.daily) return false;
      return (display.weather.daily.data[offset].temperatureMin + display.weather.daily.data[offset].temperatureMax) / 2;
    }

    display.getWeekday = function getWeekday (offset) {
      return moment().add(offset, 'days').format('dddd');
    }

    // Alle 10 Sekunden
    $interval(function () {
      display.getSauna();
    }, 10 * 1000);

    // Alle 60 Minuten
    $interval(function () {
      display.getEvents();
      display.getWeather();
    }, 60 * 60 * 1000);

  });