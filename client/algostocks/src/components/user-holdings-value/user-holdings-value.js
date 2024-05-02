import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResultsTable from '../results-table/results-table';

const UserHoldingsValue = () => {
  const [accessToken, setAccessToken] = useState('');
  const [holdingsValue, setHoldingsValue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch access token from localStorage or from the API
    const accessTokenFromStorage = localStorage.getItem('accessToken');
    setAccessToken(accessTokenFromStorage);
  }, []);

  useEffect(() => {
   
      fetchUserHoldingsValue();
  }, [accessToken]);
  const fetchUserHoldingsValue = async () => {
    try {
      const response = await axios.get('http://localhost:3032/user-holdings-value', {
        params: { accessToken }
      });
      console.log('user holdings value :',response.data);
      const userData = JSON.parse(response.data);
      console.log('user holdings value Parse :', userData);
      setHoldingsValue(userData.data);
    } catch (error) {
      console.error('Error fetching user holdings value:', error);
      setError('Error fetching user holdings value');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserHoldingsValue();
  };

  return (
    <div>
      <h2>Fetch User Holdings Value</h2>
      {/* <form onSubmit={handleSubmit}>
        <input type="text" value={accessToken} onChange={(e) => setAccessToken(e.target.value)} placeholder="Enter Access Token" />
        <button type="submit">Fetch Holdings Value</button>
      </form> */}
      {error && <p>{error}</p>}
      {holdingsValue && (
        <div>
          <h3>User Holdings Value</h3>
          {/* <pre>{JSON.stringify(holdingsValue, null, 2)}</pre> */}
          <ResultsTable data={holdingsValue.results}></ResultsTable>
        </div>
      )}
    </div>
  );
};

export default UserHoldingsValue;
