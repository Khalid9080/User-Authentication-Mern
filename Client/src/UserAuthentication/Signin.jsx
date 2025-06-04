import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Components/Page/Loading';

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rememberMe, setRememberMe] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const [toastShown, setToastShown] = useState(false);

  const toastShown = useRef(false);  // useRef persists without causing re-renders

  useEffect(() => {
    if (location.state?.signupSuccess && !toastShown.current) {
      toast.success('Signup successful! Please sign in.');
      toastShown.current = true;
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, navigate, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError('');
    setPasswordError('');
    setGeneralError('');
    setIsLoading(true);

    const username = e.target.username.value.trim();
    const password = e.target.password.value;

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_BASE_URL}/api/signin`,
        { username, password, rememberMe },
        { withCredentials: true }
      );
      toast.success('Login successful! Redirecting...');
      setIsLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setIsLoading(false);
      const message = err.response?.data || 'Login failed';

      if (message.toLowerCase().includes('user not found')) {
        setUsernameError('User not found');
      } else if (message.toLowerCase().includes('incorrect password')) {
        setPasswordError('Incorrect password');
      } else {
        setGeneralError(message);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }



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
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
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
              {usernameError && <p className="text-red-600 text-sm mt-1">{usernameError}</p>}
            </div>

            <div className="space-y-2">
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
              {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
            </div>

            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 rounded border border-zinc-300 bg-white focus:ring-2 focus:ring-zinc-500"
              />
              <label htmlFor="rememberMe" className="text-sm font-medium text-zinc-700 select-none">
                Remember Me
              </label>
            </div>

            <p className="text-xs text-zinc-500 mt-0 mb-4">
              If selected, keep the user logged in for 7 days, otherwise the session expires after 30 minutes.
            </p>
            {generalError && (
              <p className="text-red-600 text-center text-sm mb-4">
                {generalError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm leading-5 font-medium text-white
    hover:border-zinc-900 hover:bg-zinc-900 hover:text-white
    focus:ring-2 focus:ring-zinc-500/50 focus:outline-hidden active:border-zinc-700 active:bg-zinc-700
    ${isLoading ? "cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                "Log in"
              )}
            </button>


            <div className="text-center text-xs font-medium text-zinc-500">
              Don't have an account yet?{' '}
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
