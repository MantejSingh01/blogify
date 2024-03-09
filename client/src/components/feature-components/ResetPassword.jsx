import React,{useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../reduxToolKit/UserSlice";

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const link = searchParams.get("link");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetPassword, {data,isLoading, isError, error}] = useResetPasswordMutation()
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please enter matching passwords.");
        return;
      }
      try {
        
      
      const {data} = await resetPassword({link, password});
      if(data && data.status == 200 ){
       
        setTimeout(() => {
            setSuccess(true);
            navigate("/login")
          }, 2000);
      }
    } catch (error) {
        console.log(error)
    }
    
   
  };

  return (
    <div className="bg-cover bg-center flex justify-center items-center h-screen py-16 ">
      <div className="bg-white bg-opacity-75 backdrop-blur-lg p-10 rounded-lg relative">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="flex mb-2">New Password:</label>
              <input
                className="border border-gray-400 px-3 py-2 rounded-lg w-full"
                type="password"
                value={password}
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="flex mb-2">Confirm Password:</label>
              <input
                className="border border-gray-400 px-3 py-2 rounded-lg w-full"
                type="password"
                value={confirmPassword}
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-gradient-to-r from-customPink to-customPurple text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16 8 8 0 000-16zm4.293 7.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 00-1.414 1.414l2.5 2.5a1 1 0 001.414 0l4.5-4.5z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-green-500 ml-2">Password reset successful. Please login again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
