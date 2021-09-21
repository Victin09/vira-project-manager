/* eslint-disable indent */
import React, { useEffect, useState } from 'react';

import { getToken } from '@common/auth/auth.common';

interface ISearch {
    type: 'type' | 'users';
}

interface IElement {
    name: string;
}

const Search = ({ type }: ISearch): JSX.Element => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState<IElement[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            switch (type) {
                case 'type':
                    const result = await (
                        await fetch(`${process.env.API_URL}/project-types`, {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                                'Content-Type': 'application/json'
                            }
                        })
                    ).json();
                    console.log('types', result);
                    break;
                default:
                    break;
            }
        };

        fetchData();
    }, []);

    const search = (value: string) => {
        setQuery(value);
    };

    return (
        <div className="w-full relative rounded overflow-hidden shadow-xs">
            <div className="rounded my-2 relative pin-t pin-l">
                <ul className="list-reset">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => search(e.target.value)}
                    />
                    <br />
                    {query && (
                        <>
                            {data.map((element, index) => (
                                <li key={index}>
                                    <p className="p-2 block text-black hover:bg-indigo-700 hover:text-white cursor-pointer">{element.name}</p>
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Search;
