var request         = require('request');
var cheerio         = require('cheerio');

module.exports = function(wia) {
    var saunaService = {
        getTemp: function() {
            return new Promise(function(resolve, reject) {
                request('http://10.0.11.141/', function (error, response, html) {
                    if (!error && response.statusCode == 200) {
                        var $ = cheerio.load(html);

                        var temp = $('.deneme')  // Temperature is contained in .deneme element
                            .text()              // Extract just the text from the html
                            .match(/\d/g);       // Extract digits from string

                        temp.splice(2, 0, ".");  // Insert decimal point

                        resolve(temp.join(""));
                    } else {
                        reject(error);
                    }
                });
            });
        }

        , sendTemp: function(socket) {
            saunaService.getTemp().then(function(temp) {
                wia.events.publish(
                    { name: "temperature",
                      data: temp },
                    function(err, published) {
                        if (err) console.log(err);
                        if (published) console.log("Event published.");
                    }
                );
            });
        }
    }

    return saunaService;
}