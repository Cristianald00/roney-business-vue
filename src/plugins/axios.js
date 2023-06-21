import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL, // 'http://127.0.0.1:8000/', // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Other default headers you want to include
    },
});

// Interceptors for session management
axiosInstance.interceptors.request.use((config) => {

    // Authorization token if signed in
    const authToken = window.localStorage.getItem('access_token');
    if ( authToken ) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle and customize error responses here
        return Promise.reject(error);
    }
);

export default axiosInstance;
