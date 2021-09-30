import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '@common/context/user-context.common';
import { getToken } from '@common/auth/auth.common';
import { nameToInitials } from '@common/util/initials.common';

interface IProject {
    name: string;
    code: string;
    description: string;
    image: string;
    type: IType;
    users: IUser[];
    responsible: IUser;
}

interface IType {
    name: string;
    description: string;
}

interface IUser {
    email: string;
    name: string;
    icon?: string;
}

const Home = (): JSX.Element => {
    const { email } = useUser();

    const [projects, setProjects] = useState<IProject[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await (
                await fetch(`${process.env.API_URL}/projects/find-user/${email}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json'
                    }
                })
            ).json();
            if (result.length > 0) setProjects(result);
        };

        fetchData();
    }, []);

    return (
        <>
            {!projects.length && !email ? (
                <div className="container mx-auto px-4 sm:px-8">
                    <span>
                        No tienes ningún proyecto asociado{' '}
                        <Link to="/project/new" className="ml-1 text-indigo-700">
                            Crea un proyecto
                        </Link>
                    </span>
                </div>
            ) : (
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div>
                            <h2 className="text-2xl font-semibold leading-tight">Proyectos</h2>
                        </div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal bg-white">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Tipo
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Descripcion
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Responsable
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map((project, index) => (
                                            <tr key={index} className="border-b border-gray-200">
                                                <td className="px-5 py-5 bg-white text-sm">
                                                    <div className="flex items-center">
                                                        {project.image ? (
                                                            <img
                                                                className="m-1 w-10 h-10 relative flex justify-center items-center rounded"
                                                                src={project.image}
                                                            />
                                                        ) : (
                                                            <div
                                                                className="m-1 w-10 h-10 relative flex justify-center items-center rounded bg-indigo-700 text-xl text-white uppercase"
                                                                key={index}
                                                            >
                                                                {nameToInitials(project.name)}
                                                            </div>
                                                        )}
                                                        <Link
                                                            to={`/project/view/${project.code}`}
                                                            className="ml-1 font-bold text-indigo-700 whitespace-no-wrap cursor-pointer hover:underline hover:text-indigo-700 hover:italic"
                                                        >
                                                            {project.name}
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 bg-white text-sm">
                                                    <p className="text-gray-600 whitespace-no-wrap">{project.type.name}</p>
                                                </td>
                                                <td className="px-5 py-5 bg-white text-sm">
                                                    <p className="text-gray-600 whitespace-no-wrap">{project.description}</p>
                                                </td>
                                                <td className="px-5 py-5 bg-white text-sm flex items-center">
                                                    <div
                                                        className="m-1 w-8 h-8 relative flex justify-center items-center rounded-full bg-indigo-700 text-xl text-white uppercase"
                                                        key={index}
                                                    >
                                                        {project.responsible.icon
                                                            ? project.responsible.icon
                                                            : nameToInitials(project.responsible.name)}
                                                    </div>
                                                    <span className="ml-1 text-indigo-700 whitespace-no-wrap cursor-pointer hover:underline hover:text-indigo-700">
                                                        {project.responsible.name}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
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
