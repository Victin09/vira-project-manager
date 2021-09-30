import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Item from './item.component';

interface IIssue {
    code: string;
    order: number;
    title: string;
}

interface ColumnProps {
    col: {
        code: string;
        name: string;
        issues?: IIssue[];
    };
}

const Column: React.FC<ColumnProps> = ({ col: { issues, name, code = 'id' } }) => {
    return (
        <Droppable droppableId={code}>
            {(provided) => (
                <div className="m-5 p-2">
                    <div className="flex">
                        <h2 className="font-bold">{name}</h2>
                        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                            {issues ? issues.length : 0}
                        </span>
                    </div>
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex flex-col bg-gray-50 p-2 w-64 min-w-full rounded overflow-auto"
                        style={{ height: '90%', maxHeight: '80vh' }}
                    >
                        {issues && issues.map((item: any, index) => <Item key={item.code} issue={item} index={index} />)}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
};

export default Column;
