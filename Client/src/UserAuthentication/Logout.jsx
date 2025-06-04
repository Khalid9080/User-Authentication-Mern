/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Show confirmation popup
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, cancel'
    });

    if (result.isConfirmed) {
      try {
        await axios.post(
          `${import.meta.env.VITE_REACT_BASE_URL}`,
          {},
          { withCredentials: true }
        );
        Swal.fire('Logged out!', 'You have been logged out.', 'success');
        navigate('/signin');
      } catch (err) {
        Swal.fire('Error!', 'Logout failed, please try again.', 'error');
      }
    } else {
      // User cancelled logout, do nothing
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default Logout;
