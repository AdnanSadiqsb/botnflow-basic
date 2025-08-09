import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
import { useSearchParams } from 'react-router-dom';

function InviteUser() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [valid, setValid] = useState(false);
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const urlToken = searchParams.get('token');
        if (!urlToken) {
            setError('Invalid or missing invite token.');
            setLoading(false);
            return;
        }
        setToken(urlToken);

        const verifyToken = async () => {
            setLoading(true);
            setError('');
            setValid(false);
            // Call your API to verify token
            const [responseData, fetchError] = await useAxios(
                'POST',
                'users/verify-invite-token',
                null,
                { token: urlToken }
            );
            if (responseData && responseData.success) {
                setValid(true);
                // Save token for future API calls (e.g., localStorage/session)
                localStorage.setItem('apiToken', urlToken);
            } else {
                setError('Invalid or expired invite token.');
            }
            setLoading(false);
        };

        verifyToken();
        // eslint-disable-next-line
    }, [searchParams]);

    return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">

                    
                    {loading ? (
                        <div className="text-center">
                            <div className="mb-4">
                                <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                            </div>
                            <p className="text-gray-700">Verifying invite token...</p>
                        </div>
                    ) : valid ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-green-600 mb-2">Invite Token Verified!</h2>
                            <p className="text-gray-700 mb-4">You can now proceed with your invitation.</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-red-600 mb-2">Invalid Invite</h2>
                            <p className="text-gray-700 mb-4">{error}</p>
                            <button
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={() => alert('Contact support!')}
                            >
                                Contact Us
                            </button>
                        </div>
                    )}
                </div>
            </div>
    );
}

export default InviteUser;