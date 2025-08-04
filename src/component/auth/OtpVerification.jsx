import VisualPanel from './VisualPanel';
import logo from '../../assets/images/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { toast } from 'react-toastify';

const OtpVerification = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { search } = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(search);
  const token = decodeURIComponent(queryParams.get('token') || '');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handlePasswordReset = async () => {
    if (!token) {
      toast.error('Invalid or missing token');
      return;
    }

    if (!password || !confirmPassword) {
      toast.error('Please fill both password fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/reset-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const responseData = await res.json();

      if (res.ok) {
        toast.success(responseData.message || 'Password reset successfully');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(responseData.error || 'Reset failed');
      }
    } catch (error) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  return (
    // <div className="bg-gray-50 min-h-screen flex flex-col lg:flex-row">
    <div className="lg:flex justify-between bg-gray-50">

      <div className="lg:w-[50%] w-full flex flex-col items-center px-3 md:px-6 py-3 md:py-6 lg:py-12 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-3 md:p-5 lg:p-8 rounded-xl shadow-lg">
          <div className="flex justify-center items-center">
            <img src={logo} alt="logo" className='w-60' />
          </div>


          <div className="space-y-5" >
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full pl-3 pr-10 py-3 border rounded-lg"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-gray-600"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full pl-3 pr-10 py-3 border rounded-lg"
                placeholder="••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-9 text-gray-600"
              >
                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>

            <button
              onClick={handlePasswordReset}
              className="w-full bg-primary-600 py-3 rounded-lg text-white font-medium hover:bg-primary-700 transition"
            >
              Reset Password
            </button>
          </div>

          {/* <div className="mt-[41px] text-center"></div> */}
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <div className="mb-4">
            <p className="text-sm text-gray-600 flex items-center justify-center">
              <i className="fa-solid fa-shield-halved mr-2 text-primary-600"></i>
              Your data is protected with enterprise-grade security.
            </p>
          </div>
          <div className="flex justify-center space-x-4 mb-2">
            <a href="#" className="hover:text-primary-600">Privacy Policy</a>
            <a href="#" className="hover:text-primary-600">Terms of Service</a>
            <a href="#" className="hover:text-primary-600">Support</a>
          </div>
          <p>© 2025 BotnFlow. All rights reserved.</p>
        </div>
      </div>

      <div className='lg:w-[50%] w-full'>
        <VisualPanel />
      </div>
    </div>
  );
};

export default OtpVerification;
