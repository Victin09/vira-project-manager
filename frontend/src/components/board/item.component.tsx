import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiOutlineUser } from 'react-icons/ai';
import styled from 'styled-components';

import { nameToInitials } from '@common/util/initials.common';
import { ITheme, useTheme } from '@common/context/theme-context.common';

interface ItemProps {
    issue: any;
    index: number;
}

const ItemContainer = styled.div<{ ct: ITheme }>`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    align-items: start;
    padding: 1em;
    /* margin-top: 1em; */
    background-color: ${(props) => props.ct.schema.colors.primary};
    color: ${(props) => props.ct.schema.text.color};
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    border: ${(props) => props.ct.schema.general.border};
    cursor: pointer;

    :hover {
        background-color: ${(props) => props.ct.schema.colors.secondary};
    }
`;

const IssueCode = styled.span<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.color};
    font-weight: 800;
    padding-left: .25em;
    padding-right: .25em;
    border-radius: 25%;
    font-size: 1em;
    font-weight: bold;
    line-height: 1.75em;
    text-align: center;
    background: ${(props) => props.ct.schema.colors.secondary};  
`;

const IssueData = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const IssueTitle = styled.span<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.color};
    font-weight: 700;
    margin-top: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const IssueDescription = styled.span<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.color};
    font-weight: 800;
    margin-top: .5em;
    opacity: .5;
    font-style: italic;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const IssueSubData = styled.div<{ ct: ITheme }>`
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
    margin-top: 1em;
`;

const UserImage = styled.div<{ ct: ITheme, assigned: boolean }>`
    width: 1.5em;
    height: 1.5em;
    border-radius: 25%;
    font-size: 1em;
    color: ${(props) => props.assigned ? props.ct.schema.button.text: props.ct.schema.text.color};
    font-weight: bold;
    line-height: 1.75em;
    text-align: center;
    background: ${(props) => props.assigned ? props.ct.schema.button.background : props.ct.schema.colors.secondary};  
    margin-left: .5em;

    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const Item: React.FC<ItemProps> = ({ issue, index }) => {
    const { theme } = useTheme();

    return (
        <Draggable draggableId={issue.code} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {/* <ItemContainer ct={theme}> */}
                        <ItemContainer
                            ct={theme}
                            draggable="true"
                        >
                            {/* <button className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"> */}
                                {/* <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg> */}
                            {/* </button> */}
                            {/* <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
                                {issue.tag}
                            </span> */}
                            <IssueCode ct={theme}>{issue.code}</IssueCode>
                            <IssueData>
                                <IssueTitle ct={theme}>{issue.title}</IssueTitle>
                                <IssueDescription ct={theme}>{issue.description}</IssueDescription>
                            </IssueData>
                            <IssueSubData ct={theme}>
                                {/* <div className="flex items-center">
                                    <svg
                                        className="w-4 h-4 text-gray-300 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="ml-1 leading-none">Dec 12</span>
                                </div>
                                <div className="relative flex items-center ml-4">
                                    <svg
                                        className="relative w-4 h-4 text-gray-300 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="ml-1 leading-none">4</span>
                                </div>
                                <div className="flex items-center ml-4">
                                    <svg
                                        className="w-4 h-4 text-gray-300 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="ml-1 leading-none">1</span>
                                </div> */}
                                {issue.users[0] && (
                                    issue.users[0].icon ? (
                                        <img
                                            className="m-1 w-6 h-6 ml-auto relative flex justify-center items-center rounded-full"
                                            src={issue.users[0].icon}
                                        />
                                    ) : (
                                        <UserImage ct={theme} assigned>
                                            {nameToInitials(issue.users[0].name)}
                                        </UserImage>
                                    )
                                )}
                            </IssueSubData>
                        </ItemContainer>
                    {/* </ItemContainer> */}
                </div>
            )}
        </Draggable>
    );
};

export default Item;
