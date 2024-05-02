import React, { useState,useEffect } from 'react';
import axios from 'axios';

const LiveMarketData = ({ securityId, exchange }) => {
  const [accessToken, setAccessToken] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch access token from localStorage or from the API
    const accessTokenFromStorage = localStorage.getItem('accessToken');
    setAccessToken(accessTokenFromStorage);
  }, []);

  useEffect(() => {
   
    handleFetchData();
  }, [accessToken]);

  const handleFetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3032/live-market-data', {
        params: {
          accessToken: accessToken,
          securityId: securityId,
          exchange: exchange
        }
      });
      console.log('user market:',response.data);
      const userData = JSON.parse(response.data);
      console.log('user market Parse :', userData);
      setData(userData.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching live market data:', error);
      setError('Error fetching live market data');
    }
  };

  return (
    <div>
      {/* <div>
        <label>Access Token:</label>
        <input type="text" value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
      </div>
      <button onClick={handleFetchData}>Fetch Live Data</button> */}
      {error && <div>{error}</div>}
      {data && (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default LiveMarketData;
