import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select, { MultiValue } from 'react-select';

import { nameToInitials } from '@common/util/initials.common';
import { getToken } from '@common/auth/auth.common';
import { ITheme, useTheme } from '@common/context/theme-context.common';

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

const UserImage = styled.div<{ ct: ITheme }>`
    width: 2em;
    height: 2em;
    border-radius: 25%;
    font-size: 0.75em;
    color: ${(props) => props.ct.schema.button.text};
    font-weight: bold;
    line-height: 2em;
    text-align: center;
    background: ${(props) => props.ct.schema.button.background};  
    margin-right: .5em;

    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const NameLabel = styled.span<{ ct: ITheme }>`
    font-weight: bold;
`;

const UsernameLabel = styled.span<{ ct: ITheme }>`
    font-weight: 100;
    opacity: 0.5;
`;

const UserSearch = ({ fnc, fncSingle, isMultiple, fromProject, fromIssue, issueCode }: IUserSearch): JSX.Element => {
    const { theme } = useTheme();

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
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                                {element.icon ? (
                                    <img className="m-1 w-6 h-6 relative flex justify-center items-center rounded-full" src={element.icon} />
                                ) : (
                                    <UserImage ct={theme}>
                                        {nameToInitials(element.name)}
                                    </UserImage>
                                )}{' '}
                                <div style={{ display: 'flex', flexDirection: 'column'}}>
                                    <NameLabel ct={theme}>{element.name}</NameLabel>
                                    <UsernameLabel ct={theme}>{element.username}</UsernameLabel>
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
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                    {element.icon ? (
                                        <img className="m-1 w-6 h-6 relative flex justify-center items-center rounded-full" src={element.icon} />
                                    ) : (
                                        <UserImage ct={theme}>
                                            {nameToInitials(element.name)}
                                        </UserImage>
                                    )}{' '}
                                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                                        <NameLabel ct={theme}>{element.name}</NameLabel>
                                        <UsernameLabel ct={theme}>{element.username}</UsernameLabel>
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

    const onChange = (e: MultiValue<ISearch>) => {
        const data: string[] = [];
        if (!e.length) {
            setSelectedUsers([])
        } else {
            e.forEach((item: any) => {
                data.push(item.value);
                setSelectedUsers(old => [...old, item])
            });
        }
        fnc(data);
        setReload(!reload);
    };

    const onChangeSingle = (e: ISearch) => {
        fncSingle(e.value);
    };

    const customStyles = {
        option: (styles: any, state: any) => ({
            ...styles,
            cursor: 'pointer',
            background: theme.schema.input.background,
            color: theme.schema.input.color,

            "&:hover": {
                background: theme.schema.colors.secondary,
                color: theme.schema.text.hover,
            }
        }),
        menuList: (styles: any, _state: any) => ({
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
        multiValue: (styles: any) => ({
            ...styles,
            backgroundColor: theme.schema.colors.secondary
        }),
        multiValueLabel: (styles: any) => ({
            ...styles,
            color: theme.schema.text.color,
        }),
        multiValueRemove: (styles: any) => ({
            ...styles,
            color: theme.schema.text.color,
            ':hover': {
                color: theme.schema.text.hover,
            }
        }),
        container: (styles: any) => ({
            ...styles,
            width: '100%'
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
