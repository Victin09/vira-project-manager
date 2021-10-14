import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { getToken } from '@common/auth/auth.common';
import { useTheme } from '@common/context/theme-context.common';

interface ISearch {
    value: string;
    label: JSX.Element;
}

interface IListSearch {
    fnc: (data: string) => void;
    project: string;
    issue: any;
}

const ListSearch = ({ fnc, project, issue }: IListSearch): JSX.Element => {
    const { theme } = useTheme();

    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState<ISearch>();
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await (
                await fetch(`${process.env.API_URL}/lists/project/${project}`, {
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
                        value: element.code,
                        label: element.name
                    };
                    data.push(type);
                });
                setLists(data);

                const selected: ISearch = {
                    value: issue.code,
                    label: issue.name
                };

                setSelectedList(selected);
            }
        };

        fetchData();
    }, [reload]);

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

    const handleChange = async (newValue: any, _actionMeta: any) => {
        fnc(newValue.value);
        setReload(!reload);
    };

    return <Select value={selectedList} styles={customStyles} onChange={handleChange} options={lists} />
};

export default ListSearch;
