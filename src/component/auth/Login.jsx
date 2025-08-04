import { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaGoogle, FaFacebook, FaShieldHalved } from 'react-icons/fa6';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import VisualPanel from './VisualPanel';
import { toast } from 'react-toastify';
import useAxios from '../../utils/useAxios';
import { auth, facebookProvider, googleProvider } from "../../utils/firebase";
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.email && !formData.password) {
            toast.error('Email and password are required.', { autoClose: 2000 });
            return false;
        }
        if (!formData.email) {
            toast.error('Email are required.', { autoClose: 2000 });
            return false;
        }
        if (!formData.password) {
            toast.error('password are required.', { autoClose: 2000 });
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            const [responseData, fetchError] = await useAxios('POST', 'auth/login', null, formData);
            if (responseData) {
                console.log("object", responseData)
                toast.success('Login successful!', { autoClose: 2000 });
                setTimeout(() => {
                    localStorage.setItem('token', responseData.data.token);
                    navigate('/dashboard/');
                }, 2000);
            } else {
                toast.error(fetchError?.message || 'Login failed', { autoClose: 2000 });
            }
        } catch (err) {
            toast.error(err.message || 'Something went wrong', { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            if (user) {
                const structuredData = {
                    loginVia: "google",
                    profileData: {
                        email: user.email || '',
                        firstName: user.displayName || '',
                        phoneNumber: user.phoneNumber || '',
                        profilePicture: user.photoURL || '',
                        verified: user.emailVerified || false
                    }
                };

                console.log(structuredData);
                const [responseData, error] = await useAxios('POST', 'auth/firebase-auth', null, structuredData);
                if (responseData) {
                    toast.success('Login successfully!');
                    setTimeout(() => {
                        console.log(responseData);
                        localStorage.setItem('token', JSON.stringify(responseData.data.token));
                        navigate('/dashboard');
                        // window.location.reload();
                    }, 2000);
                }
            } else {
                toast.error('Registration error');
            }
        } catch (error) {
            toast.error(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }

    };

    const handleFacebookLogin = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;
            console.log("User info facebook:", user);
        } catch (error) {
            console.error("Facebook login error", error);
        }
    };

    return (
        <div className="lg:flex justify-between bg-gray-50">
            <div className="lg:w-[50%] w-full flex flex-col items-center px-3 md:px-6 py-6 lg:py-12 lg:px-8">
                <div className="w-full max-w-md space-y-8 bg-white p-5 rounded-xl shadow-lg">
                    <div className="flex justify-center">
                        <img src={logo} alt="Logo" className="w-60" />
                    </div>
                    <p className="text-sm text-gray-600 text-center">Sign in to access your account</p>

                    <div className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="w-full pl-10 pr-3 py-3 border rounded-lg"
                                    placeholder="you@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full pl-10 pr-10 py-3 border rounded-lg"
                                    placeholder="••••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-3 text-gray-600">
                                    {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between text-sm">
                            <Link to="/forgot-password" className="text-primary-600 hover:text-brand-500">Forgot password?</Link>
                        </div>

                        <button
                            onClick={handleLogin}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-brand-700"
                        >
                            {loading ? 'Logging in...' : 'Sign In'}
                        </button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center py-2.5 px-4 border rounded-lg bg-white hover:bg-gray-50"
                         onClick={handleGoogleLogin}
                         >
                            <FaGoogle className="text-red-500 mr-2" />
                            Google
                        </button>
                        <button className="flex items-center justify-center py-2.5 px-4 border rounded-lg bg-white hover:bg-gray-50" 
                        onClick={handleFacebookLogin}
                        >
                            <FaFacebook className="text-blue-600 mr-2" />
                            Facebook
                        </button>
                    </div>

                    <p className="text-sm text-gray-600 text-center mt-6">
                        Don't have an account?
                        <Link to="/signup" className="text-primary-600 hover:text-brand-500 ml-1">Signup for Account!</Link>
                    </p>
                </div>

                <div className="text-xs text-center text-gray-500 mt-8">
                    <p className="flex items-center justify-center mb-2">
                        <FaShieldHalved className="mr-2 text-primary-600" />
                        Your data is protected with enterprise-grade security.
                    </p>
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

export default Login;
