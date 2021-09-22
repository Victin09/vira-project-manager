import { getToken } from '@common/auth/auth.common';
import { nameToInitials } from '@common/util/initials.common';
import React, { useEffect, useState } from 'react';
import Select, { OptionsType } from 'react-select';

interface ISearch {
    value: string;
    label: JSX.Element;
}

interface IUserSearch {
    fnc: (data: string[]) => void;
}

const UserSearch = ({ fnc }: IUserSearch): JSX.Element => {
    const [users, setUsers] = useState([]);

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
                        value: element.username,
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
                                    <span className="font-bold">{element.name}</span>
                                    <span className="font-thin">{element.username}</span>
                                </div>
                            </div>
                        )
                    };
                    data.push(user);
                });
                setUsers(data);
            }
        };

        fetchData();
    }, []);

    const onChange = (e: OptionsType<ISearch>) => {
        const data: string[] = [];
        e.forEach((item) => {
            data.push(item.value);
        });
        fnc(data);
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
        <Select
            isMulti
            styles={customStyles}
            name="users"
            options={users}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Selecciona..."
            onChange={(e) => onChange(e)}
        />
    );
};

export default UserSearch;
