import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';

import { UserProvider } from '@common/context/user-context.common';
import App from './app';

import './styles/index.css';

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
