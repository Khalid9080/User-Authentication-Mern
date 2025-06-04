/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Error404 from './Error404';
import Loading from './Loading';


const Dashboard = () => {
  const [shop, setShop] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // boolean flag now

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_BASE_URL}/api/dashboard`, {
          withCredentials: true,
        });
        setShop(res.data.shop);
        setUsername(res.data.username);
        setLoading(false);
      } catch (err) {
        setError(true);  // Set error to true instead of message
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error404 />;  // Show the 404 page component here

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_REACT_BASE_URL}`, {}, { withCredentials: true });
      window.location.href = '/signin';
    } catch {
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-xl bg-white shadow-lg transition">
      {/* ... rest of your Dashboard JSX */}
      <div className="relative aspect-[16/4] w-full">
        {/* Photo */}
        <div className="absolute inset-0 -mb-12 flex items-end justify-center sm:-mb-16">
          <div className="h-24 w-24 rounded-full border border-white/60 bg-white/25 p-2 ring-2 ring-white/20 backdrop-blur-sm sm:h-32 sm:w-32">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=160&h=160&auto=format&fit=crop"
              alt="Avatar"
              className="aspect-square w-full rounded-full object-cover shadow-sm shadow-slate-300"
            />
          </div>
        </div>
        {/* Cover */}
        <img
          src="https://images.unsplash.com/photo-1462556791646-c201b8241a94?q=80&w=900&auto=format&fit=crop"
          alt="Cover Image"
          className="aspect-[16/4] w-full object-cover rounded-t-xl"
        />
      </div>
      {/* Body */}
      <div className="grow px-7 pt-14 pb-7 text-center sm:pt-18">
        <h3 className="text-xl font-bold">{username}</h3>
        <div className="mt-1 inline-block rounded-full bg-sky-50 px-2 py-1 text-xs font-semibold text-sky-600">
          Shop Name:{' '}
          {shop ? (
            <a
              href={`http://${shop.toLowerCase().replace(/\s+/g, '')}.localhost:5173`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent font-bold"
            >
              {shop}
            </a>
          ) : (
            <span className="text-gray-500">No Shop Assigned</span>
          )}
        </div>
        <hr className="my-5 border-dashed border-gray-200" />
        <p className="text-left text-sm leading-relaxed text-slate-600">
          Welcome to your shop dashboard! Your shop name is{' '}
          <strong>{shop}</strong>. Manage your shop and profile here.
        </p>
        <hr className="my-5 border-dashed border-gray-200" />
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm leading-5 font-semibold text-secondary-800 
    hover:bg-red-600 hover:border-red-600 hover:text-white hover:scale-105 transform transition duration-300 ease-in-out
    focus:ring-3 focus:ring-red-300/50 active:border-red-700 active:bg-red-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 opacity-70 group-hover:opacity-100 transition duration-300 ease-in-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
