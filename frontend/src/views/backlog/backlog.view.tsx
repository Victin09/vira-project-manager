import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { MdOutlineClose } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import styled from 'styled-components';

import { getToken } from '@common/auth/auth.common';
import { nameToInitials } from '@common/util/initials.common';
import { ITheme, useTheme } from '@common/context/theme-context.common';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Modal from '@components/modal/modal.component';
import UserSearch from '@components/search/users-search.component';

interface IBacklog {
    projectCode: string;
    displayOptions: (issueCode: any) => void;
    setDisplayOptions: (display: boolean) => void;
}

const BacklogContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    overflow: hidden;
    width: 100%;
`;

const BacklogHeader = styled.div<{ ct: ITheme }>`
    display: flex;
    align-items: end;
`;

const BacklogBody = styled.div<{ ct: ITheme }>`
    /* display: flex; */
    margin-top: 1em;
    max-height: ${(props) => props.ct.schema.sizes.containerHeightFull};
    overflow: auto;
`;

const BacklogTitle = styled.span<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.color};
    font-weight: bold;
    font-size: 1.5em;
`;

const BacklogTitleDetails = styled.span<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.hover};
    font-weight: bold;
    font-size: .65em;
`;

const BacklogHeaderButtonsContainer = styled.div<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.color};
    margin-left: auto;
`;

const BacklogHeaderButton = styled.span`
    cursor: pointer;
`;

const DragDropContainer = styled.div<{ ct: ITheme }>`
    display: flex;
    flex-direction: column;
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
`;

const DraggableRow = styled.div<{ ct: ITheme }>`
    display: flex;
    align-items: center;
    color: ${(props) => props.ct.schema.text.color};
    background-color: ${(props) => props.ct.schema.colors.primary};
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    border: ${(props) => props.ct.schema.general.border};
    cursor: pointer;
    padding-left: .5em;
    padding-right: .5em;
    padding-top: .75em;
    padding-bottom: .75em;
    margin-bottom: .25em;

    :hover {
        background-color: ${(props) => props.ct.schema.colors.secondary};
    }
`;

const RowTitle = styled.span<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.color};
    margin-right: .25em;
    font-weight: 100;
    opacity: .5;
`;

const RowEnd = styled.div<{ ct: ITheme }>`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

const ModalHeader = styled.div`
    display: flex;
    flex-direction: column;
`;

const ModalTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ModalTitleText = styled.span<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.color};
    font-weight: bold;
`;

const ModalTitleSeparator = styled.hr<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.colors.primary};
    opacity: .25;
    width: 100%;
    margin-top: 1em;
    margin-bottom: 1em;
`;

const ModalBody = styled.div`
    display: flex;
    align-items: center;
`;

const ModalBodyForm = styled.div<{ ct: ITheme }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    align-self: center;
    height: 75%;
    width: 100%;
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border-radius: 10px;
    color: ${(props) => props.ct.schema.text.color};

    @media only screen and (min-width: 320px) {
        box-shadow: none;
        height: 100%;
    }
    @media only screen and (min-width: 768px) {
        height: 75%;
    }  
`;

const Label = styled.span<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.color};
    letter-spacing: 0rem;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Input = styled.input<{ ct: ITheme }>`
    background: ${(props) => props.ct.schema.input.background};
    box-shadow: ${(props) => props.ct.schema.input.shadow};
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    width: 100%;
    height: ${(props) => props.ct.schema.input.height};
    padding: 1rem;
    border: ${(props) => props.ct.schema.input.border};
    outline: none;
    color: ${(props) => props.ct.schema.input.color};
    box-sizing: border-box;

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

const FormControl = styled.div`
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin-top: 2em;
    margin-bottom: 2em;
`;

const Button = styled.button<{ ct: ITheme }>`
    background: ${(props) => props.ct.schema.button.background};
    letter-spacing: 0.2rem;
    width: 100%;
    height: 3rem;
    border: none;
    color: ${(props) => props.ct.schema.button.text};
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    cursor: pointer;
    font-weight: bold;
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

const IssueList = styled.div<{ ct: ITheme }>`
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    font-size: 1em;
    color: ${(props) => props.ct.schema.text.color};
    font-weight: bold;
    text-align: center;
    background: ${(props) => props.ct.schema.colors.secondary};  
    padding: .25em;

    @media screen and (max-width: 600px) {
        display: none;
    }
