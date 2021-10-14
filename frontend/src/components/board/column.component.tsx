import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Item from './item.component';
import { ITheme, useTheme } from '@common/context/theme-context.common';

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

const ColumnContainer = styled.div<{ ct: ITheme }>`
    margin: 1em;
    padding: .5em;
    display: flex;
    flex-direction: column;
    width: 20em;
    max-width: 20em;
`;

const ColumnHeader = styled.div`
    display: flex;
    align-items: end;
    margin-bottom: .5em;
`;

const ColumnTitle = styled.span<{ ct: ITheme }>`
    font-weight: bolder;
    font-size: 1.25em;
    color: ${(props) => props.ct.schema.text.color};
`;

const ColumnTotal = styled.span<{ ct: ITheme }>`
    /* font-weight: bolder; */
    /* font-size: 1.25em; */
    background-color: ${(props) => props.ct.schema.colors.secondary};
    margin-left: .5em;
    color: ${(props) => props.ct.schema.text.hover};
    border-radius: 50%;
    padding: .15em;
`;


const ColumnBody = styled.div<{ ct: ITheme }>`
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: .5em;
    background-color: ${(props) => props.ct.schema.colors.secondary};
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
`;

const Column: React.FC<ColumnProps> = ({ col: { issues, name, code = 'id' } }) => {
    const { theme } = useTheme();

    return (
        <Droppable droppableId={code}>
            {(provided) => (
                <ColumnContainer ct={theme}>
                    <ColumnHeader>
                        <ColumnTitle ct={theme}>{name}</ColumnTitle>
                        <ColumnTotal ct={theme}>
                            {issues ? issues.length : 0}
                        </ColumnTotal>
                    </ColumnHeader>
                    <ColumnBody
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        ct={theme}
                        style={{ height: '90%', maxHeight: '80vh' }}
                    >
                        {issues && issues.map((item: any, index) => <Item key={item.code} issue={item} index={index} />)}
                        {provided.placeholder}
                    </ColumnBody>
                </ColumnContainer>
            )}
        </Droppable>
    );
};

export default Column;
