var express = require('express');
var router = express.Router();

// Date format
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

var actualDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;



// Return a seed
router.get('/', function(req, res, next) {
  let actualTime = {
    time: actualDate
  }
  res.json(actualTime);
});

module.exports = router;