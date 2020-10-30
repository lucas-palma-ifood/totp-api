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