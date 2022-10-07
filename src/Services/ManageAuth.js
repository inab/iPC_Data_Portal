import * as Keycloak from 'keycloak-js';
import axios from 'axios';

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

const getUserInfo = async () => {
    return await axios({
        method: 'get',
        url: `${REACT_APP_AUTH_URL}/realms/IPC/protocol/openid-connect/userinfo`,
        headers: {
          Authorization: "Bearer " + keycloak.token
        }
      })
}

const getEGAAccessToken = async () => {
    const params = {
        client_id: 'ipc-rest',
        requested_issuer: 'ega',
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        requested_token_type : 'urn:ietf:params:oauth:token-type:access_token',
        subject_token : keycloak.token
    };
      
    const data = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&');
    
    return await axios({
        method: 'post',
        url: `${REACT_APP_AUTH_URL}/realms/IPC/protocol/openid-connect/token`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data
    })    
}

export { getAccessToken, getRefreshToken, getUserRoles, userAuth, getUserInfo, getEGAAccessToken }