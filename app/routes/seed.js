var authenticator = require('otplib').authenticator;
const crypto = require("crypto");
var express = require('express');
var router = express.Router();

// Return a seed
router.get('/', function(req, res, next) {
  let generatedSeed = {
    seed: authenticator.generateSecret()
  }
  res.json(generatedSeed);
});

// Return a seed encrypted by given public key
router.post('/', function(req, res, next) {
  var pubkey = crypto.createPublicKey(req.body.pubkey);
  var randomSeed = authenticator.generateSecret();
  var encryptedSeed = crypto.publicEncrypt({key: pubkey, padding: crypto.constants.RSA_PKCS1_PADDING}, Buffer.from(randomSeed));

  let generatedSeed = {
    plaintextSeed: randomSeed,
    encryptedSeed: encryptedSeed.toString("base64"),
  }
  res.json(generatedSeed);
});

module.exports = router;