import React, { useState,useEffect } from 'react';
import axios from 'axios';
const Login = () => {
  const [stateKey, setStateKey] = useState(''); // Generate a random state key
  const apiKey = '050d838b92b747d99d12d8eb0d73a95a';
     
      useEffect(() => {
        let stateKey = Math.random().toString(36).substring(7);
        setStateKey(stateKey);
      }, []);
      const [loginURL, setLoginURL] = useState('');

      useEffect(() => {
        const fetchLoginURL = async () => {
          try {
            const response = await axios.get('http://localhost:3032/login-url');
            setLoginURL(response.data.loginURL);
          } catch (error) {
            console.error('Error fetching login URL:', error);
            // Handle error, display error message, etc.
          }
        };
    
        fetchLoginURL();
      }, []);

  const handleLogin = async () => {
    try {
      const paytmMoneyLoginUrl = `https://login.paytmmoney.com/merchant-login?apiKey=${apiKey}&state=${stateKey}`;

      window.location.href = paytmMoneyLoginUrl; // Redirect user to Paytm Money login

      // **Security Note:** Do not store API keys or secrets in the frontend code.
      // Retrieve them securely from your backend server using environment variables.
    } catch (error) {
      console.error('Error initiating login:', error);
      // Handle errors appropriately, e.g., display an error message to the user.
    }
  };

  return (
    <div>
      {/* <button onClick={handleLogin}>Login with Paytm Money</button> */}
      <a href={loginURL}>Login with Paytm Money</a>
    </div>
  );
};

export default Login;
