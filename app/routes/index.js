var express = require('express');
var router = express.Router();

// index homepage
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TOTP Validator' });
});

module.exports = router;
