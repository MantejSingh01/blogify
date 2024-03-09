import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { isValidEmail } from "../utils/isValidEmail";
import { useLoginMutation } from "../reduxToolKit/UserSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../reduxToolKit/UserSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, isError, error }] = useLoginMutation();  
const dispatch =useDispatch();
const navigate = useNavigate()
  const handleLogin = async(e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      alert("Enter valid email");
      return;
    }
    try {
        const { data }= await login({email,password})
        if(data && data.status == 200 ){
            console.log("User logged in :", data);
            dispatch(setUser(data));
            navigate('/')
        }else{
            console.log(data.message)
            alert(data?.message? data?.message: "Invalid Credentials Provided")
        }
        
    } catch (error) {
        alert("login failed")
    }
 

  };

  return (
    <div className=" h-3/4  py-16  flex justify-center items-center">
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
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2 text-gray-700">Password:</label>
            <input
              className="border border-gray-400 px-3 py-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
              type="password"
              value={password}
              required
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
          <Link
            to="/verification"
            className="hover:underline"
            state={"Reset Password"}
          >
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
