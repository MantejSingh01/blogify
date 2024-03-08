import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
    return (
        <nav className="fixed top-0 w-full bg-gradient-to-r from-customPink to-customPurple z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-white text-xl font-bold italic ">Blogify</Link>
                        </div>
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                            <Link to="/" className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            {!isLoggedIn && (
                                <>
                                    <Link to="/login" className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                                    <Link to="/signup" className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                                </>
                            )}
                            {isLoggedIn && (
                                <>
                                    <Link to="/dashboard" className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                                    <Link to="/profile" className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                                    <Link to="/logout" className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
