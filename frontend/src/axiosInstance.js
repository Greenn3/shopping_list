import axios from 'axios';
import keycloak from './keycloak';

const baseURL =
    window.location.hostname === 'localhost'
        ? 'http://localhost:8080'
        : 'http://backend:8080'; // działa w kontenerze

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use((config) => {
    if (keycloak?.token) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
        console.log("Token:", keycloak.token);
        console.log("Token parsed:", keycloak.tokenParsed);
    }
    return config;
});

export default axiosInstance;
