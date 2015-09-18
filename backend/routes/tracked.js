var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('stocks.json', function(error, dataBuffer){
    var data = JSON.parse(dataBuffer);
    res.send(data);
  });
});

router.post('/', function (req, res, next) {
  fs.readFile('stocks.json', function(error, dataBuffer){
    var data = JSON.parse(dataBuffer);
    console.log('body', req.body);
    // data.tracked.push(req.body);
    data[req.body.name] = req.body;
    console.log(data);
    fs.writeFile('stocks.json', JSON.stringify(data), function(error, dataBuffer){
      // data.req.body
      res.send(data.tracked);
    });
  });
});

module.exports = router;
