import Home from '@views/home/home';
import Login from '@views/login/login.view';
import Register from '@views/register/register.view';
import Project from '@views/project/project.view';
import CreateProject from '@views/project/create-project.view';
import Landing from '@views/landing/landing.view';

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
        path: '/project/view/:projectCode',
        private: true
    },
    {
        component: CreateProject,
        exact: true,
        path: '/project/new',
        private: true
    },
    {
        component: Landing,
        exact: true,
        path: '/landing',
        private: false
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
