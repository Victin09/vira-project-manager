import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

import { getToken } from '@common/auth/auth.common';
import { useTheme } from '@common/context/theme-context.common';
interface ISearch {
    value: string;
    label: JSX.Element;
}

interface IProjectTypeSearch {
    fnc: (data: string) => void;
}

const ProjectTypeSearch = ({ fnc }: IProjectTypeSearch): JSX.Element => {
    const { theme } = useTheme();

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
        option: (styles: any, _state: any) => ({
            ...styles,
            cursor: 'pointer',
            background: theme.schema.input.background,
            color: theme.schema.input.color,
            "&:hover": {
                background: theme.schema.colors.secondary,
                color: theme.schema.text.hover,
            }
        }),
        menuList: (_styles: any, _state: any) => ({
            background: theme.schema.input.background,
            borderRadius: theme.schema.general.borderRadius
        }),
        control: (styles: any) => ({
            ...styles,
            background: theme.schema.input.background,
            color: theme.schema.input.color,
            cursor: 'pointer',
            boxShadow: 'none'
        }),
        container: (styles: any) => ({
            ...styles,
            width: '100%'
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
        fnc(newValue.value);
    };

    return <CreatableSelect isClearable styles={customStyles} onChange={handleChange} placeholder="Seleciona..." options={projectTypes} />;
};

export default ProjectTypeSearch;
