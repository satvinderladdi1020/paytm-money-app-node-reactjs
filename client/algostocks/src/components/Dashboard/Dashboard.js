import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserOrders from '../user-orders/user-orders';
import UserPosition from '../user-position/user-position';
import UserHoldings from '../user-holdings/user-holdings';
import UserHoldingsValue from '../user-holdings-value/user-holdings-value';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Fetch access token from localStorage or from the API
    const accessTokenFromStorage = localStorage.getItem('accessToken');
    setAccessToken(accessTokenFromStorage);

    // Fetch user details if access token is available
    if (accessTokenFromStorage) {
      fetchUserDetails(accessTokenFromStorage);
    }
  }, []);

  const fetchUserDetails = async (accessToken) => {
    try {
      const response = await axios.get(`http://localhost:3032/user-details?accessToken=${accessToken}`);
      
      console.log('user details:',response.data);
      const userData = JSON.parse(response.data);
      console.log('User details Parse :', userData);
      setUserDetails(userData.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Handle error, display error message, etc.
    }
  };
  console.log('user details: 2', userDetails);
  return (
    <div>
      <h1>Dashboard</h1>
      {userDetails ? (
        
        <div>
          <h2>User Details</h2>
          <p>Name: {userDetails?.kycName}</p>
          <p>userId: {userDetails?.userId}</p>
          {/* Display other user details as needed */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
      <UserOrders></UserOrders>
      <UserPosition></UserPosition>
      <UserHoldings></UserHoldings>
      <UserHoldingsValue></UserHoldingsValue>
    </div>
  );
};

export default Dashboard;
