var express = require('express');
var totp = require('otplib').totp;
var router = express.Router();

// Get the actual token from a given seed
router.get('/:seed', function(req, res, next) {
  res.json(totp.generate(req.params.seed));
});

// Validate a token from a given seed, within a defined offset
router.post('/', function(req, res, next) {
  var offset = req.body.offset;
  var token = req.body.token;
  var seed = req.body.seed;

  if (Number.isInteger(offset) && offset >= 0) {
    totp.options = { window: offset };
  } else {
    res.status(400);
    res.json('Offset value (' + offset + ') is invalid');
  }

  res.json(totp.check(token, seed));
});

module.exports = router;