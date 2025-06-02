import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <a href="https://pagedone.io/" className="flex justify-center">
            <svg className="w-40 h-8" viewBox="0 0 164 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="#111827" d="M47 24.7231V7H54.4171... (SVG path content shortened)" />
              <defs>
                <linearGradient id="paint0_linear_9129_4680" x1="35" y1="1.89063" x2="1.11152" y2="33.4573" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7C3AED" />
                  <stop offset="0.993738" stopColor="#4F46E5" />
                </linearGradient>
                <linearGradient id="paint1_linear_9129_4680" x1="35" y1="1.89063" x2="1.11152" y2="33.4573" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7C3AED" />
                  <stop offset="0.993738" stopColor="#4F46E5" />
                </linearGradient>
              </defs>
            </svg>
          </a>

          <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-10 mb-10 border-b border-gray-200">
            <li><a href="javascript:;" className="text-gray-800 hover:text-gray-900">Pagedone</a></li>
            <li><a href="javascript:;" className="text-gray-800 hover:text-gray-900">Products</a></li>
            <li><a href="javascript:;" className="text-gray-800 hover:text-gray-900">Resources</a></li>
            <li><a href="javascript:;" className="text-gray-800 hover:text-gray-900">Blogs</a></li>
            <li><a href="javascript:;" className="text-gray-800 hover:text-gray-900">Support</a></li>
          </ul>

          <div className="flex space-x-10 justify-center items-center mb-10">
            <a href="javascript:;" className="block text-gray-900 transition-all duration-500 hover:text-indigo-600">
              <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5667 14.7386L24.072..." fill="currentColor" />
              </svg>
            </a>
            <a href="javascript:;" className="block text-gray-900 transition-all duration-500 hover:text-indigo-600">
              <svg className="w-[1.688rem] h-[1.688rem]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.76556 14.8811C9.76556..." fill="currentColor" />
              </svg>
            </a>
            <a href="javascript:;" className="block text-gray-900 transition-all duration-500 hover:text-indigo-600">
              <svg className="w-[0.938rem] h-[1.625rem]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.7926 14.4697L14.5174..." fill="currentColor" />
              </svg>
            </a>
            <a href="javascript:;" className="block text-gray-900 transition-all duration-500 hover:text-indigo-600">
              <svg className="w-[1.875rem] h-[1.375rem]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M26.3106 1.27838C27.5782..." fill="currentColor" />
              </svg>
            </a>
          </div>

          <span className="text-lg text-gray-500 text-center block">
            <a href="https://pagedone.io/">pagedone</a> 2024, All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
