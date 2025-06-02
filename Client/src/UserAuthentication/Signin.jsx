import axios from 'axios';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.signupSuccess) {
      toast.success('Signup successful! Please sign in.');
      // Optionally clear state so toast doesn't repeat
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);


  return (
    <div className="relative mx-auto w-full max-w-sm rounded-xl border border-zinc-200 bg-white ring-4 ring-zinc-300/25">
      <div className="flex grow items-center px-6 py-10 sm:px-10 sm:py-14">
        <div className="grow">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 50 39"
              className="mb-6 inline-block w-10"
            >
              <path fill="#007AFF" d="M16.5 2h21.08L22.083 24.973H1L16.5 2Z" />
              <path
                fill="#312ECB"
                d="M17.422 27.102 11.42 36h22.082L49 13.027H32.702l-9.496 14.075h-5.784Z"
              />
            </svg>
            <h1 className="text-2xl font-extrabold">Welcome to your app</h1>
            <h2 className="mt-1 text-sm leading-relaxed text-zinc-600">
              Please log in to access your dashboard.
            </h2>
          </div>

        <form
            className="mt-5 flex flex-col gap-5"
            onSubmit={async (e) => {
              e.preventDefault();
              const username = e.target.username.value;
              const password = e.target.password.value;

              try {
                await axios.post('http://localhost:5000/api/signin', { username, password });
                toast.success('Login successful! Redirecting...');
                navigate('/dashboard');
              } catch (err) {
                toast.error(err.response?.data || 'Login failed');
              }
            }}
          >

            <div className="space-y-2">
              <label htmlFor="email" className="inline-block text-sm font-medium">
                User Name
              </label>
              <input
                id="username"
                type="text"
                required
                className="block w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm/6 font-medium placeholder-zinc-500 focus:border-zinc-500 focus:ring-3 focus:ring-zinc-500/50 focus:outline-hidden"
              />
            </div>

            <div className="space-y-2">
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

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm leading-5 font-medium text-white hover:border-zinc-900 hover:bg-zinc-900 hover:text-white focus:ring-2 focus:ring-zinc-500/50 focus:outline-hidden active:border-zinc-700 active:bg-zinc-700"
            >
              Log in
            </button>

            <div className="text-center text-xs font-medium text-zinc-500">
              Don't have an account yet?{" "}
              <Link
                to="/signup"
                className="text-zinc-800 underline decoration-slate-300 underline-offset-2 hover:text-zinc-900"
              >
                Sign Up
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
