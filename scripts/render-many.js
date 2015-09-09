var express = require('express');
var RSVP = require('rsvp');

function serveAppFiles() {
  var app = express();
  app.use(express.static('selenium-dist'));

  var deferred = RSVP.defer();
  var listener = app.listen(0, function() {
    deferred.resolve(listener);
  });

  return deferred.promise;
}

function runManyTest(driver, url) {
  driver.get(url);

  driver.findElement({ css: '.run-many' }).click();

  return driver.wait(function() {
    return driver.findElement({ css: '.result' });
  })
    .then(function(element) {
      return element
        .getText()
        .then(function(result) {
          return result;
        });
    });
}

module.exports = function(options) {
  var webdriver = options.webdriver;
  var chrome = options.chrome;
  var By = webdriver.By;
  var until = webdriver.until;

  return serveAppFiles()
    .then(function(server) {
      var chromeOptions = new chrome.Options();
      chromeOptions.addArguments(['--incognito']);

      var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(
              new chrome.Options()
                .addArguments('--incognito')
            )
            .build();

      var url = 'http://[' + server.address().address + ']:' + server.address().port;

      var results = [];

      for (var i = 0; i < 10; i++ ) {
        results.push(runManyTest(driver, url));
      }

      return RSVP.all(results)
        .then(function(results) {
          console.log(results.join('\n'));
        })
        .finally(function() {
          return driver.quit();
        })
        .then(function() {
          server.close();
        });
    });
};
