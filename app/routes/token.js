var express = require('express');
var totp = require('otplib').totp;
var router = express.Router();

// Get the actual token from a given seed
router.get('/:seed', function(req, res, next) {
  let tokenFromSeed = {
    token: totp.generate(req.params.seed)
  }
  res.json(tokenFromSeed);
});

// Validate a token from a given seed, within a defined offset
router.post('/', function(req, res, next) {
  var offset = req.body.offset;
  var token = req.body.token;
  var seed = req.body.seed;

  // Offset default value
  if(offset == undefined) {
    offset = 0
  }

  // Check if given offset is NaN or negative
  if (Number.isInteger(offset) && offset >= 0) {
    totp.options = { window: offset };
  } else {
    res.status(400);

    let erroMessage = { 
      error: 'Offset value (' + offset + ') is invalid'
    }

    res.json(erroMessage);
  }

  let checkToken = {
    isTokenValid: totp.check(token, seed)
  }
  res.json(checkToken);
});

module.exports = router;