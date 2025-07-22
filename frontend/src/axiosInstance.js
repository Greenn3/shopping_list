import axios from 'axios';
import keycloak from './keycloak';
//local
// const baseURL =
//     window.location.hostname === 'localhost'
//         ? 'http://localhost:8080'
//         : 'http://backend:8080'; // działa w kontenerze
//for the server
// const baseURL =
//     window.location.hostname === 'localhost'
//         ? 'http://localhost:8080'
//         : 'http://80.211.200.112:8080'; // <- publiczny adres serwera lub IP
const baseURL = 'https://80.211.200.112/sync-cart/api';

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
