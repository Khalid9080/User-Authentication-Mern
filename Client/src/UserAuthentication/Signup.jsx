/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DropdownList from '../Components/Page/DropdownList';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const [selectedShop, setSelectedShop] = useState('');
  const navigate = useNavigate();

  const [shopAvailable, setShopAvailable] = useState(null); // null = unchecked, true = available, false = taken
  const [checkingShop, setCheckingShop] = useState(false);

  // Password validation regex: at least 8 chars, 1 number, 1 special char
  const validatePassword = (password) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);
  };

  // Check shop availability whenever selectedShop changes
  useEffect(() => {
    if (!selectedShop.trim()) {
      setShopAvailable(null);
      return;
    }

    const checkShop = async () => {
      setCheckingShop(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_BASE_URL}/api/check-shop?shop=${encodeURIComponent(selectedShop)}`
        );
        setShopAvailable(!res.data.exists);
      } catch (error) {
        setShopAvailable(false);
      } finally {
        setCheckingShop(false);
      }
    };

    checkShop();
  }, [selectedShop]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value;
    const shop = selectedShop.trim();

    if (!username) {
      return toast.error('User Name is required');
    }

    if (!validatePassword(password)) {
      return toast.error(
        'Password must be at least 8 characters, include at least one number and one special character.'
      );
    }

    if (!shop) {
      return toast.error('Please select a shop');
    }

    if (shopAvailable === false) {
      return toast.error('Shop name is already taken. Please choose another.');
    }

    try {
      await axios.post(`${import.meta.env.VITE_REACT_BASE_URL}/api/signup`, {
        username,
        password,
        shop,
      });

      navigate('/signin', { state: { signupSuccess: true } });
    } catch (err) {
      toast.error(err.response?.data || 'Signup failed');
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm rounded-xl border border-zinc-200 bg-white ring-4 ring-zinc-300/25">
      <div className="flex grow items-center px-6 py-10 sm:px-10 sm:py-14">
        <div className="grow">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mb-6 inline-block w-10 text-zinc-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5v-1.125a6.375 6.375 0 0112.75 0V19.5"
              />
            </svg>

            <h1 className="text-2xl font-extrabold">Create a new account</h1>
            <h2 className="mt-1 text-sm leading-relaxed text-zinc-600">
              Already have an account?{' '}
              <Link
                to="/signin"
                className="text-zinc-800 underline decoration-slate-300 underline-offset-2 hover:text-zinc-900"
              >
                Sign In
              </Link>
            </h2>
          </div>

          <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="username" className="inline-block text-sm font-medium">
                User Name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm/6 font-medium placeholder-zinc-500 focus:border-zinc-500 focus:ring-3 focus:ring-zinc-500/50 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="inline-block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm/6 font-medium placeholder-zinc-500 focus:border-zinc-500 focus:ring-3 focus:ring-zinc-500/50 focus:outline-hidden"
              />
            </div>

            <DropdownList setSelectedShop={setSelectedShop} />

            {checkingShop && <p className="text-sm text-yellow-600">Checking shop availability...</p>}
            {shopAvailable === false && !checkingShop && (
              <p className="text-sm text-red-600">Shop name is already taken.</p>
            )}
            {shopAvailable === true && !checkingShop && (
              <p className="text-sm text-green-600">Shop name is available.</p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm leading-5 font-medium text-white hover:border-zinc-900 hover:bg-zinc-900 hover:text-white focus:ring-2 focus:ring-zinc-500/50 focus:outline-hidden active:border-zinc-700 active:bg-zinc-700"
              disabled={checkingShop || shopAvailable === false}
            >
              Register
            </button>

            <div className="text-center text-xs font-medium text-zinc-500">
              Amazing App &copy; 2024 and beyond
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
