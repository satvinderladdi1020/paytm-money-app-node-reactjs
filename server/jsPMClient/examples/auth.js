// auth.js
var PMClient = require('../pmClient').PMClient
var config= require('dotenv').config();
// Replace 'your_api_key' and 'your_api_secret' with your actual PaytmMoney API credentials
const pm = new PMClient(api_key=process.env.PAYTM_MONEY_API_KEY,api_secret=process.env.PAYTM_MONEY_API_SECRET);

async function generateAccessToken(requestToken) {
    const session = await pm.generate_session(requestToken);
    console.log('Session:', session);
  
    const accessToken = session.access_token;
    console.log('Access Token:', accessToken);
  
    return accessToken;
  }
  
  module.exports = { generateAccessToken };
  