import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const handleOtp = async () => {
    if (!email) return toast.error("Email is required!");

    try {
      const response = await axios.post(`${backendUrl}/user/send-reset-otp`, { email });
      if (response.data.success) {
        toast.success("OTP sent to your email");
        localStorage.setItem("resetEmail", email);
        navigate('/verify-otp');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Error sending OTP. Try again.");
    }
  };

  const handleKeyDown = (e) =>{
    if (e.key === 'Enter'){
      e.preventDefault();
      handleOtp(e)
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-lightTheme">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-3 dark:text-white">Password Reset</h2>
        <p className="text-gray-600 text-sm text-center mb-4 dark:text-gray-300">
          Enter your email to receive a password reset OTP.
        </p>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white mb-4"
        />
        <button
          onClick={handleOtp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;