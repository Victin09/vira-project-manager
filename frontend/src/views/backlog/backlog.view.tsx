import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided, DroppableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { FiMoreVertical } from 'react-icons/fi';
import { HiPlusSm } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';

import { getToken } from '@common/auth/auth.common';
import { nameToInitials } from '@common/util/initials.common';
import IssueModal from '@components/issue-modal/issue-modal.component';
import UserSearch from '@components/user-search/users-search.component';

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

    const selectUser = async (data: string) => {
        const result = await (
            await fetch(`${process.env.API_URL}/issues/add-user/${selectedIssue.code}/${data}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        ).json();
        selectedIssue.users = result.users;
        setShowModal(false);
    };

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
        if (updated) {
            setLocalItems(files);
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
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-2">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden p-2">
                        <span className="text-md font-bold pb-2">Backlog</span>
                        <div className="bg-white min-h-full p-2 rounded">
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="droppable" direction="vertical">
                                    {(droppableProvided: DroppableProvided) => (
                                        <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                                            {localItems.length ? (
                                                localItems.map((item: any, index: number) => (
                                                    <Draggable key={item.title} draggableId={item.title} index={index}>
                                                        {(draggableProvided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                                                            return (
                                                                <div
                                                                    ref={draggableProvided.innerRef}
                                                                    {...draggableProvided.draggableProps}
                                                                    style={{
                                                                        ...draggableProvided.draggableProps.style,
                                                                        background: snapshot.isDragging ? 'rgba(245,245,245, 0.75)' : 'none'
                                                                    }}
                                                                    // onClick={() => console.log('click on', item.code)}
                                                                >
                                                                    <div className="border rounded">
                                                                        <div className="p-2">
                                                                            <div {...draggableProvided.dragHandleProps} className="flex items-center">
                                                                                <span className="font-thin mr-1">{item.code} </span>
                                                                                {item.title}
                                                                                <div className="flex items-center ml-auto cursor-pointer">
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
                                                                                    {showModal && selectedIssue.code === item.code && (
                                                                                        <div className="absolute" style={{ left: '96%' }}>
                                                                                            {/* <IssueModal selectedIssue={selectedIssue} /> */}
                                                                                            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                                                                                <UserSearch
                                                                                                    isMultiple={false}
                                                                                                    fncSingle={selectUser}
                                                                                                />
                                                                                            </div>
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
                                                <span className="h-full flex items-cente{r">No hay tareas</span>
                                            )}
                                            {droppableProvided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            {createNew && (
                                <input
                                    className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Issue one"
                                    onChange={(e) => setNewIssue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleNewIssue()}
                                />
                            )}
                        </div>
                        <div className="flex items-center cursor-pointer" onClick={() => setCreateNew(true)}>
                            <HiPlusSm />
                            Crear una incidencia
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Backlog;
