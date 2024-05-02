import React, { useState,useEffect } from 'react';
import axios from 'axios';
import StockTable from '../stock-table/stock-table';
import LiveMarketData from '../live-market-data/live-market-data';

const UserHoldings = () => {
  const [accessToken, setAccessToken] = useState('');
  const [holdings, setHoldings] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch access token from localStorage or from the API
    const accessTokenFromStorage = localStorage.getItem('accessToken');
    setAccessToken(accessTokenFromStorage);
  }, []);

  useEffect(() => {
   
      fetchUserHoldings();
  }, [accessToken]);

  const fetchUserHoldings = async () => {
    try {
      const response = await axios.get('http://localhost:3032/user-holdings', {
        params: { accessToken }
      });
      console.log('user holdings:',response.data);
      const userData = JSON.parse(response.data);
      console.log('user holdings Parse :', userData);
      setHoldings(userData.data);
    } catch (error) {
      console.error('Error fetching user holdings:', error);
      setError('Error fetching user holdings');
    }
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserHoldings();
  };

  return (
    <div>
      <h2>Fetch User Holdings</h2>
      {/* <form onSubmit={handleSubmit}>
        <input type="text" value={accessToken} onChange={(e) => setAccessToken(e.target.value)} placeholder="Enter Access Token" />
        <button type="submit">Fetch Holdings</button>
      </form> */}
      {error && <p>{error}</p>}
      {holdings?.results && (
        <div>
          <h3>User Holdings</h3>
          {/* <pre>{JSON.stringify(holdings, null, 2)}</pre> */}
          <StockTable data={holdings.results}></StockTable>
        </div>
      )}

{holdings?.results?.map((item, index) => (
 
        <LiveMarketData
          key={index} // Key should be unique, you can use index here but consider using a more stable identifier if available
          securityId={item.nse_security_id}
          exchange="NSE" 
        />
      ))}
    </div>
  );
};

export default UserHoldings;
