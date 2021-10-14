import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { getToken, isAuthenticated } from '@common/auth/auth.common';
import BoardColumn from '@components/board/column.component';
import { Container } from '@components/ui/container.component';
import { useTheme } from '@common/context/theme-context.common';
import { Column, Row } from '@components/ui/column.component';
import styled from 'styled-components';

interface IIssue {
    code: string;
    order: number;
    title: string;
}

interface IDocument {
    code: string;
    name: string;
    issues: IIssue[];
}

interface IBoard {
    projectCode: string;
}

const DragDropContainer = styled.div`
    margin: 1em;
    display: flex;
`;

const Board = ({ projectCode }: IBoard): JSX.Element => {
    const { theme } = useTheme();

    const [columns, setColumns] = useState<IDocument[]>();

    useEffect(() => {
        const fetchData = async () => {
            const result: IDocument[] = await (
                await fetch(`${process.env.API_URL}/lists/project/${projectCode}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json'
                    }
                })
            ).json();
            if (result.length) {
                console.log('board', result);
                setColumns(result);
            }
        };

        fetchData();
    }, []);

    const reOrder = (list: any[], startIndex: number, endIndex?: number, listCode?: string) => {
        const result = list;
        const [removed] = result.splice(startIndex, 1);
        if (result.length && endIndex !== undefined) {
            result.splice(endIndex, 0, removed);

            result.forEach((item, index) => {
                item.order = index + 1;
                item.list = listCode;
            });
        } else if (result.length) {
            result.forEach((item, index) => {
                item.order = index + 1;
                item.list = listCode;
            });
        }

        return result;
    };

    const onDragEnd = async ({ source, destination }: DropResult): Promise<void> => {
        if (destination === undefined || destination === null) return null;
        if (source.droppableId === destination.droppableId && destination.index === source.index) return null;

        const start = columns.find((obj) => obj.code === source.droppableId);
        const end = columns.find((obj) => obj.code === destination.droppableId);
        if (start === end) {
            const files = reOrder(start.issues, source.index, destination.index, start.code);
            const updated = await (
                await fetch(`${process.env.API_URL}/issues/order`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getToken()}`
                    },
                    body: JSON.stringify(files)
                })
            ).json();
            if (updated) {
                const newCol = {
                    code: start.code,
                    name: start.name,
                    issues: files
                };
                const newColumns = [...columns];
                newColumns[columns.indexOf(start)] = newCol;
                setColumns(newColumns);
            }
        } else {
            const [moved] = start.issues.splice(source.index, 1);
            if (end.issues.length > 0) {
                end.issues.splice(destination.index, 0, moved);
            } else {
                end.issues.push(moved);
            }
            start.issues.forEach((item, index) => {
                item.order = index;
            });
            end.issues.forEach((item, index) => {
                item.order = index;
            });
            const updated = await (
                await fetch(`${process.env.API_URL}/issues/list-order`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getToken()}`
                    },
                    body: JSON.stringify({
                        lists: [
                            {
                                code: start.code,
                                name: start.name,
                                issues: start.issues
                            },
                            {
                                code: end.code,
                                name: end.name,
                                issues: end.issues
                            }
                        ]
                    })
                })
            ).json();
        }
    };

    return (
        <>
            {columns && (
                <DragDropContainer>
                    <DragDropContext onDragEnd={onDragEnd}>
                            {Object.values(columns).map((col) => (
                                <BoardColumn col={col} key={col.code} />
                            ))}
                    </DragDropContext>
                </DragDropContainer>
            )}
        </>
    );
};

export default Board;
