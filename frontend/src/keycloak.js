import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: 'shopping-list',
    clientId: 'frontend-app'
});

export default keycloak;
