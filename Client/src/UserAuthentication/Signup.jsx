import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DropdownList from '../Components/Page/DropdownList';
import axios from 'axios';
import toast from 'react-hot-toast';


const Signup = () => {
  const [selectedShop, setSelectedShop] = useState('');
   const navigate = useNavigate();

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
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-zinc-800 underline decoration-slate-300 underline-offset-2 hover:text-zinc-900"
              >
                Sign In
              </Link>
            </h2>

          </div>

         <form
            className="mt-5 flex flex-col gap-5"
            onSubmit={async (e) => {
              e.preventDefault();
              const username = e.target.username.value;
              const email = e.target.email.value;
              const password = e.target.password.value;
              const confirm = e.target['password-confirmation'].value;
              const shop = selectedShop;

              if (password !== confirm) return toast.error('Passwords do not match');

              try {
                await axios.post('http://localhost:5000/api/signup', {
                  username,
                  email,
                  password,
                  shop,
                });
                // Redirect to signin with success flag
                navigate('/signin', { state: { signupSuccess: true } });
              } catch (err) {
                toast.error(err.response?.data || 'Signup failed');
              }
            }}
          >

            <div className="space-y-1">
              <label htmlFor="name" className="inline-block text-sm font-medium">
                User Name
              </label>
              <input
                id="username"
                type="text"
                required
                className="block w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm/6 font-medium placeholder-zinc-500 focus:border-zinc-500 focus:ring-3 focus:ring-zinc-500/50 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="inline-block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
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
                type="password"
                required
                className="block w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm/6 font-medium placeholder-zinc-500 focus:border-zinc-500 focus:ring-3 focus:ring-zinc-500/50 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password-confirmation" className="text-sm font-medium">
                Confirm Password
              </label>
              <input
                id="password-confirmation"
                type="password"
                required
                className="block w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm/6 font-medium placeholder-zinc-500 focus:border-zinc-500 focus:ring-3 focus:ring-zinc-500/50 focus:outline-hidden"
              />
            </div>

            <DropdownList setSelectedShop={setSelectedShop} />


            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm leading-5 font-medium text-white hover:border-zinc-900 hover:bg-zinc-900 hover:text-white focus:ring-2 focus:ring-zinc-500/50 focus:outline-hidden active:border-zinc-700 active:bg-zinc-700"
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
