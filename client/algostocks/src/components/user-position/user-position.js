import React, { useState, useEffect} from 'react';
import axios from 'axios';

const UserPosition = () => {
  const [accessToken, setAccessToken] = useState('');
  const [positions, setPositions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch access token from localStorage or from the API
    const accessTokenFromStorage = localStorage.getItem('accessToken');
    setAccessToken(accessTokenFromStorage);
  }, []);
  
  useEffect(() => {
   
      fetchUserPositions();
  }, [accessToken]);

  const fetchUserPositions = async () => {
    try {
      const response = await axios.get('http://localhost:3032/user-position', {
        params: { accessToken }
      });
      console.log('user position value :',response.data);
      const userData = JSON.parse(response.data);
      console.log('user position value Parse :', userData);
      setPositions(userData.data);
    } catch (error) {
      console.error('Error fetching user positions:', error);
      setError('Error fetching user positions');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserPositions();
  };

  return (
    <div>
      <h2>Fetch User Positions</h2>
      {/* <form onSubmit={handleSubmit}>
        <input type="text" value={accessToken} onChange={(e) => setAccessToken(e.target.value)} placeholder="Enter Access Token" />
        <button type="submit">Fetch Positions</button>
      </form> */}
      {error && <p>{error}</p>}
      {positions && (
        <div>
          <h3>User Positions</h3>
          <pre>{JSON.stringify(positions, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UserPosition;
