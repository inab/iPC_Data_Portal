import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { getAccessToken, getRefreshToken, getUserRoles, userAuth } from './Services/ManageAuth';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import FetchUserSelections from './Layout/FetchUserSelections/FetchUserSelections';

(async () => {
    const isAuthenticated = await userAuth();

    if(!isAuthenticated) window.location.reload();

    if(getUserRoles() === 'admin') {
        localStorage.setItem("role", 'admin');
    } else {
        localStorage.setItem("role", 'user');
    }

    localStorage.setItem("react-token", getAccessToken());
    localStorage.setItem("react-refresh-token", await getRefreshToken());

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
})();