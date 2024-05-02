
const express = require('express');

const app = express();
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
var config= require('dotenv').config();
const port = process.env.PORT; // You can choose any port you prefer
// Assuming pm is a module that provides the generate_session method
//const pm = require('./pm'); // Replace './pm' with the actual path to your module
const PMClient = require('./pmClient').PMClient;
// Replace 'your_api_key' and 'your_api_secret' with your actual PaytmMoney API credentials
const pm = new PMClient(api_key = process.env.PAYTM_MONEY_API_KEY, api_secret = process.env.PAYTM_MONEY_API_SECRET);

//console.log('pm : ', pm);
// Middleware to parse JSON bodies
//app.use(bodyParser.json()); // Middleware to parse JSON request bodies
app.use(express.json());


app.use(cors({
  origin: process.env.FRONTEND_URL // or '*' for a wildcard
}));

// POST route to generate an access token
app.post('/generate-token', async (req, res) => {
  try {
    // Extract the request token from the request body
    const requestToken = req.body.requestToken;

    console.log('requestToken:', requestToken, req.body);

    // Generate the session and access token using the provided request token
    const session = await pm.generate_session(requestToken);
    console.log('Session:', session);

    const accessToken = session.access_token;
    console.log('Access Token:', accessToken);

    // Send the access token back to the client
    res.json({ accessToken });
  } catch (error) {
    console.error('Error generating access token:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Endpoint to get the login URL
app.get('/login-url', async (req, res) => {
  try {
    // Generate a unique state key for the session
    const uniqueStateKey = Math.random().toString(36).substring(7); // Replace with a method to generate a unique key
    const loginURL = pm.get_login_URL(uniqueStateKey);
    console.log('Login URL:', loginURL);

    // Direct the user to the login URL
    res.json({ loginURL });
    //res.redirect(loginURL);
  } catch (error) {
    console.error('Error getting login URL:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get user details
app.get('/user-details', async (req, res) => {

  const accessToken = req.query.accessToken; // Assuming the access token is passed as a query parameter
  console.log('accessToken:', accessToken, req.body);
  try {
    pm.set_access_token(accessToken);

    await pm.get_user_details()
      .then(function (response) {
        console.log(response);
        res.json(response);
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send('Error retrieving user details');
      });
  } catch (error) {
    console.error('Error retrieving user details:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/user-orders', async (req, res) => {
  const accessToken = req.query.accessToken; // Assuming the access token is passed as a query parameter
  console.log('accessToken:', accessToken, req.body);
  try {
    pm.set_access_token(accessToken);

    await pm.orders()
      .then(function (response) {
        console.log(response);
        res.json(response);
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send('Error retrieving user details');
      });
  } catch (error) {
    console.error('Error retrieving user details:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/user-position', async (req, res) => {
  const accessToken = req.query.accessToken; // Assuming the access token is passed as a query parameter
  console.log('accessToken:', accessToken, req.body);
  try {
    pm.set_access_token(accessToken);

    await pm.position()
      .then(function (response) {
        console.log(response);
        res.json(response);
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send('Error retrieving user position');
      });
  } catch (error) {
    console.error('Error retrieving user details:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/user-holdings', async (req, res) => {
  const accessToken = req.query.accessToken; // Assuming the access token is passed as a query parameter
  console.log('accessToken:', accessToken, req.body);
  try {
    pm.set_access_token(accessToken);

    await pm.user_holdings_data()
      .then(function (response) {
        console.log(response);
        res.json(response);
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send('Error retrieving user holdings');
      });
  } catch (error) {
    console.error('Error retrieving user holdings', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/user-holdings-value', async (req, res) => {
  const accessToken = req.query.accessToken; // Assuming the access token is passed as a query parameter
  console.log('accessToken:', accessToken, req.body);
  try {
    pm.set_access_token(accessToken);

    await pm.holdings_value()
      .then(function (response) {
        console.log(response);
        res.json(response);
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send('Error retrieving user holdings_value');
      });
  } catch (error) {
    console.error('EError retrieving user holdings_value:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/live-market-data', async (req, res) => {
  const accessToken = req.query.accessToken; // Assuming the access token is passed as a query parameter
  const securityId = req.query.securityId;
  const exchange = req.query.exchange;
  const pref = `${exchange}:${securityId}:EQUITY`;
  console.log('accessToken:', accessToken, req.body);
  try{
  pm.set_access_token(accessToken);

  let mode = 'FULL';
  let preferences =[pref];
  await pm.get_live_market_data(mode, preferences)
    .then(function (response) {
      console.log(response);
      res.json(response);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send('Error retrieving get_live_market_data');
    });
  } catch (error) {
    console.error('retrieving get_live_market_data:', error);
    res.status(500).send('Internal Server Error');
  }
});




app.get('/live-price', async (req, res) => {
  try {
    const accessToken = req.query.accessToken; // Assuming the access token is passed as a query parameter


    let mode = encodeURIComponent('LTP');
    let pref = encodeURIComponent(JSON.stringify([
      {
        "actionType": "ADD",
        "modeType": "LTP",
        "scripType": "EQUITY",
        "exchangeType": "NSE",
        "scripId": "3456"
      }

    ]));
    const response = await axios.get(`https://developer.paytmmoney.com/data/v1/price/live?mode=${mode}&pref=${pref}`, {
      headers: {
        'x-jwt-token': accessToken
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching live price:', error);
    res.status(500).send('Internal Server Error');
  }
});





// Route to place an order
app.post('/place-order', async (req, res) => {
  const {
    txn_type, source, exchange, segment, product,
    security_id, quantity, validity, order_type, price, off_mkt_flag
  } = req.body;

  try {
    // Place the order
    const response = await pm.place_order(
      txn_type, source, exchange, segment, product,
      security_id, quantity, validity, order_type, price, off_mkt_flag
    );

    res.json({ message: 'Order placed successfully', response });
  } catch (err) {
    console.log('error', err);
    res.status(500).send('Error placing order');
  }
});



// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
