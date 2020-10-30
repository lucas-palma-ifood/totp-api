var express = require('express');
var totp = require('otplib').totp;
var router = express.Router();

router.get('/:seed', function(req, res, next) {
  res.send(totp.generate(req.params.seed));
});

router.post('/', function(req, res, next) {
  var offset = req.body.offset;
  var token = req.body.token;
  var seed = req.body.seed;

  if (Number.isInteger(offset) && offset >= 0) {
    totp.options = { window: offset };
  } else {
    res.status(400);
    res.send('Offset value (' + offset + ') is invalid');
  }

  res.send(totp.check(token, seed));
});

module.exports = router;