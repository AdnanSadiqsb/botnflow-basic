import { useState } from 'react';
import VisualPanel from './VisualPanel';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/images/logo.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!email) {
            toast.error('Please enter your email');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/password-reset-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Reset link sent to your email');
            } else {
                toast.error(data?.message || 'Something went wrong');
            }
        } catch (error) {
            toast.error('Network error');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <div className="lg:flex justify-between bg-gray-50">
            <div className="lg:w-[50%] w-full flex flex-col items-center px-3 md:px-6 py-3 md:py-6 lg:py-12 lg:px-8">
                <div className="w-full max-w-md space-y-8 bg-white p-3 md:p-5 lg:p-8 rounded-xl shadow-lg">
                    <div className="flex justify-center items-center">
                        <img src={logo} alt="" className="w-60" />
                    </div>

                    <div className="text-center">
                        <p className="mt-2 text-sm text-gray-600">Forget Your Password? Reset Now!</p>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fa-regular fa-envelope text-gray-400"></i>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-gray-900"
                                    placeholder="you@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleReset}
                                disabled={loading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition duration-150 ${
                                    loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-primary-600 hover:bg-brand-700 focus:ring-2 focus:ring-offset-2 focus:ring-brand-500'
                                }`}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?
                            <Link to="/" className="ml-1 font-medium text-primary-600 cursor-pointer">
                                Login for Account!
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-[21px] text-center text-xs text-gray-500">
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

            <div className="lg:w-[50%] w-full">
                <VisualPanel />
            </div>
        </div>
    );
};

export default ForgotPassword;
