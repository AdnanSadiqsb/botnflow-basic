import axios from 'axios';

const useAxios = async (method, path, token = null, body = null) => {
    const apiEndPoint = `${import.meta.env.VITE_BASE_URL}/api/${path}`;

    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;

    }

    const config = {
        url: apiEndPoint,
        method,
        headers,
    };

    if (body !== null && method !== 'DELETE') {
        config.data = body;
    }

    try {
        const response = await axios(config);
        return [response.data, null];

    } catch (error) {
        if (error.response?.status === 401) {
            // Optionally redirect to login
            // window.location.href = `${import.meta.env.VITE_CLIENT_BASE_URL}/login`;
        }

        return [null, error.response?.data || { message: error.message }];
    }
};

export default useAxios;
