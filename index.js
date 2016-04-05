var express         = require('express');
var bodyParser      = require('body-parser');
var keys            = require('./keys.js')
var wia             = require('wia')(keys.wia);
var ical            = require('ical');

wia.stream.connect();

var models          = require('./models/index.js');
var saunaService    = require('./services/saunaService.js')(wia);
var weatherService  = require('./services/weatherService.js')(keys.forecast);

var app             = express();
var router          = express.Router();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/frontend', {extensions: ['html']}));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Routes */

// middleware to use for all requests
router.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT,GET,DELETE,POST");
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/calendar')

    .get(function(req, res) {
        var upcomingEvents = [];

        ical.fromURL('https://p03-calendars.icloud.com/published/2/wjgPToDQlpfvLsUONU28b6anOZOcC7-T_aG6ZsFykR1S5to4CSv7D1nWT4Aza07TRGRJ_X_D7eenquayKbgphdGxxNMPXUdjMXYPh81gjFk', {}, function(err, data) {
          for (var k in data){
            if (data.hasOwnProperty(k)) {
                // Prüfen ob das Event schon vorbei ist
                if (data[k].end >= Date.now()) {
                    upcomingEvents.push(data[k])
                }
            }
          }

          res.json(upcomingEvents);
        });
    });

router.route('/messages')

    // CREATE
    .put(function(req, res) {
        //console.log(req);
        models.message.create({
            content: req.body.content
        }).then(function(message) {
            res.json(message);
        });
    })

    // READ
    .get(function(req, res) {
        models.message.findAll().then(function(messages) {
            res.json(messages);
        });
    })

    // UPDATE
    // n/a

    // DELETE
    .delete(function(req, res) {
        console.log(req.query);
        if (req.query.id) {
            // Delete one message
            models.message.findById(req.query.id).then(function(message) {
                if (!message) {
                    res.json({status: 'error', message: "Message with ID " + req.query.id + " not found!"});
                } else {
                    message.destroy();
                    res.json({status: 'success'});
                }
            });
        } else {
            // Delete all messages
            models.message.destroy({
                truncate: true
            });
            res.send("All messages have been deleted");
        }
    });

router.route('/sauna')
    .get(function(req, res) {
        saunaService.getTemp().then(function(temp) {
            res.json({temp: temp});
        });
    })

router.route('/weather')
    .get(function(req, res) {
        weatherService.getDetails().then(function(weather) {
            res.json(weather);
        });
    })

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

var port = process.env.PORT || 3000;

server.listen(port, () => console.log('Example app listening on port ' + port + '!') );



// Add Socket Functions
io.on('connection', function (socket) {

  function emitSauna() {
    saunaService.getTemp()
      .then( (temp) => socket.emit('sauna', temp) );
  }

  function emitWeather() {
    weatherService.getDetails()
      .then( (weather) => socket.emit('weather', weather) );
  }

  function emitCalendar(){
    // TODO: Duplicate Code
    // TODO: Extract to service
    // TODO: Use Promise
    ical.fromURL('https://p03-calendars.icloud.com/published/2/wjgPToDQlpfvLsUONU28b6anOZOcC7-T_aG6ZsFykR1S5to4CSv7D1nWT4Aza07TRGRJ_X_D7eenquayKbgphdGxxNMPXUdjMXYPh81gjFk', {}, function(err, data) {

      var upcomingEvents = [];

      for (var k in data){
        if (data.hasOwnProperty(k)) {
          // Prüfen ob das Event schon vorbei ist
          if (data[k].end >= Date.now()) {
            upcomingEvents.push(data[k])
          }
        }
      }

      socket.emit('calendar', upcomingEvents);
    });
  }

  function emitMessages() {
    models.message.findAll({logging: false})
      .then( (messages) => socket.emit('messages', messages) );
  }

  // Send temperature to Wia every 60 seconds
  setInterval(saunaService.sendTemp, 60 * 1000);

  // Send sauna to frontend every 30 seconds
  setInterval(emitSauna, 30 * 1000);
  emitSauna();

  // Send weather to frontend every 30 minutes
  setInterval(emitWeather, 30 * 60 * 1000);
  emitWeather();

  // Send calendar updates every 60 minutes
  setInterval(emitCalendar, 60 * 60 * 1000);
  emitCalendar();

  // Send message updates every 5 seconds
  setInterval(emitMessages, 5 * 1000);
  emitMessages();

});