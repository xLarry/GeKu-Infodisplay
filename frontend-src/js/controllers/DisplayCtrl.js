angular.module("GekuInfodisplay")

  .controller("DisplayCtrl", function (CalendarService, MessageService, SaunaService, WeatherService) {

    var skycons = new Skycons();

    var onWeatherUpdate = (weather) => {
      this.weather = weather;
      skycons.add("weatherCurrent", this.weather.currently.icon);
      skycons.add("weatherDay1", this.weather.daily.data[1].icon);
      skycons.add("weatherDay2", this.weather.daily.data[2].icon);
      skycons.add("weatherDay3", this.weather.daily.data[3].icon);
      skycons.play();
    };

    /* Weather */

    WeatherService.events.subscribe(onWeatherUpdate);

    /* Events */

    CalendarService.events.subscribe((events) => this.events = events);

    /* Sauna */

    SaunaService.events.subscribe((sauna) => this.sauna = sauna);


    this.getTemp = (offset) => {
      if (!this.weather || !this.weather.daily) return false;
      return (this.weather.daily.data[offset].temperatureMin + this.weather.daily.data[offset].temperatureMax) / 2;
    }

    this.getWeekday = (offset) => {
      return moment().add(offset, 'days').format('dddd');
    }
  });