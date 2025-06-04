/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubdomainDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_BASE_URL}/api/dashboard`, {
          withCredentials: true,
        });
        setShop(res.data.shop);
        setLoading(false);
      } catch (err) {
        setError('Unauthorized access. Please login first.');
        setLoading(false);
      }
    };

    fetchShop();
  }, []);

  if (loading) return <div className="text-center p-6">Verifying token...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">This is {shop} shop</h1>
    </div>
  );
};

export default SubdomainDashboard;
