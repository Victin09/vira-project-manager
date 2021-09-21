import { getToken } from '@common/auth/auth.common';
import React, { useEffect, useState } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
    ResponderProvided,
    DraggableProvided,
    DroppableProvided,
    DraggableStateSnapshot
} from 'react-beautiful-dnd';
import { IoReorderFourOutline } from 'react-icons/io5';

interface IBacklog {
    projectCode: string;
}

export const Backlog: React.FC<IBacklog> = ({ projectCode }: IBacklog) => {
    const [localItems, setLocalItems] = useState([]);

    useEffect(() => {
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
            console.log('backlog_data', result);
        };

        fetchData();
    }, []);

    // normally one would commit/save any order changes via an api call here...
    const handleDragEnd = (result: DropResult, provided?: ResponderProvided) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        setLocalItems((prev: any) => {
            const temp = [...prev];
            const d = temp[result.destination!.index];
            temp[result.destination!.index] = temp[result.source.index];
            temp[result.source.index] = d;

            return temp;
        });
    };

    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable" direction="vertical">
                    {(droppableProvided: DroppableProvided) => (
                        <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                            {localItems.map((item: any, index: number) => (
                                <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
                                    {(draggableProvided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                                        return (
                                            <div
                                                ref={draggableProvided.innerRef}
                                                {...draggableProvided.draggableProps}
                                                style={{
                                                    ...draggableProvided.draggableProps.style,
                                                    background: snapshot.isDragging ? 'rgba(245,245,245, 0.75)' : 'none'
                                                }}
                                            >
                                                {/* note: `snapshot.isDragging` is useful to style or modify behaviour of dragged cells */}
                                                <div>
                                                    <div {...draggableProvided.dragHandleProps}>
                                                        <IoReorderFourOutline />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }}
                                </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Backlog;
