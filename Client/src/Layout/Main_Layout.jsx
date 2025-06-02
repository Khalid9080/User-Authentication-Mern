import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Main_Layout = () => {
    return (
        <div>
             {/* Navbar container */}
            <div >
                <Navbar />
            </div>

            {/* Main content */}
            <div className="min-h-[calc(100vh-438px)] container mx-auto py-10">
                <Outlet />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Main_Layout;