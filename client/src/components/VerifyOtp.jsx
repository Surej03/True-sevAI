import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const email = localStorage.getItem('resetEmail');

  const handleVerify = async () => {
    if (!otp || !email) {
      toast.error("OTP or Email is missing");
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/user/verify-reset-otp`, { email, otp });
      if (res.data.success) {
        toast.success("OTP verified!");
        localStorage.setItem("verifiedOtp", otp);
        navigate("/resetpassword");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to verify OTP. Try again.");
    }
  };

  const handleKeyDown = (e) =>{
    if (e.key === "Enter"){
      e.preventDefault();
      handleVerify(e)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-lightTheme">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-3 dark:text-white">Verify OTP</h2>
        <p className="text-gray-600 text-sm text-center mb-4 dark:text-gray-300">
          Enter the OTP sent to your email address.
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white mb-4"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;