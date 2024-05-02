var PMClient = require('../pmClient').PMClient
var config= require('dotenv').config();
// Replace 'your_api_key' and 'your_api_secret' with your actual PaytmMoney API credentials
const pm = new PMClient(api_key=process.env.PAYTM_MONEY_API_KEY,api_secret=process.env.PAYTM_MONEY_API_SECRET);

// Function to log in and get the access token
async function loginAndGetAccessToken() {
  try {
    // Get the login URL where the user will authenticate
    const loginURL = pm.get_login_URL('unique_state_key');
    console.log('Login URL:', loginURL);
    // // Direct the user to loginURL and after successful login, they will receive a request token

    // // Replace 'your_request_token' with the actual request token received after user login
    // const session = await pm.generate_session('your_request_token');
    // console.log('Session:', session);

    // // The session object contains the access token
    // const accessToken = session.access_token;
    // console.log('Access Token:', accessToken);

    // return accessToken;
  } catch (error) {
    console.error('Error during login and getting access token:', error);
  }
}

// Call the function to start the login process and get the access token
loginAndGetAccessToken();
