import React from 'react';
import ReactDOM from 'react-dom';

import { UserProvider } from '@common/context/user-context.common';
import App from './app';

import './styles/index.css';

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
