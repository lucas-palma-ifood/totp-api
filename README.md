# TOTP Validator
Simple validator to check a TOTP implementation.

## How to run
```
cd app
npm install
npm start
```
It'll open on port 3000 (aka `localhost:3000` as endpoint).

## Supported requests
### Get actual time
#### ```GET /time```
Returns what time is it now on the server, on `YYYY-MM-DD HH:MM:SS` format.

### Get a random seed
#### ```GET /seed```
Returns a random generated valid seed, for later usage with the TOTP algorithm, on a 16 characters string in BASE32 format.

### Get a random seed, encrypted by a RSA Public Key
#### ```POST /seed```
Returns a random generated valid seed, for later usage with the TOTP algorithm, encrypted by a RSA Public Key sent as parameter, on Base64 encoding.

Post body:
```
{
    
    "pubkey": string (RSA Public Key, with inline headers and \n included)
}
```
Example usage:
```
{
    {"pubkey":"-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsU7wooQC+NGMRLZnhKyw\nYNktdU72MG7focuLYuHDjqRWfdwTfqQ5ysT3Dv0XhnrPOOH80X38WbN6AwK9WhXz\nhi+UMPRF3AB+DyujRagvwUarfxg2bnFroUN4lYY9AlmSxY578xoyv1HbmNwwoUXf\nkc2Wzdbgj6ZOX3oomtWU74VeujyL5I49GRV45ddXoKIjAsF/aVmLxpMiz1MHv7Dm\nFlF1Ou2yUzL4tIjzdJnr14tlO5H5tlPSLQyWp199GcQi+Zsu3N2iYjiJ00QwTy3e\nT/f9sbTJGK1xlQT9nYZquN3XH5NVOChdZer/jkVKLy+YMQMuBSIVAHmczTuz7lRe\nMwIDAQAB\n-----END PUBLIC KEY-----"}
}
```

### Get actual token from a seed
#### ```GET /token/$seed_value```
Given a seed and the server's time, returns the actual token (JS `Date.now()` is considered for time).

### Check if a token is valid
#### ```POST /token```
Post body:
```
{
    "offset": integer (how many tokens to check after and before),
    "token": string (with a 6 digit number),
    "seed": string (16 characters containing the seed, in base32)
}
```
Example usage:
```
{
    "offset":20,
    "token":"243697",
    "seed":"BRZSEZSCCVQS6KIP"
}
```
It'll use the **BRZSEZSCCVQS6KIP** with actual time and check if **243697** is the actual token, or one of the **20** tokens _before_ it, or one of the **20** tokens _after_ it.

> **offset** is a optional parameter. If it isn't set, 0 is used by default.

## Credits
TOTP Validator was made thanks to:
- ExpressJS (https://expressjs.com/)
- NodeJS otplib (https://otplib.yeojz.dev/) 