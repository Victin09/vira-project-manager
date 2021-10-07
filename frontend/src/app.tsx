import React, { useEffect, useState } from 'react';
import { I18nProvider } from 'vira-i18n-react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import './styles/index.css';
import es from '@common/i18n/es.json';
import en from '@common/i18n/en.json';

import Navbar from '@components/navbar/navbar.component';
import { IRoute, routes } from '@common/routes/routes.common';
import PrivateRoute from '@common/auth/private-router.common';
import { UserProvider } from '@common/context/user-context.common';
import { ThemeProvider } from '@common/context/theme-context.common';

const App = (): JSX.Element => {
    const [selectedLanguage, setSelectedLanguage] = useState('');

    useEffect(() => {
        const language = localStorage.getItem('language');
        if (!language) {
            setSelectedLanguage('en');
            localStorage.setItem('language', 'en');
        } else {
            setSelectedLanguage(language);
        }
    }, []);

    const locales = [
        {
            language: 'en',
            resources: en
        },
        {
            language: 'es',
            resources: es
        }
    ];

    return (
        <ThemeProvider>
            <I18nProvider language={selectedLanguage} locales={locales}>
                <CookiesProvider>
                    <UserProvider>
                            <Router>
                                <Navbar />
                                <Route path="/" exact>
                                    <Redirect to="/project" />
                                </Route>
                                {routes.map((route: IRoute, index) => {
                                    if (route.private) return <PrivateRoute key={index} {...route} />;
                                    else return <Route key={index} {...route} />;
                                })}
                            </Router>
                    </UserProvider>
                </CookiesProvider>
            </I18nProvider>
        </ThemeProvider>
    );
};

export default App;
