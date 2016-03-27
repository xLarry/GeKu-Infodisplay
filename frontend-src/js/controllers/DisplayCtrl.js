angular.module("GekuInfodisplay")

  .controller("DisplayCtrl", function (CalendarService, MessageService, SaunaService, WeatherService, $interval, $location) {

    var display = this;

    var skycons = new Skycons();

    display.events = [];
    display.sauna = {};
    display.weather = {};

    /* Events */

    CalendarService.events.subscribe((events) => this.events = events);

    /* Sauna */

    SaunaService.events.subscribe((sauna) => this.sauna = sauna);

    /* Weather */

    function onWeatherUpdate (weather) {
      display.weather = weather;
      skycons.add("weatherCurrent", display.weather.currently.icon);
      skycons.add("weatherDay1", display.weather.daily.data[1].icon);
      skycons.add("weatherDay2", display.weather.daily.data[2].icon);
      skycons.add("weatherDay3", display.weather.daily.data[3].icon);
      skycons.play();
    }

    // Add RealTime Support
    WeatherService.events.subscribe(onWeatherUpdate);

    display.getTemp = function getTemp (offset) {
      if (!display.weather.daily) return false;
      return (display.weather.daily.data[offset].temperatureMin + display.weather.daily.data[offset].temperatureMax) / 2;
    }

    display.getWeekday = function getWeekday (offset) {
      return moment().add(offset, 'days').format('dddd');
    }
  });