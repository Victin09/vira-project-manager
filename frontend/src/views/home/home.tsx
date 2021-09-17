import React, {
    useEffect,
    useState
} from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '@common/context/user-context.common';
import { getToken } from '@common/auth/auth.common';
import { nameToInitials } from '@common/util/initials.common';
import { Tooltip } from '@components/tooltip/tooltip.component';

interface IProject {
    image: string;
    name: string;
    description: string;
    users: IUser[];
}

interface IUser {
    email: string;
    name: string;
    icon?: string;
}

const Home = (): JSX.Element => {
    const { email } = useUser();

    const [projects, setProjects] = useState<
        IProject[]
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log('email', email);
            const result = await (
                await fetch(
                    `http://localhost:3000/projects/find-user/vge3@vge.es`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                            'Content-Type':
                                'application/json'
                        }
                    }
                )
            ).json();
            console.log('result', result);
            if (result) setProjects(result);
        };

        fetchData();
    }, []);

    return (
        <>
            {projects.length === 0 ? (
                <span></span>
            ) : (
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div>
                            <h2 className="text-2xl font-semibold leading-tight">
                                Projectos
                            </h2>
                        </div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Código
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Descripcion
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Usuarios
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map(
                                            (
                                                project,
                                                index
                                            ) => (
                                                <tr
                                                    key={
                                                        index
                                                    }
                                                    className="border-b border-gray-200"
                                                >
                                                    <td className="px-5 py-5 bg-white text-sm">
                                                        <div className="flex items-center">
                                                            <div
                                                                className="m-1 w-10 h-10 relative flex justify-center items-center rounded bg-indigo-700 text-xl text-white uppercase"
                                                                key={
                                                                    index
                                                                }
                                                            >
                                                                {project.image
                                                                    ? project.image
                                                                    : nameToInitials(
                                                                        project.name
                                                                    )}
                                                            </div>
                                                            <Link
                                                                to={`/project/${project.name}`}
                                                                className="ml-1 font-bold text-gray-700 whitespace-no-wrap cursor-pointer hover:underline hover:text-indigo-700"
                                                            >
                                                                {
                                                                    project.name
                                                                }
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 bg-white text-sm">
                                                        <p className="text-gray-600 whitespace-no-wrap">
                                                            USD
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 bg-white text-sm">
                                                        <p className="text-gray-600 whitespace-no-wrap">
                                                            {
                                                                project.description
                                                            }
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 bg-white text-sm flex">
                                                        {project.users.map(
                                                            (
                                                                user,
                                                                index
                                                            ) => (
                                                                <Tooltip
                                                                    message={
                                                                        user.name
                                                                    }
                                                                    position="top"
                                                                    key={
                                                                        index
                                                                    }
                                                                >
                                                                    <div
                                                                        className="m-1 w-10 h-10 relative flex justify-center items-center rounded-full bg-indigo-700 text-xl text-white uppercase"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {user.icon
                                                                            ? user.icon
                                                                            : nameToInitials(
                                                                                user.name
                                                                            )}
                                                                    </div>
                                                                </Tooltip>
                                                            )
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
