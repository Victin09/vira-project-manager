import { getToken } from '@common/auth/auth.common';
import { nameToInitials } from '@common/util/initials.common';
import React, { useEffect, useState } from 'react';
import Select, { OptionsType } from 'react-select';

interface ISearch {
    value: string;
    label: JSX.Element;
}

interface IUserSearch {
    fnc?: (data: string[]) => void;
    fncSingle?: (data: string) => void;
    isMultiple: boolean;
    fromProject?: boolean;
    fromIssue?: boolean;
    issueCode?: string;
}

const UserSearch = ({ fnc, fncSingle, isMultiple, fromProject, fromIssue, issueCode }: IUserSearch): JSX.Element => {
    const [reload, setReload] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await (
                await fetch(`${process.env.API_URL}/users`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json'
                    }
                })
            ).json();

            if (result) {
                const data: ISearch[] = [];
                result.forEach((element: any) => {
                    const user: ISearch = {
                        value: element.email,
                        label: (
                            <div className="flex items-center">
                                {element.icon ? (
                                    <img className="m-1 w-6 h-6 relative flex justify-center items-center rounded-full" src={element.icon} />
                                ) : (
                                    <div className="m-1 w-6 h-6 relative flex justify-center items-center rounded-full bg-indigo-700 text-xs text-white uppercase">
                                        {nameToInitials(element.name)}
                                    </div>
                                )}{' '}
                                <div className="flex flex-col ml-2">
                                    {/* <span className="font-bold">{element.name}</span> */}
                                    <span className="font-thin">{element.username}</span>
                                </div>
                            </div>
                        )
                    };
                    data.push(user);
                });
                setUsers(data);

                if (fromIssue) {
                    const result = await (
                        await fetch(`${process.env.API_URL}/issues/${issueCode}`, {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                                'Content-Type': 'application/json'
                            }
                        })
                    ).json();
                    const data: ISearch[] = [];
                    result.users.forEach((element: any) => {
                        const user: ISearch = {
                            value: element.email,
                            label: (
                                <div className="flex items-center">
                                    {element.icon ? (
                                        <img className="m-1 w-6 h-6 relative flex justify-center items-center rounded-full" src={element.icon} />
                                    ) : (
                                        <div className="m-1 w-6 h-6 relative flex justify-center items-center rounded-full bg-indigo-700 text-xs text-white uppercase">
                                            {nameToInitials(element.name)}
                                        </div>
                                    )}{' '}
                                    <div className="flex flex-col ml-2">
                                        {/* <span className="font-bold">{element.name}</span> */}
                                        <span className="font-thin">{element.username}</span>
                                    </div>
                                </div>
                            )
                        };
                        data.push(user);
                    });
                    setSelectedUsers(data);
                }
            }
        };

        fetchData();
    }, [reload]);

    const onChange = (e: OptionsType<ISearch>) => {
        const data: string[] = [];
        e.forEach((item) => {
            data.push(item.value);
        });
        fnc(data);
        setReload(!reload);
    };

    const onChangeSingle = (e: ISearch) => {
        fncSingle(e.value);
    };

    const customStyles = {
        option: (styles: any, state: any) => ({
            ...styles,
            cursor: 'pointer'
        }),
        control: (styles: any) => ({
            ...styles,
            cursor: 'pointer'
        })
    };

    return (
        <>
            {isMultiple ? (
                <Select
                    value={selectedUsers}
                    isMulti
                    styles={customStyles}
                    options={users}
                    placeholder="Selecciona..."
                    onChange={(e) => onChange(e)}
                />
            ) : (
                <Select defaultValue={selectedUsers} options={users} onChange={(e) => onChangeSingle(e)} />
            )}
        </>
    );
};

export default UserSearch;
