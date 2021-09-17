import React from 'react';
import { useCookies } from 'react-cookie';
import {
    Redirect,
    Route
} from 'react-router-dom';

import { isAuthenticated } from './auth.common';

interface IPrivateRoute {
    component: React.FC;
    path?: string;
    exact?: boolean;
}

const PrivateRoute = ({
    path,
    exact,
    component
}: IPrivateRoute): JSX.Element => {
    const [cookies] = useCookies(['vpm-um']);

    const getCookies = (): boolean => {
        console.log('cookies', cookies['vpm-um']);
        return cookies['vpm-um'];
    };

    return getCookies() && isAuthenticated() ? (
        <Route
            path={path}
            exact={exact}
            component={component}
        />
    ) : (
        <Redirect to="/login" />
    );
};

PrivateRoute.defaultProps = {
    path: '',
    exact: true
};

export default PrivateRoute;
