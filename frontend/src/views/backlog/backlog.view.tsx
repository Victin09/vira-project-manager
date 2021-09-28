import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided, DroppableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { HiPlusSm } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';

import { getToken } from '@common/auth/auth.common';
import { nameToInitials } from '@common/util/initials.common';

interface IBacklog {
    projectCode: string;
}

export const Backlog: React.FC<IBacklog> = ({ projectCode }: IBacklog) => {
    const [localItems, setLocalItems] = useState([]);
    const [createNew, setCreateNew] = useState(false);
    const [newIssue, setNewIssue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);

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
            if (result.length) {
                setLocalItems(result);
            }
        };

        fetchData();
    }, []);

    const reOrder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        result.forEach((item, index) => {
            item.order = index + 1;
        });

        return result;
    };

    const handleDragEnd = async (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const tmp = [...localItems];
        const files = reOrder(localItems, result.source.index, result.destination.index);
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
        setLocalItems(files);
        if (!updated) {
            setLocalItems(tmp);
        }
    };

    const handleNewIssue = async () => {
        const result = await (
            await fetch(`${process.env.API_URL}/issues`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    title: newIssue,
                    project: projectCode
                })
            })
        ).json();
        if (result.title) {
            setLocalItems((oldArray) => [...oldArray, result]);
            setCreateNew(false);
        }
    };

    return (
        <div className="container bg-white mx-auto">
            <div className="inline-block min-w-full rounded-lg overflow-hidden p-4">
                <div className="flex">
                    <span className="text-md font-bold">
                        Backlog{' '}
                        <span className="w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                            {localItems.length} tareas en total
                        </span>
                    </span>
                </div>
                <div className="min-h-full mt-2 rounded">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="droppable" direction="vertical">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="flex flex-col bg-gray-50 p-2 w-64 min-w-full rounded overflow-auto"
                                    style={{ height: '90%', maxHeight: '80vh' }}
                                >
                                    {localItems.length ? (
                                        localItems.map((item: any, index: number) => (
                                            <Draggable draggableId={item.code} index={index} key={item.code}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        onClick={() => console.log('item', item)}
                                                    >
                                                        <div
                                                            className="flex items-start p-2 mt-2 bg-white rounded-lg cursor-pointer group hover:bg-gray-100 border"
                                                            draggable="true"
                                                        >
                                                            <span className="font-thin mr-1">{item.code} </span>
                                                            {item.title}
                                                            <div className="flex items-center ml-auto cursor-pointer">
                                                                <span
                                                                    className={`inline-flex items-center justify-center px-2 py-1 mr-1 text-xs font-bold leading-none rounded${
                                                                        !item.list ? ' bg-gray-300 text-gray-600' : 'bg-indigo-700'
                                                                    }`}
                                                                >
                                                                    {!item.list ? 'OPEN' : item.list}
                                                                </span>
                                                                <div
                                                                    onClick={() => {
                                                                        setSelectedIssue(item);
                                                                        setShowModal(true);
                                                                    }}
                                                                >
                                                                    {item.users[0] ? (
                                                                        item.users[0].icon ? (
                                                                            <img
                                                                                className="m-1 w-6 h-6 relative flex justify-center items-center rounded-full"
                                                                                src={item.users[0].icon}
                                                                            />
                                                                        ) : (
                                                                            <div className="m-1 w-6 h-6 relative flex justify-center items-center rounded-full bg-indigo-700 text-xs text-white uppercase">
                                                                                {nameToInitials(item.users[0].name)}
                                                                            </div>
                                                                        )
                                                                    ) : (
                                                                        <div className="m-1 w-6 h-6 relative flex justify-center text-gray-600 items-center rounded-full bg-gray-300 text-xs text-white uppercase">
                                                                            <AiOutlineUser />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    ) : (
                                        <span>No hay datos</span>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {/* <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="droppable" direction="vertical">
                            {(droppableProvided: DroppableProvided) => (
                                <div
                                    ref={droppableProvided.innerRef}
                                    {...droppableProvided.droppableProps}
                                    style={{ maxHeight: '80vh', overflow: 'auto' }}
                                >
                                    {localItems.length ? (
                                        localItems.map((item: any, index: number) => (
                                            <Draggable key={item.title} draggableId={item.title} index={index}>
                                                {(draggableProvided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                                                    return (
                                                        <div
                                                            ref={draggableProvided.innerRef}
                                                            {...draggableProvided.draggableProps}
                                                            style={{
                                                                ...draggableProvided.draggableProps.style
                                                                // background: snapshot.isDragging ? 'rgba(245,245,245, 0.75)' : 'none'
                                                            }}
                                                            // onClick={() => console.log('click on', item.code)}
                                                        >
                                                            {/* <div className="border p-2 rounded hover:bg-gray-50">
                                                            <div className="flex flex-col p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-gray-100 border">
                                                                <div {...draggableProvided.dragHandleProps} className="flex items-center">
                                                                    <span className="font-thin mr-1">{item.code} </span>
                                                                    {item.title}
                                                                    <div className="flex items-center ml-auto cursor-pointer">
                                                                        <span
                                                                            className={`inline-flex items-center justify-center px-2 py-1 mr-1 text-xs font-bold leading-none rounded${
                                                                                !item.list ? ' bg-gray-300 text-gray-600' : 'bg-indigo-700'
                                                                            }`}
                                                                        >
                                                                            {!item.list ? 'OPEN' : item.list}
                                                                        </span>
                                                                        <div
                                                                            onClick={() => {
                                                                                setSelectedIssue(item);
                                                                                setShowModal(true);
                                                                            }}
                                                                        >
                                                                            {item.users[0] ? (
                                                                                item.users[0].icon ? (
                                                                                    <img
                                                                                        className="m-1 w-6 h-6 relative flex justify-center items-center rounded-full"
                                                                                        src={item.users[0].icon}
                                                                                    />
                                                                                ) : (
                                                                                    <div className="m-1 w-6 h-6 relative flex justify-center items-center rounded-full bg-indigo-700 text-xs text-white uppercase">
                                                                                        {nameToInitials(item.users[0].name)}
                                                                                    </div>
                                                                                )
                                                                            ) : (
                                                                                <div className="m-1 w-6 h-6 relative flex justify-center text-gray-600 items-center rounded-full bg-gray-300 text-xs text-white uppercase">
                                                                                    <AiOutlineUser />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }}
                                            </Draggable>
                                        ))
                                    ) : (
                                        <span className="h-full flex items-center">No hay tareas</span>
                                    )}
                                    {droppableProvided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext> */}
                </div>
                <div className="flex items-center cursor-pointer pt-2" onClick={() => setCreateNew(true)}>
                    {createNew ? (
                        <input
                            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Issue one"
                            onChange={(e) => setNewIssue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleNewIssue()}
                        />
                    ) : (
                        <span className="flex items-center">
                            <HiPlusSm />
                            Crear una incidencia
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Backlog;
