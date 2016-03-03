var request         = require('request');
var cheerio         = require('cheerio');

var Sauna = {
    getTemp: function() {
        return new Promise(function(resolve, reject) {
            request('http://10.0.11.141/', function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);

                    var temp = $('.deneme')
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
}

module.exports = Sauna