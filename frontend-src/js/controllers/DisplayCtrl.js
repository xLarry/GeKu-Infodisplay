angular.module("GekuInfodisplay")

    .controller("DisplayCtrl", function(MessageService, WeatherService, $interval) {

        var display = this;

        var skycons = new Skycons();

        display.message = "My awesome message";

        display.weather = {};

        /* Messages */

        display.createMessage = function createMessage() {
            MessageService
                .create({content: display.message}, function(res) {
                    display.messages.push(res);
                });
        };

        display.deleteMessage = function deleteMessage(message) {
            MessageService
                .delete({id: message.id}, function() {
                    display.messages.splice(display.messages.indexOf(message), 1);
                });
        };

        display.getMessages = function getMessages() {
             MessageService.get(function(messages) {
                 display.messages = messages;
            });
        };

        display.getMessages();

        display.getWeather = function getWeather() {
            WeatherService.get(function(weather) {
                display.weather = weather;
                skycons.add("weatherCurrent", display.weather.currently.icon);
                skycons.add("weatherDay1", display.weather.daily.data[1].icon);
                skycons.add("weatherDay2", display.weather.daily.data[2].icon);
                skycons.add("weatherDay3", display.weather.daily.data[3].icon);
                skycons.play();
            });
        };

        display.getWeather();

        display.getWeekday = function getWeekday(offset) {
            return moment().add(offset, 'days').format('dd');
        }

        $interval(function() {
            display.getMessages();
        }, 10 * 1000);

    });