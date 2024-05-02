var config= require('dotenv').config();
var PMClient = require('../pmClient').PMClient

var connect = new PMClient(api_key=process.env.PAYTM_MONEY_API_KEY,api_secret=process.env.PAYTM_MONEY_API_SECRET)

connect.generate_session("5f7d3c8216d741a99abc57362bbac339")
.then(function(response){
    console.log('response',response)
})
.catch(function(err){
    console.log('error',err);
});

// connect.set_access_token("your_access_token")
// connect.set_public_access_token("your_public_access_token")
// connect.set_read_access_token("your_read_access_token")

connect.get_user_details()
    .then(function(response){
        console.log(response)
    })
    .catch(function(err){
        console.log(err);
    })