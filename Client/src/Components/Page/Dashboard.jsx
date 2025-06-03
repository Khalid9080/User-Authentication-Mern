/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from '../../UserAuthentication/Logout';


const Dashboard = () => {
  const [shop, setShop] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          withCredentials: true,
        });
        setShop(res.data.shop);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard. Please login again.');
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Your shop name:{" "}
        <a
          href={`http://${shop.toLowerCase().replace(/\s+/g, '')}.localhost:5173`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {shop}
        </a>
        
      </p>
      <Logout />
    </div>
  );
};

export default Dashboard;
