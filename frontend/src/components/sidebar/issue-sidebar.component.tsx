import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import useOnClickOutside from '@common/hooks/click-outside.hook';
import UserSearch from '@components/search/users-search.component';
import { getToken } from '@common/auth/auth.common';
import { ITheme, useTheme } from '@common/context/theme-context.common';
import ListSearch from '@components/search/list-search.component';

interface IIssueSidebar {
    display: boolean;
    setDisplay: (show: boolean) => void;
    item: any;
    projectCode: string;
}

const SidebarContainer = styled.div<{ ct: ITheme }>`
    border-left: ${(props) => props.ct.schema.general.border};
    background-color: ${(props) => props.ct.schema.colors.secondary};
    min-width: 20em;
    width: 20em;
    padding: 1em;
    display: flex;
    flex-direction: column;
`;

const SidebarHeader = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
`;

const SidebarSeparator = styled.hr`
    width: 100%;
    margin-top: 2em;
    margin-bottom: 2em;
    opacity: 0.25;
`;

const SidebarBody = styled.div<{ ct: ITheme }>`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const IssueName = styled.span<{ ct: ITheme }>`
    font-weight: bolder;
    font-size: 2em;
    color: ${(props) => props.ct.schema.text.color};
`;

const IssueDescription = styled.span<{ ct: ITheme }>`
    word-break: break-all;
    color: ${(props) => props.ct.schema.text.color};
    font-style: italic;
    opacity: .75;
`;

const SidebarBodyBlock = styled.div`
    margin-top: 1.75em;
    display: flex;
    flex-direction: column;
`;

const SidebarBodyTitle = styled.span<{ ct: ITheme }>`
    font-weight: bolder;
    font-size: 1.15em;
    color: ${(props) => props.ct.schema.text.color};
    margin-bottom: .5em;
`;

const Textarea = styled.textarea<{ ct: ITheme }>`
    background: ${(props) => props.ct.schema.input.background};
    box-shadow: ${(props) => props.ct.schema.input.shadow};
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    width: 100%;
    height: ${(props) => props.ct.schema.input.height};
    border: ${(props) => props.ct.schema.input.border};
    outline: none;
    color: ${(props) => props.ct.schema.input.color};
    box-sizing: border-box;
    min-height: 5em;

    &:focus {
        display: inline-block;
        backdrop-filter: blur(12rem);
        border: ${(props) => props.ct.schema.input.focus};
    }
    &::placeholder {
        color: #b9abe099;
        font-weight: 100;
        font-size: 1rem;
    }
`;

const Button = styled.button<{ ct: ITheme }>`
    background: ${(props) => props.ct.schema.button.background};
    padding: .75em;
    border: none;
    color: ${(props) => props.ct.schema.button.text};
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    cursor: pointer;
    font-weight: bold;
`;

const IssueSidebar = ({ display, setDisplay, item, projectCode }: IIssueSidebar): JSX.Element => {
    const ref = useRef(null);
    const { theme } = useTheme();

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

    const handleStatus = async (element: string) => {
        await (
            await fetch(`${process.env.API_URL}/issues/list`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: item.code, list: element, lastList: item.list.code })
            })
        ).json();
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
                <SidebarContainer
                    ref={ref}
                    ct={theme}
                    data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
                >
                    <SidebarHeader>
                        <IssueName ct={theme}>{item.title}</IssueName>
                        <SidebarSeparator />
                    </SidebarHeader>
                    <SidebarBody ct={theme}>
                        <SidebarBodyBlock>
                            <SidebarBodyTitle ct={theme}>Descripcion</SidebarBodyTitle>
                            {!editDescription ? (
                                <IssueDescription ct={theme} onClick={() => setEditDescription(true)}>
                                    {item.description ? (
                                        item.description
                                    ) : (
                                        <span className="font-thin italic p-1 opacity-50">No hay una descripcion</span>
                                    )}
                                </IssueDescription>
                            ) : (
                                <div className="flex flex-col">
                                    <Textarea
                                        ct={theme}
                                        defaultValue={item.description}
                                        style={{ resize: 'none' }}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <Button
                                        ct={theme}
                                        onClick={() => handleDescription()}
                                    >
                                        Guardar
                                    </Button>
                                </div>
                            )}
                        </SidebarBodyBlock>
                        <SidebarBodyBlock>
                            <SidebarBodyTitle ct={theme}>Estado</SidebarBodyTitle>
                            <ListSearch fnc={handleStatus} project={projectCode} issue={item.list} />
                        </SidebarBodyBlock>
                        <SidebarBodyBlock>
                            <SidebarBodyTitle ct={theme}>Usuarios</SidebarBodyTitle>
                            <UserSearch fnc={handleUsers} isMultiple fromIssue issueCode={item.code} />
                        </SidebarBodyBlock>
                    </SidebarBody>
                </SidebarContainer>
            )}
        </>
    );
};

export default IssueSidebar;
