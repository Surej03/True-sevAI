import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const email = localStorage.getItem('resetEmail');
  const otp = localStorage.getItem('verifiedOtp');
  const { backendUrl, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email || !otp) {
      toast.error("Invalid session. Start again.");
      navigate("/forgotpassword");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/user/reset-reset-otp`, {
        email,
        otp,
        newPassword
      });

      if (res.data.success) {
        toast.success("Password reset successful!");
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("verifiedOtp");
        navigate("/")
        setTimeout(() => {
            setShowLogin(true);
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };
const handleKeyDown = (e) =>{
    if (e.key === "Enter"){
        e.preventDefault();
        handleReset(e);
    }
}
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-lightTheme">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-3 dark:text-white">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white mb-3"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white mb-3"
        />
        <button
          onClick={handleReset}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;