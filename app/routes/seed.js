var express = require('express');
var authenticator = require('otplib').authenticator;
var router = express.Router();

// Return a seed
router.get('/', function(req, res, next) {
  res.send(authenticator.generateSecret());
});

module.exports = router;