import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { ContentContext } from '../../context/ContextProvider';
import useAxios from '../../utils/useAxios';

const EmailVerification = () => {
    const { themeColor } = useContext(ContentContext);
    const [data, setData] = useState(null);
    const [showResend, setShowResend] = useState(false);
    const [email, setEmail] = useState('');
    const [resending, setResending] = useState(false);

    const { search } = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(search);
    const token = decodeURIComponent(queryParams.get('token') || '');

    useEffect(() => {
        const handleVerifyEmail = async () => {
            if (!token) {
                toast.error('Invalid or missing token');
                return;
            }

            try {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/confirm/${token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const responseData = await res.json();

                if (res.ok) {
                    setData(responseData);
                    toast.success(responseData.message || 'Email verified!');
                    setTimeout(() => {
                        navigate('/');
                        toast.dismiss();
                    }, 3000);
                } else {
                    toast.error(responseData.error || 'Verification failed');
                    setShowResend(true);
                }
            } catch (error) {
                toast.error(error.message || 'An error occurred');
                setShowResend(true);
            }
        };

        handleVerifyEmail();
    }, [token, navigate]);

    const handleResend = async () => {
        if (!email) {
            toast.error('Please enter your email');
            return;
        }

        setResending(true);
        const [response, error] = await useAxios('POST', 'auth/resend-confirmation', null, { email });

        if (response) {
            toast.success(response.message || 'Confirmation email sent!');
        } else {
            toast.error(error?.message || 'Failed to resend confirmation email');
        }

        setResending(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-5">
            {data ? (
                <div className="text-green-600 flex flex-col items-center gap-3">
                    <CheckCircleIcon fontSize="large" />
                    <p className="text-lg font-medium">
                        Email successfully verified!
                    </p>
                    <p className="text-sm text-gray-600">Redirecting to the login page...</p>
                </div>
            ) : showResend ? (
                <div className="flex flex-col items-center gap-4 w-full max-w-md">
                    <ErrorIcon fontSize="large" className="text-red-500" />
                    <p className="text-lg text-gray-700">Verification failed. Please re-enter your email to resend the confirmation link.</p>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        onClick={handleResend}
                        disabled={resending}
                        className={`px-6 py-2 rounded-md text-white ${resending ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {resending ? 'Sending...' : 'Resend'}
                    </button>
                </div>
            ) : (
                <div className="text-blue-600 flex flex-col items-center gap-3">
                    <ErrorIcon fontSize="large" />
                    <p className="text-lg font-medium">Verifying your email...</p>
                </div>
            )}
        </div>
    );
};

export default EmailVerification;
