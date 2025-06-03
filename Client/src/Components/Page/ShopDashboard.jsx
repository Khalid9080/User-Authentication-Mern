/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

const ShopDashboard = () => {
  const { shopName } = useParams();  // Get the shop name from the URL
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          withCredentials: true,  // Ensure cookies are sent for cross-subdomain requests
        });
        setShop(res.data.shop);
        setLoading(false);
      } catch (err) {
        setError('Unauthorized access. Please log in first.');
        setLoading(false);
      }
    };

    fetchShop();
  }, []);

   if (loading) return <Loading />;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">This is {shopName} shop</h1>
    </div>
  );
};

export default ShopDashboard;
