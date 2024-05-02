import React, { useState, useEffect } from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';

import axios from 'axios';
const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const success = queryParams.get('success');
        const requestToken = queryParams.get('requestToken');
        const state = queryParams.get('state');
        // Handle login callback based on parameters
        console.log('Success:', success);
        console.log('Request Token:', requestToken);
        console.log('State:', state);
        if (requestToken) {
          const response = await axios.post('http://localhost:3032/generate-token', { requestToken });
          console.log('response:', response);
          localStorage.setItem('accessToken', response.data.accessToken);
          setAccessToken(response.data.accessToken);
        }
      } catch (error) {
        console.error('Error generating access token:', error);
        // Handle error, display error message, etc.
      }
    };

    fetchAccessToken();
  }, [location]);

  useEffect(() => {
    //navigate('/dashboard');
    console.log(accessToken);
}, [accessToken]);


  return (
    <div>
      <h1>Callback Page</h1>
      {accessToken ? (
        <p>Access Token: {accessToken}</p>
      ) : (
        <p>Generating access token...</p>
      )}
    </div>
  );
};

export default Callback;