`;

export const Backlog: React.FC<IBacklog> = ({ projectCode, displayOptions, setDisplayOptions }: IBacklog) => {
    const { theme } = useTheme();

    const [localItems, setLocalItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [issueName, setIssueName] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [issueUsers, setIssueUsers] = useState<string[]>([]);

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

    const handleUsers = (data: string[]) => {
        setIssueUsers(data);
    }

    const createIssue = async () => {
        const result = await (
            await fetch(`${process.env.API_URL}/issues`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    title: issueName,
                    description: issueDescription,
                    users: issueUsers,
                    project: projectCode
                })
            })
        ).json();
        console.log('result', result);
        if (result.title) {
            setLocalItems((oldArray) => [...oldArray, result]);
            setShowModal(false);
        }
    }

    const renderModalContent = () => {
        return (
            <>
                <ModalHeader>
                    <ModalTitle>
                        <ModalTitleText ct={theme}>
                            Crear una incidencia
                        </ModalTitleText>
                        <MdOutlineClose style={{cursor: 'pointer'}} onClick={() => setShowModal(false)} />
                    </ModalTitle>
                    <ModalTitleSeparator ct={theme} />
                </ModalHeader>
                <ModalBody>
                    <ModalBodyForm ct={theme}>
                        <InputContainer>
                                <FormControl>
                                    <Label ct={theme}>Nombre</Label>
                                    <Input ct={theme} type="text" placeholder="Nombre" onChange={(e) => setIssueName(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <Label ct={theme}>Descripcion</Label>
                                    <Input ct={theme} type="text" placeholder="Descripcion" onChange={(e) => setIssueDescription(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <Label ct={theme}>Usuarios</Label>
                                    <UserSearch isMultiple fnc={handleUsers} />
                                </FormControl>
                        </InputContainer>
                        <ButtonContainer>
                            <Button ct={theme} onClick={() => createIssue()}>Crear</Button>
                        </ButtonContainer>
                    </ModalBodyForm>
                </ModalBody>
            </>
        );
    };

    return (
        <BacklogContainer>
            <BacklogHeader ct={theme}>
                <BacklogTitle ct={theme}>
                    Backlog{' '}
                    <BacklogTitleDetails ct={theme}>
                        {localItems.length} tareas en total
                    </BacklogTitleDetails>
                </BacklogTitle>
                <BacklogHeaderButtonsContainer ct={theme}>
                    <BacklogHeaderButton onClick={() => setShowModal(true)}><IoMdAddCircleOutline /></BacklogHeaderButton>
                </BacklogHeaderButtonsContainer>
            </BacklogHeader>
            <BacklogBody ct={theme}>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable" direction="vertical">
                        {(provided) => (
                            <DragDropContainer
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                ct={theme}
                            >
                                {localItems.length ? (
                                    localItems.map((item: any, index: number) => (
                                        <Draggable draggableId={item.code} index={index} key={item.code}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    onClick={() => {
                                                        displayOptions(item);
                                                        setDisplayOptions(true);
                                                    }}
                                                >
                                                    <DraggableRow
                                                        ct={theme}
                                                        className="flex items-start p-2 mt-2 bg-white rounded-lg cursor-pointer group hover:bg-gray-100 border"
                                                        draggable="true"
                                                    >
                                                        <RowTitle ct={theme}>{item.code}</RowTitle>
                                                        {item.title}
                                                        <RowEnd ct={theme}>
                                                            <IssueList ct={theme}>
                                                                {item.list.name}
                                                            </IssueList>
                                                                {item.users[0] ? (
                                                                    item.users[0].icon ? (
                                                                        <img
                                                                            className="m-1 w-6 h-6 relative flex justify-center items-center rounded-full"
                                                                            src={item.users[0].icon}
                                                                        />
                                                                    ) : (
                                                                        <UserImage ct={theme} assigned>
                                                                            {nameToInitials(item.users[0].name)}
                                                                        </UserImage>
                                                                    )
                                                                ) : (
                                                                    <UserImage ct={theme} assigned={false}>
                                                                        <AiOutlineUser />
                                                                    </UserImage>
                                                                )}
                                                        </RowEnd>
                                                    </DraggableRow>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                ) : (
                                    <span>No hay datos</span>
                                )}
                                {provided.placeholder}
                            </DragDropContainer>
                        )}
                    </Droppable>
                </DragDropContext>
            </BacklogBody>
            <Modal display={showModal} setDisplay={setShowModal} content={renderModalContent()} />
        </BacklogContainer>
    );
};

export default Backlog;
