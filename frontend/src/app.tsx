import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Navbar from '@components/navbar/navbar.component';
import {
    IRoute,
    routes
} from '@common/routes/routes.common';
import PrivateRoute from '@common/auth/private-router.common';

export const App = (): JSX.Element => (
    <div className="flex flex-col h-screen bg-gray-100">
        <Router>
            <Navbar />

            <div className="flex-grow">
                {routes.map(
                    (route: IRoute, index) => {
                        if (route.private)
                            return (
                                <PrivateRoute
                                    key={index}
                                    {...route}
                                />
                            );
                        else
                            return (
                                <Route
                                    key={index}
                                    {...route}
                                />
                            );
                    }
                )}
            </div>
        </Router>
    </div>
);

export default App;
