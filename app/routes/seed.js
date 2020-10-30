var express = require('express');
var authenticator = require('otplib').authenticator;
var router = express.Router();

// Return a seed
router.get('/', function(req, res, next) {
  let generatedSeed = {
    seed: authenticator.generateSecret()
  }
  res.json(generatedSeed);
});

module.exports = router;