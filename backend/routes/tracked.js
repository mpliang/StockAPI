var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('stocks.json', function(error, dataBuffer){
    var data = JSON.parse(dataBuffer);
    res.send(data.tracked);
  });
});

router.post('/', function (req, res, next) {
  fs.readFile('stocks.json', function(error, dataBuffer){
    var data = JSON.parse(dataBuffer);
    data.tracked.push(req.body.newSymbol);
    console.log(data);
    fs.writeFile('stocks.json', JSON.stringify(data), function(error, dataBuffer){
      // data.req.body
      res.send(data.tracked);
    });
  });
});

module.exports = router;
