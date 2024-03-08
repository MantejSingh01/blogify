import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Verification = ({ task }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement email verification or password reset logic here based on the task
    console.log("Task:", task);
    console.log("Email:", email);
    // Perform appropriate action based on the task
  };

  return (
    <div className="bg-cover bg-center flex justify-center items-center min-h-screen">
      <div className="bg-white bg-opacity-75 backdrop-blur-lg p-10 rounded-lg relative">
        <button
  className="absolute top-0 left-2 mt-2 text-black p-1 text-xl hover:bg-gray-800 hover:text-white"
  onClick={() => navigate(-1)}
        >
          <div>&#x2190;</div>
        </button>
        <h2 className="text-2xl font-semibold mb-4">
          {task === "verification" ? "Email Verification" : "Password Reset"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="flex mb-2">Email:</label>
            <input
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
              type="email"
              value={email}
              placeholder="enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="bg-gradient-to-r from-customPink to-customPurple text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
            type="submit"
          >
            {task === "verification" ? "Verify Email" : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
