import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-zinc-100 px-4">
      <div className="relative max-w-3xl w-full rounded-3xl bg-white/40 p-8 shadow-lg backdrop-blur-sm border border-zinc-200">
        <div className="relative rounded-xl border-2 border-dashed border-zinc-200 px-8 py-32">
          {/* Background Lines */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,#9ca3af,#9ca3af_3px,transparent_3px,transparent_16px)] opacity-5 pointer-events-none"></div>

          {/* Cross icon top-right */}
          <button
            onClick={() => navigate('/')} // Customize to your home route
            aria-label="Close"
            className="absolute top-4 right-4 rounded-full p-2 hover:bg-gray-200 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="relative flex flex-col gap-8 text-center">
            <h1 className="text-7xl font-extrabold text-purple-600">404</h1>
            <h3 className="text-3xl font-bold text-zinc-800">Page Not Found</h3>
            <p className="text-lg font-medium text-zinc-600">
              Sorry, You need to make login first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
