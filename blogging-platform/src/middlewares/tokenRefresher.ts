import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const refreshAuthToken = async () => {
    try {
        const response = await axios.post(`${apiUrl}/auth/refresh`, null, {
            withCredentials : true,
        });

        const newToken = response.data.token;

        localStorage.setItem('jwt', newToken);       
        return newToken;
    } catch (error) {
        console.error('Error refreshing token', error);
        throw error;
    };
};

let tokenRefreshInterva: NodeJS.Timeout;

export const startTokenRefresh = () => {
    if (tokenRefreshInterva) {
        clearInterval(tokenRefreshInterva);
    }

    tokenRefreshInterva = setInterval(async () => {
        try {
            await refreshAuthToken();
            console.log("Token refreshed");
        } catch (error) {
            clearInterval(tokenRefreshInterva);
            console.log("Error: Could not refresh token, logging out");
            window.location.href = '/login';
        }
    }, 10 * 60 * 1000);
};

export const stopTokenRefresh = () => {
    if (tokenRefreshInterva) {
        clearInterval(tokenRefreshInterva);
    }
};