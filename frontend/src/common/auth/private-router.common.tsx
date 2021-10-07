import { useUser } from '@common/context/user-context.common';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isAuthenticated } from './auth.common';

interface IPrivateRoute {
    component: React.FC;
    path?: string;
    exact?: boolean;
}

const PrivateRoute = ({ path, exact, component }: IPrivateRoute): JSX.Element => {
    const user = useUser();

    return user.email && isAuthenticated() ? <Route path={path} exact={exact} component={component} /> : <Redirect to="/landing" />;
};

PrivateRoute.defaultProps = {
    path: '',
    exact: true
};

export default PrivateRoute;
