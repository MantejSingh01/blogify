import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../reduxToolKit/UserSlice';

const Navbar = () => {
    const user = useSelector(state=> state.user.user); 
    const navigate = useNavigate()
    console.log(user)
    const dispatch = useDispatch();
    const handleLogout = ()=>{
        dispatch(clearUser());
            navigate("/login")
           
    }


    return (
        <nav className=" top-0 w-full bg-gradient-to-r from-customPink to-customPurple z-50 sticky">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-white text-xl font-bold italic ">Blogify</Link>
                        </div>
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                            <Link to="/" className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Blogs</Link>
                            {!user&& (
                                <>
                                    <Link to="/login" className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                                    <Link to="/signup" className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                                </>
                            )}
                            {user && (
                                <>
                                    <Link to="/myblogs" className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My Blogs</Link>
                                    <button className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleLogout}>Logout</button>
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
