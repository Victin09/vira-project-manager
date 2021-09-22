import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { OptionsType } from 'react-select';

import { getToken } from '@common/auth/auth.common';
import { nameToInitials } from '@common/util/initials.common';
interface ISearch {
    value: string;
    label: JSX.Element;
}

interface IProjectTypeSearch {
    fnc: (data: string) => void;
}

const ProjectTypeSearch = ({ fnc }: IProjectTypeSearch): JSX.Element => {
    const [projectTypes, setProjectTypes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await (
                await fetch(`${process.env.API_URL}/project-types`, {
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
                    const type: ISearch = {
                        value: element.name,
                        label: (
                            <div className="flex">
                                <span className="font-bold">{element.name}</span>
                                <span className="font-thin">{element.description}</span>
                            </div>
                        )
                    };
                    data.push(type);
                });
                setProjectTypes(data);
            }
        };

        fetchData();
    }, []);

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

    const handleChange = async (newValue: any, actionMeta: any) => {
        if (actionMeta.action === 'create-option') {
            const result = await (
                await fetch(`${process.env.API_URL}/project-types`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getToken()}`
                    },
                    body: JSON.stringify({
                        name: newValue.value,
                        description: ''
                    })
                })
            ).json();
            console.log('result', result);
            if (result.name) {
                const type: ISearch = {
                    value: result.name,
                    label: (
                        <div className="flex items-center">
                            <span className="font-bold">{result.name}</span>
                            <span className="font-thin">{result.description}</span>
                        </div>
                    )
                };
                setProjectTypes((oldArray) => [...oldArray, type]);
            }
        }
        fnc(newValue);
    };

    return <CreatableSelect isClearable styles={customStyles} onChange={handleChange} placeholder="Seleciona..." options={projectTypes} />;
};

export default ProjectTypeSearch;
