import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    // url:
    //     window.location.hostname === 'localhost'
    //         ? 'http://localhost:8081/auth'
    //         : 'http://keycloak:8080/auth',
    //
    // url:
    //     window.location.hostname === 'localhost'
    //         ? 'http://localhost:8081/auth'
    //         : 'http://80.211.200.112:8081/auth',
    url: 'https://80.211.200.112/auth',

    realm: 'sync-cart',
    clientId: 'react-app',
});

export default keycloak;
