// some other file in your Node.js application
const auth = require('./auth.js');

// Replace 'your_request_token' with the actual request token received after user login
const accessToken = auth.generateAccessToken('07a954bea74f43c5987cef57d97138bd');
console.log('accessToken :', accessToken);
