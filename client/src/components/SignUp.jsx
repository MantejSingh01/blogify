import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomLink from "./feature-components/CustomLink";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // Implement signup logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div className="bg-cover bg-center flex justify-center items-center min-h-screen">
      <div className="bg-white bg-opacity-75 backdrop-blur-lg p-10 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="flex mb-2">Email:</label>
            <input
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2">Password:</label>
            <input
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2">Confirm Password:</label>
            <input
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-gradient-to-r from-customPink to-customPurple text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <Link to="/login" className=" hover:underline">
            Login
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

export default SignUp;
