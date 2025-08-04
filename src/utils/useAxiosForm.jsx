import axios from 'axios';

const useAxiosForm = async (method, path, token = null, formData) => {
    const apiEndPoint = `${import.meta.env.VITE_BASE_URL}/api/${path}`;

    const headers = {
        'Content-Type': 'multipart/form-data',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await axios({
            url: apiEndPoint,
            method,
            headers,
            data: formData,
        });

        return [response.data, null];

    } catch (error) {
        if (error.response?.status === 401) {
            // Optionally redirect to login
            // window.location.href = `${import.meta.env.VITE_CLIENT_BASE_URL}/login`;
        }

        return [null, error.response?.data || { message: error.message }];
    }
};

export default useAxiosForm;
