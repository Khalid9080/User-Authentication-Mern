/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const Home = () => {
  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];
  const knownShops = ['freshmart', 'urbanwear', 'techhub', 'booknest', 'greenroots', 'sweetbite'];

  const formattedName = subdomain.charAt(0).toUpperCase() + subdomain.slice(1);
  const isValidShop = knownShops.includes(subdomain);

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          withCredentials: true,
        });
        setUsername(res.data.username);
      } catch (err) {
        setUsername('');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const gradientTextClass = "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-zinc-100 px-4">
      <div className="relative max-w-3xl w-full rounded-3xl bg-white/40 p-8 shadow-lg backdrop-blur-sm border border-zinc-200">
        <div className="relative rounded-xl border-2 border-dashed border-zinc-200 px-8 py-32">
          {/* Background Lines */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,#9ca3af,#9ca3af_3px,transparent_3px,transparent_16px)] opacity-5 pointer-events-none"></div>

          <div className="relative flex flex-col gap-10 text-center items-center">
            <div className="inline-flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-14 h-14 text-purple-600"
              >
                <path d="M18 6 7 17l-5-5" />
                <path d="m22 10-7.5 7.5L13 16" />
              </svg>
            </div>

            <div>
              {isValidShop ? (
                loading ? (
                  
                      <Loading />
                  
                ) : username ? (
                  <h3 className="mb-3 text-3xl font-extrabold text-zinc-800">
                    Welcome back,{' '}
                    <span className={gradientTextClass}>
                      {username}
                    </span>
                    , to your{' '}
                    <span className={gradientTextClass}>
                      {formattedName}
                    </span>{' '}
                    shop
                  </h3>
                ) : (
                  <h3 className="mb-3 text-3xl font-extrabold text-zinc-800">
                    Welcome to your{' '}
                    <span className={gradientTextClass}>
                      {formattedName}
                    </span>{' '}
                    shop
                  </h3>
                )
              ) : (
                <h3 className="mb-3 text-3xl font-extrabold text-zinc-800">
                  This is home page
                </h3>
              )}

              {!loading && username && (
                <p className={`text-lg font-semibold mb-4 ${gradientTextClass}`}>
                  Hello, {username}!
                </p>
              )}

              <p className="text-lg font-medium text-zinc-600">
                {isValidShop
                  ? `You're now viewing ${formattedName}.`
                  : 'No shop subdomain detected.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
