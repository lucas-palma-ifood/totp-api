var express = require('express');
var totp = require('otplib').totp;
var router = express.Router();

router.get('/:seed', function(req, res, next) {
  res.send(totp.generate(req.params.seed));
});

module.exports = router;