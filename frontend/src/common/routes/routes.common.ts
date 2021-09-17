import Home from '@views/home/home';
import About from '@views/about/about';
import Login from '@views/login/login.view';

export interface IRoute {
    component: React.FC;
    exact?: boolean;
    path: string;
    private: boolean;
}

export const routes: IRoute[] = [
    {
        component: Home,
        exact: true,
        path: '/project',
        private: true
    },
    {
        component: About,
        exact: false,
        path: '/about',
        private: true
    },
    {
        component: Login,
        exact: true,
        path: '/login',
        private: false
    }
];
