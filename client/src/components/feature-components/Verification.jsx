import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForgotPasswordMutation } from "../../reduxToolKit/UserSlice";
import { useDispatch } from "react-redux";
import { isValidEmail } from "../../utils/isValidEmail";

const Verification = (props) => {
  const [email, setEmail] = useState("");

  const location = useLocation();
  const task = location.state;
  const [forgotPassword, { isLoading, isError, error }] = useForgotPasswordMutation();  
  const dispatch =useDispatch();
  const navigate = useNavigate()
  console.log(task);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      alert("Enter valid email");
      return;
    }
    try {
        const { data }= await forgotPassword(email);
        if(data && data.status == 200 ){
            console.log("mail send", data);
            alert(data?.message? data?.message: "link sent to the mail!!")
        }
       
    } catch (error) {
        console.log("login failed")
    }
 


  };

  return (
    <div className="bg-cover bg-center flex justify-center items-center h-3/4  py-16 ">
      <div className="bg-white bg-opacity-75 backdrop-blur-lg p-10 rounded-lg relative">
        <button
          className="absolute top-0 left-2 mt-2 text-black p-1 text-xl hover:bg-gray-800 hover:text-white"
          onClick={() => navigate(-1)}
        >
          <div>&#x2190;</div>
        </button>
        <h2 className="text-2xl font-semibold mb-4">{task}</h2>
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
            {task}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
