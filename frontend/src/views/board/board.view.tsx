import { getToken } from '@common/auth/auth.common';
import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Column from '../../components/board/column.component';

interface IDocument {
    [key: string]: {
        id: string;
        title: string;
        list: any[];
    };
}

interface IBoard {
    projectCode: string;
}

const Board = ({ projectCode }: IBoard): JSX.Element => {
    const [columns, setColumns] = useState<IDocument>();

    useEffect(() => {
        const initialColumns: IDocument = {
            open: {
                id: 'open',
                title: 'Abierto',
                list: []
            },
            doing: {
                id: 'doing',
                title: 'En proceso',
                list: []
            },
            done: {
                id: 'done',
                title: 'Terminado',
                list: []
            }
        };
        const fetchData = async () => {
            const result = await (
                await fetch(`${process.env.API_URL}/issues/project/${projectCode}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json'
                    }
                })
            ).json();
            if (result.length) {
                result.map((item: any, index: number) => {
                    if (!item.list) {
                        initialColumns.open.list.push(item);
                    }
                });
                setColumns(initialColumns);
            }
        };

        fetchData();
    }, []);

    const onDragEnd = ({ source, destination }: DropResult): any => {
        // Make sure we have a valid destination
        if (destination === undefined || destination === null) return null;

        // Make sure we're actually moving the item
        if (source.droppableId === destination.droppableId && destination.index === source.index) return null;

        // Set start and end variables
        const start = columns[source.droppableId];
        const end = columns[destination.droppableId];

        // If start is the same as end, we're in the same column
        if (start === end) {
            // Move the item within the list
            // Start by making a new list without the dragged item
            const newList = start.list.filter((_: any, idx: number) => idx !== source.index);

            // Then insert the item at the right location
            newList.splice(destination.index, 0, start.list[source.index]);

            // Then create a new copy of the column object
            const newCol = {
                id: start.id,
                title: start.title,
                list: newList
            };

            // Update the state
            setColumns((state) => ({ ...state, [newCol.id]: newCol }));
            return null;
        } else {
            // If start is different from end, we need to update multiple columns
            // Filter the start list like before
            const newStartList = start.list.filter((_: any, idx: number) => idx !== source.index);

            // Create a new start column
            const newStartCol = {
                id: start.id,
                title: start.title,
                list: newStartList
            };

            // Make a new end list array
            const newEndList = end.list;

            // Insert the item into the end list
            newEndList.splice(destination.index, 0, start.list[source.index]);

            // Create a new end column
            const newEndCol = {
                id: end.id,
                title: end.title,
                list: newEndList
            };

            // Update the state
            setColumns((state) => ({
                ...state,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol
            }));
            return null;
        }
    };

    return (
        <>
            {columns && (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex">
                        {Object.values(columns).map((col) => (
                            <Column col={col} key={col.id} />
                        ))}
                    </div>
                </DragDropContext>
            )}
        </>
    );
};

export default Board;
