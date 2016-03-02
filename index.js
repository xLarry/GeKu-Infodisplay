var express         = require('express');
var bodyParser      = require('body-parser');

var models          = require('./models/index.js');

var app             = express();
var router          = express.Router();


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Routes */

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/messages')

    // CREATE
    .put(function(req, res) {
        console.log(req);
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
        if (req.body.id) {
            // Delete one message
            models.message.findById(req.body.id).then(function(message) {
                if (!message) {
                    res.send("Message with ID " + req.body.id + " not found!");
                } else {
                    message.destroy();
                    res.send('Message successfully deleted');
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

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});