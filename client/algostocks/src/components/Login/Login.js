import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const requestToken = queryParams.get('request_token');
    const state = queryParams.get('state');

    // Check if the request_token and state are present
    if (requestToken && state) {
      // TODO: Use requestToken to generate access_token (explained in the next step)

      // Redirect to home page or dashboard after successful login
      history.push('/');
    } else {
      // Redirect user to Paytm Money login page
      const apiKey = 'b2b0f3264ca54b839156ef244ba717fb';
      const stateKey = Math.random().toString(36).substring(7);

      // Save the state value to local storage for later comparison
      localStorage.setItem('stateKey', stateKey);
      const returnUrl = encodeURIComponent('http://localhost:3000/login'); // Specify your redirect URL here
      window.location.href = `https://login.paytmmoney.com/merchant-login?apiKey=${apiKey}&state=${stateKey}&returnUrl=${returnUrl}`;
    }
  }, [history, location.search]);

  return (
    <div>
      <p>Redirecting to Paytm Money login page...</p>
    </div>
  );
};

export default Login;
