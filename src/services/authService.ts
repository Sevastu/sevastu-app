import apiClient from './apiClient';

export interface AuthResponse {
    accessToken: string;
    user: {
        id: string;
        phone: string;
        role: string;
        name: string;
        email?: string;
    };
}

const authService = {
    sendOtp: async (phone: string) => {
        const response = await apiClient.post('/auth/send-otp', { phone });
        return response.data;
    },

    verifyOtp: async (phone: string, otp: string): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/verify-otp', { phone, otp });
        return response.data;
    },

    setPassword: async (password: string) => {
        const response = await apiClient.post('/auth/set-password', { password });
        return response.data;
    },

    loginWithEmail: async (email: string, pass: string): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/login-email', { email, pass });
        return response.data;
    },

    // Google Login is typically handled via a native library like expo-auth-session
    // This is a placeholder for the backend integration part
    googleLogin: async (token: string) => {
        // Implement once native Google login is set up
    }
};

export default authService;
