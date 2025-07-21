import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url:
        window.location.hostname === 'localhost'
            ? 'http://localhost:8081/auth'
            : 'http://keycloak:8080/auth',
    realm: 'shopping-list',
    clientId: 'frontend-app',
});

export default keycloak;
