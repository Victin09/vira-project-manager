import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Navbar from '@components/navbar/navbar.component';
import { IRoute, routes } from '@common/routes/routes.common';
import PrivateRoute from '@common/auth/private-router.common';
import { UserProvider } from '@common/context/user-context.common';
import { CookiesProvider } from 'react-cookie';

const App = (): JSX.Element => {
    return (
        <CookiesProvider>
            <UserProvider>
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
            </UserProvider>
        </CookiesProvider>
    );
};

export default App;
