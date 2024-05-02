import React, { useState,useEffect} from 'react';
import axios from 'axios';

const UserOrders = () => {
  const [accessToken, setAccessToken] = useState('');
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch access token from localStorage or from the API
    const accessTokenFromStorage = localStorage.getItem('accessToken');
    setAccessToken(accessTokenFromStorage);
  }, []);

  useEffect(() => {
  
      fetchUserOrders();
  }, [accessToken]);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3032/user-orders', {
        params: { accessToken }
      });
      console.log('user orders value :',response.data);
      const userData = JSON.parse(response.data);
      console.log('user orders value Parse :', userData);
      setOrders(userData.data);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      setError('Error fetching user orders');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserOrders();
  };

  return (
    <div>
      <h2>Fetch User Orders</h2>
      {/* <form onSubmit={handleSubmit}>
        <input type="text" value={accessToken} onChange={(e) => setAccessToken(e.target.value)} placeholder="Enter Access Token" />
        <button type="submit">Fetch Orders</button>
      </form> */}
      {error && <p>{error}</p>}
      {orders && (
        <div>
          <h3>User Orders</h3>
          <pre>{JSON.stringify(orders, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UserOrders;

