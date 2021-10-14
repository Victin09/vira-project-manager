import React, { useState, useEffect } from 'react';

import { getToken } from '@common/auth/auth.common';
import ProjectTypeSearch from '@components/search/type-search.component';

interface IProjectDetails {
    projectCode: string;
}

const ProjectAccess = ({ projectCode }: IProjectDetails): JSX.Element => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');

    const [editName, setEditName] = useState(false);
    const [editDescription, setEditDescription] = useState(false);
    const [editType, setEditType] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await (
                await fetch(`${process.env.API_URL}/projects/find/${projectCode}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json'
                    }
                })
            ).json();
            console.log('result', result);
            if (result.name) {
                setName(result.name);
                setDescription(result.description);
                setType(result.type.name);
            }
        };

        fetchData();
    }, []);

    const handleName = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            console.log('name', name);
        }
    };

    const handleDescription = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            console.log('description', description);
        }
    };

    const handleType = (type: string) => {
        console.log('type', type);
    };

    return (
        <>
            {name && (
                <div className="h-full w-full flex justify-center items-center">
                    <form className="w-full h-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Nombre
                            </label>
                            {!editName ? (
                                <span className="italic w-full" onClick={() => setEditName(true)}>
                                    {name}
                                </span>
                            ) : (
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={handleName}
                                />
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Descripcion
                            </label>
                            {!editDescription ? (
                                <span className="italic w-full" onClick={() => setEditDescription(true)}>
                                    {description}
                                </span>
                            ) : (
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    onKeyDown={handleDescription}
                                />
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Tipo
                            </label>
                            {!editType ? (
                                <span className="italic w-full" onClick={() => setEditType(true)}>
                                    {type}
                                </span>
                            ) : (
                                <ProjectTypeSearch fnc={handleType} />
                            )}
                        </div>
                        {/* <div className="flex items-center justify-between">
                            <button
                            className="bg-indigo-700 hover:bg-indigo-800 text-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => login()}
                            >
                            Registrase
                            </button>
                            <span className="ml-4  font-bold text-xs text-gray-700 text-xs">
                            ¿Ya tienes cuenta?
                            <Link to="/login" className="inline-block align-baseline font-bold text-xs text-indigo-700">
                            Inicia sesión
                            </Link>
                            </span>
                        </div> */}
                    </form>
                    {/* <p className="text-center text-gray-500 text-xs">&copy;2021 Vira. All rights reserved.</p> */}
                </div>
            )}
        </>
    );
};

export default ProjectAccess;
