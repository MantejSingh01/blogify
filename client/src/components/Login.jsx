import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomLink from "./feature-components/CustomLink";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div className="bg-white bg-opacity-75 backdrop-blur-lg p-10 rounded-lg md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-semibold mb-4">Blogify</h1>
        <h2 className="text-1xl font-semibold mb-4">Welcome Back!</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="flex mb-2 text-gray-700">Email:</label>
            <input
              className="border border-gray-400 px-3 py-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2 text-gray-700">Password:</label>
            <input
              className="border border-gray-400 px-3 py-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className=" bg-gradient-to-r from-customPink to-customPurple text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
            type="submit"
          >
            Continue
          </button>
        </form>
        <div className="mt-4 text-gray-700">
          <Link to="/signup" className="hover:underline">
            Register
          </Link>
          <span className="mx-2">|</span>
          <CustomLink to="/verification" task="reset-password">
            Reset Password
          </CustomLink>
          <span className="mx-2">|</span>
          <CustomLink to="/verification" task="email-verification">
            Email Verification
          </CustomLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
