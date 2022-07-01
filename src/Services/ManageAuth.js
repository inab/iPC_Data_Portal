import * as Keycloak from 'keycloak-js';

const { REACT_APP_AUTH_URL } = process.env;

let initOptions = {
    url: REACT_APP_AUTH_URL, realm: 'IPC', clientId: 'ipc-react-portal', onLoad: 'login-required'
}

const keycloak = Keycloak(initOptions);

const getUserRoles = () => {
    return keycloak.tokenParsed.realm_access.roles.includes("app-admin") ? 'admin' : 'user'
}

const userAuth = () => new Promise((resolve, reject) =>
    keycloak.init({ onLoad: initOptions.onLoad })
        .success((result) => resolve(result))
        .error((e) => reject(e))
);

const getRefreshToken = () => new Promise((resolve, reject) => {
    keycloak.updateToken(70)
        .success((result) => resolve(result))
        .error((e) => reject(e))
});

const getAccessToken = () => {
    return keycloak.token
};

export { getAccessToken, getRefreshToken, getUserRoles, userAuth }