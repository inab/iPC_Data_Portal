import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as Keycloak from 'keycloak-js';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import FetchUserSelections from './Layout/FetchUserSelections/FetchUserSelections';

let initOptions = {
    url: 'https://inb.bsc.es/auth/', realm: 'IPC', clientId: 'ipc-react-portal', onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).success((auth) => {

    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
    }

    const app = (
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <FetchUserSelections>
                        <App />
                    </FetchUserSelections>
                </PersistGate>
            </BrowserRouter>
        </Provider>
    );

    ReactDOM.render(app, document.getElementById('root'));

    // Check user roles

    var roles = [];

    // Reducer??
    if(keycloak["tokenParsed"]["resource_access"].hasOwnProperty("permissions-api")){
        roles = keycloak["tokenParsed"]["resource_access"]["permissions-api"]["roles"]
    }
    
    if(roles.includes("admin")){
        localStorage.setItem("role", 'admin');
    } else {
        localStorage.setItem("role", 'user');
    }

    localStorage.setItem("react-token", keycloak.token);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken);

    setTimeout(() => {
        keycloak.updateToken(70).success((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).error(() => {
            console.error('Failed to refresh token');
        });
    }, 60000)

}).error(() => {
    console.error("Authenticated Failed");
});
