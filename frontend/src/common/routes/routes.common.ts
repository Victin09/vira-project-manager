import Home from '@views/home/home';
import Login from '@views/login/login.view';
import Register from '@views/register/register.view';
import Project from '@views/project/project.view';

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
        component: Project,
        exact: true,
        path: '/project/:projectCode',
        private: true
    },
    {
        component: Login,
        exact: true,
        path: '/login',
        private: false
    },
    {
        component: Register,
        exact: true,
        path: '/register',
        private: false
    }
];
