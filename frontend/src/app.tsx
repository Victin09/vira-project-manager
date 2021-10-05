import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from 'styled-components';

import Navbar from '@components/navbar/navbar.component';
import { IRoute, routes } from '@common/routes/routes.common';
import PrivateRoute from '@common/auth/private-router.common';
import { UserProvider } from '@common/context/user-context.common';
import { useTheme } from '@common/hooks/theme.hook';

const App = (): JSX.Element => {
    const { theme, themeLoaded } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);

    useEffect(() => {
        setSelectedTheme(theme);
    }, [themeLoaded]);

    return (
        <CookiesProvider>
            <UserProvider>
                <ThemeProvider theme={selectedTheme}>
                    <div className="flex flex-col h-screen">
                        <Router>
                            <Navbar />

                            <div className="flex-grow">
                                <Route path="/" exact>
                                    <Redirect to="/project" />
                                </Route>
                                {routes.map((route: IRoute, index) => {
                                    if (route.private) return <PrivateRoute key={index} {...route} />;
                                    else return <Route key={index} {...route} />;
                                })}
                            </div>
                        </Router>
                    </div>
                </ThemeProvider>
            </UserProvider>
        </CookiesProvider>
    );
};

export default App;
