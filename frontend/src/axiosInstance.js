import axios from 'axios';
import keycloak from './keycloak'; // or however you expose it

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // or your VPS IP
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (keycloak?.token) {
            config.headers.Authorization = `Bearer ${keycloak.token}`;
            console.log(keycloak.tokenParsed.iss); // should match exactly
            console.log("Token:", keycloak.token);
            console.log("Token parsed:", keycloak.tokenParsed);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
