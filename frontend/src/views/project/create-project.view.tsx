import React, { useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';

import { useUser } from '@common/context/user-context.common';
import { getToken } from '@common/auth/auth.common';
import { useHistory } from 'react-router';
import UserSearch from '@components/user-search/users-search.component';
import ProjectTypeSearch from '@components/type-search/type-search.component';

const CreateProject = (): JSX.Element => {
    const { email } = useUser();
    const history = useHistory();

    const [projectName, setProjectName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [base64, setBase64] = useState<string>();
    const [type, setType] = useState<string>();
    const [users, setUsers] = useState<string[]>([]);
    const [fileName, setFileName] = useState<string>();

    const [projectNameError, setProjectNameError] = useState(false);
    const [typeError, setTypeError] = useState(false);

    const create = async () => {
        if (!projectName) {
            setProjectNameError(true);
            return;
        }
        if (!type) {
            setTypeError(true);
            return;
        }

        const result = await (
            await fetch(`${process.env.API_URL}/projects/${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    name: projectName,
                    description,
                    image: base64,
                    type,
                    users,
                    responsible: email
                })
            })
        ).json();
        if (result) history.push('/');
    };

    const photoUpload = async (e: any) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        if (reader !== undefined && file !== undefined) {
            reader.onloadend = () => {
                setFileName(file.name);
                setBase64(reader.result.toString());
            };
            reader.readAsDataURL(file);
        }
    };

    const typeSelected = (data: string) => {
        setType(data);
    };

    const usersSelected = (data: string[]) => {
        setUsers(data);
    };

    return (
        <div className="h-full w-full flex justify-center p-3">
            <form className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre del proyecto
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Project one"
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    {projectNameError && <p className="text-red-500 text-xs italic">Por favor escribe un nombre.</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Descripcion del proyecto
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        type="text"
                        placeholder="This is the first project"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Imagen
                    </label>
                    <label className="w-full flex justify-center items-center py-2 px-3 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
                        {!fileName && <FaFileUpload />}
                        <span className="ml-2 mt-2 text-base leading-normal truncate">{fileName ? fileName : 'Selecciona un archivo'}</span>
                        <input id="image" type="file" accept="image/png, image/jpeg" className="hidden" onChange={photoUpload} />
                    </label>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Tipo de proyecto
                    </label>
                    <ProjectTypeSearch fnc={typeSelected} />
                    {typeError && <p className="text-red-500 text-xs italic">Por favor seleccione un tipo.</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Usuarios
                    </label>
                    <UserSearch fnc={usersSelected} />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-indigo-700 hover:bg-indigo-800 text-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => create()}
                    >
                        Crear proyecto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProject;
