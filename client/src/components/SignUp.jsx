import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../reduxToolKit/UserSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../reduxToolKit/UserSlice";
import Loading from "./feature-components/Loading";
import ErrorComponent from "./feature-components/ErrorComponent";
import { isValidEmail } from "../utils/isValidEmail";
const SignUp = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [register, { isLoading, isError, error }] = useRegisterMutation(); 
const navigate = useNavigate()
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!isValidEmail(email)) {
        alert("Enter valid mail");
        return;
      }
      const { data } = await register({
        name,
        email,
        password,
        address,
        phone,
      });

      console.log("User registered:", data);
      if(data && data.status == 200){
        dispatch(setUser(data));
        navigate('/')
      }
      
    } catch (error) {
      alert("Registration failed:", error);
    }
  };

  

  return (

    <div className=" h-3/4  p-10 flex justify-center items-center">
         { isLoading && <Loading />}
      {isError && <ErrorComponent message={error.data.message} />}
      <div className="bg-white bg-opacity-75 backdrop-blur-lg p-10 rounded-lg md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-semibold mb-4 italic">Blogify</h1>
        <h2 className="text-1xl font-semibold mb-4">Register Below</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="flex mb-2">Name:</label>
            <input
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
              placeholder="enter name"
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2">Email:</label>
            <input
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2">Password:</label>
            <input
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2">Phone:</label>
            <input
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
              type="number"
              value={phone}
              required
              placeholder="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="flex mb-2">Address:</label>
            <input
              className="border border-gray-400 px-3 py-2 rounded-lg w-full"
              type="text"
              value={address}
              required
              placeholder="address"
              onChange={(e) => setAddress(e.target.value)}
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
          <Link
            to="/verification"
            className="hover:underline"
            state="Reset Password"
          >
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
