import React, { useEffect, useState } from 'react';
import { I18nProvider } from 'vira-i18n-react';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import es from '@common/i18n/es.json';
import en from '@common/i18n/en.json';

import Navbar from '@components/navbar/navbar.component';
import { IRoute, routes } from '@common/routes/routes.common';
import PrivateRoute from '@common/auth/private-router.common';
import { UserProvider } from '@common/context/user-context.common';
import { useTheme } from '@common/hooks/theme.hook';

const App = (): JSX.Element => {
    const { theme, themeLoaded } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);
    const [selectedLanguage, setSelectedLanguage] = useState('');

    useEffect(() => {
        setSelectedTheme(theme);
        const language = localStorage.getItem('language');
        if (!language) {
            setSelectedLanguage('en');
            localStorage.setItem('language', 'en');
        } else {
            setSelectedLanguage(language);
        }
    }, [themeLoaded]);

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
        <I18nProvider language={selectedLanguage} locales={locales}>
            <CookiesProvider>
                <UserProvider>
                    <ThemeProvider theme={selectedTheme}>
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
                    </ThemeProvider>
                </UserProvider>
            </CookiesProvider>
        </I18nProvider>
    );
};

export default App;
