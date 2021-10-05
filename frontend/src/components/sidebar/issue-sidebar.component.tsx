import React, { useEffect, useRef, useState } from 'react';

import useOnClickOutside from '@common/hooks/click-outside.hook';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';
import UserSearch from '@components/user-search/users-search.component';
import { getToken } from '@common/auth/auth.common';

interface IIssueSidebar {
    display: boolean;
    setDisplay: (show: boolean) => void;
    item: any;
    projectCode: string;
}

const IssueSidebar = ({ display, setDisplay, item, projectCode }: IIssueSidebar): JSX.Element => {
    const ref = useRef(null);

    const [editDescription, setEditDescription] = useState(false);
    const [description, setDescription] = useState('');
    const [showStatus, setShowStatus] = useState(false);
    const [status, setStatus] = useState(null);
    const [showUsers, setShowUsers] = useState(false);

    useEffect(() => {
        setDescription('');
        setEditDescription(false);
    }, [item]);

    const loadStatus = async () => {
        if (!status) {
            const result = await (
                await fetch(`${process.env.API_URL}/lists/project/${projectCode}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json'
                    }
                })
            ).json();
            if (result) {
                setStatus(result);
                console.log('status', result);
            }
        }
    };

    const handleDescription = async () => {
        item.description = description;
        await (
            await fetch(`${process.env.API_URL}/issues/update/${item.code}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description: item.description })
            })
        ).json();
        setEditDescription(false);
    };

    const handleStatus = async (element: any) => {
        console.log('status', element);
        const result = await (
            await fetch(`${process.env.API_URL}/issues/list`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: item.code, list: element.code, lastList: item.list.code })
            })
        ).json();
        // if (result) {
        //     item.list = result.list;
        // }
        item.list = element;
        setShowStatus(false);
    };

    const handleUsers = async (users: string[]) => {
        const result = await (
            await fetch(`${process.env.API_URL}/issues/users/${item.code}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(users)
            })
        ).json();
        if (result) {
            item.users = result.users;
        }
    };

    const handleClickOutside = () => {
        setDisplay(false);
    };

    useOnClickOutside(ref, handleClickOutside);

    return (
        <>
            {display && (
                <div
                    ref={ref}
                    className="h-full border-l-2 bg-gray-50 text-gray-600 w-96 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out md:flex md:flex-col md:justify-between overflow-y-auto"
                    data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
                >
                    <div className="flex flex-col space-y-6 h-full min-w-full">
                        <h1 className="text-center font-bold text-xl">{item.title}</h1>
                        <div className="mt-2 p-2">
                            <div>
                                <span className="font-bold">Descripcion</span>
                                {!editDescription ? (
                                    <p className="break-all mt-1 pl-1" onClick={() => setEditDescription(true)}>
                                        {item.description ? (
                                            item.description
                                        ) : (
                                            <span className="font-thin italic p-1 opacity-50">No hay una descripcion</span>
                                        )}
                                    </p>
                                ) : (
                                    <div className="flex flex-col">
                                        <textarea
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            defaultValue={item.description}
                                            style={{ resize: 'none' }}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <button
                                            className="bottom-0 right-0 bg-indigo-700 text-white p-1 mr-1 mb-2 rounded"
                                            onClick={() => handleDescription()}
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="mt-2 flex flex-col">
                                <span className="font-bold">Estado</span>
                                <div className="relative mt-1">
                                    <div className="h-10 bg-gray-300 flex border border-gray-200 rounded items-center">
                                        <div className="px-4 appearance-none outline-none bg-gray-300 text-gray-800 w-full">{item.list.name}</div>
                                        <label
                                            htmlFor="show_more"
                                            className="p-1 cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-600 hover:text-gray-800"
                                            onClick={() => {
                                                setShowStatus(!showStatus);
                                                loadStatus();
                                            }}
                                        >
                                            <span> {showStatus ? <BiChevronDown /> : <BiChevronRight />}</span>
                                        </label>
                                    </div>

                                    {showStatus && status && status.length && (
                                        <div
                                            className="absolute rounded shadow bg-white overflow-hidden flex-col w-full mt-1 border border-gray-200"
                                            style={{ zIndex: 1 }}
                                        >
                                            {status.length ? (
                                                status.map((element: any, index: number) => (
                                                    <div className="relative cursor-pointer group border-t" key={index}>
                                                        <span
                                                            className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100"
                                                            onClick={() => handleStatus(element)}
                                                        >
                                                            {element.name}
                                                        </span>
                                                    </div>
                                                ))
                                            ) : (
                                                <span></span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-2 flex flex-col">
                                <span className="font-bold">Usuarios</span>
                                <div className="relative mt-1">
                                    <UserSearch fnc={handleUsers} isMultiple fromIssue issueCode={item.code} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default IssueSidebar;
