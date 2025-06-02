import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex items-center">
              <h1 className="text-white text-2xl font-bold">User Authentication</h1>
            </div>
          </div>

          {/* Center nav links (md and up) */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Dashboard
            </NavLink>
          </div>

          {/* Right side: Auth, Notification, Profile */}
          <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:pr-0">
            {/* Signup and Signin */}
            <div className="hidden md:flex space-x-2">
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Signup
              </NavLink>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Signin
              </NavLink>
            </div>

            {/* Notification Icon (hidden on mobile) */}
            <button
              type="button"
              className="hidden sm:inline-flex rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-white"
              aria-label="Notifications"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={toggleProfileMenu}
                className="flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-offset-2 focus:ring-white"
                aria-haspopup="true"
                aria-expanded={profileMenuOpen}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </Link>
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1" id="mobile-menu">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block bg-gray-900 text-white px-3 py-2 rounded-md text-base font-medium"
                : "block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "block bg-gray-900 text-white px-3 py-2 rounded-md text-base font-medium"
                : "block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive
                ? "block bg-gray-900 text-white px-3 py-2 rounded-md text-base font-medium"
                : "block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Signup
          </NavLink>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive
                ? "block bg-gray-900 text-white px-3 py-2 rounded-md text-base font-medium"
                : "block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Signin
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
