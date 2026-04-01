import axios from 'axios';
import { Alert } from 'react-native';

const apiClient = axios.create({
    baseURL: 'https://sevastu-be.vercel.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Mock function to get token - in real app, use AsyncStorage or similar
const getToken = () => {
    return null; // Replace with actual token retrieval
};

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Global error (401 -> logout)
            Alert.alert('Session Expired', 'Please login again.');
            // Add logic here to clear user session and navigate to login
        }
        return Promise.reject(error);
    }
);

export default apiClient;
