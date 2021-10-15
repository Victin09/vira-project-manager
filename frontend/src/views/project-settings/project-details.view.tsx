import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getToken } from '@common/auth/auth.common';
import ProjectTypeSearch from '@components/search/type-search.component';
import { ITheme, useTheme } from '@common/context/theme-context.common';
import UserSearch from '@components/search/users-search.component';
import { Column } from '@components/ui/column.component';

interface IProjectDetails {
    projectCode: string;
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const ProjectFormContainer = styled.div<{ ct: ITheme }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    align-self: center;
    height: 75%;
    width: 50%;
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border-radius: 10px;
    color: ${(props) => props.ct.schema.text.color};
    /* letter-spacing: 0.4rem; */

    @media only screen and (min-width: 320px) {
        box-shadow: none;
        height: 100%;
    }
    @media only screen and (min-width: 768px) {
        /* box-shadow: ${(props) => props.ct.schema.general.shadow}; */
        height: 75%;
    }
`;

const FormText = styled.span`
    font-weight: bold;
    font-size: 1.5em;
    letter-spacing: 0rem;
    margin-bottom: 1em;
    margin-top: 1.5em;
    /* opacity: 0.5; */
`;

const Label = styled.span<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.color};
    letter-spacing: 0rem;
`;

const LabelFile = styled.span<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.button.text};
    background: ${(props) => props.ct.schema.button.background};
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    letter-spacing: 0rem;
    position: relative;
    z-index: 0;
    display: inline-block;
    width: 100%;
    cursor: pointer;
    padding: 10px 0;
    /* text-transform:uppercase; */
    /* font-size:12px; */
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

const InputFile = styled.input<{ ct: ITheme }>`
    display: inline-block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: ${(props) => props.ct.schema.input.height};
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
`;

const FormControl = styled.div`
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
`;

const ButtonWrapper = styled.div`
    position: relative;
    width: 100%;
    text-align: center;
    /* margin: 20% auto; */
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


const ProjectDetails = ({ projectCode }: IProjectDetails): JSX.Element => {
    const { theme } = useTheme();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');

    const [base64, setBase64] = useState<string>();
    const [users, setUsers] = useState<string[]>([]);
    const [fileName, setFileName] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            const result = await (
                await fetch(`${process.env.API_URL}/projects/find/${projectCode}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json'
                    }
                })
            ).json();
            console.log('result', result);
            if (result.name) {
                setName(result.name);
                setDescription(result.description);
                setType(result.type.name);
            }
        };

        fetchData();
    }, []);

    const typeSelected = (data: string) => {
        setType(data);
    };

    const usersSelected = (data: string[]) => {
        setUsers(data);
    };

    const photoUpload = async (e: any) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        if (reader !== undefined && file !== undefined) {
            reader.onloadend = () => {
                setFileName(file.name);
                setBase64(reader.result.toString());
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFom = async () => {
        const result = await (await fetch(`${process.env.API_URL}/projects/${projectCode}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                name,
                description,
                image: base64,
                type,
                users,
            })
        })).json();

        console.log('updated', result);
    }

    return (
        <>
            {name && (
                <Container>
                    <ProjectFormContainer ct={theme}>
                        <FormText>Editar proyecto <i>{name}</i></FormText>
                        <InputContainer>
                            <FormControl>
                                <Label ct={theme}>Nombre</Label>
                                <Input ct={theme} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <Label ct={theme}>Descripcion</Label>
                                <Input ct={theme} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <Label ct={theme}>Imagen</Label>
                                <ButtonWrapper>
                                    <LabelFile ct={theme}>{fileName ? fileName : 'Selecciona una imagen'}</LabelFile>
                                    <InputFile ct={theme} type="file" accept="image/png, image/jpeg" className="hidden" onChange={photoUpload} />
                                </ButtonWrapper>
                            </FormControl>
                            <FormControl>
                                <Label ct={theme}>Tipo de proyecto</Label>
                                <ProjectTypeSearch fnc={typeSelected} project={projectCode} />
                            </FormControl>
                            <FormControl>
                                <Label ct={theme}>Usuarios</Label>
                                <UserSearch isMultiple fnc={usersSelected} />
                            </FormControl>
                        </InputContainer>
                        <ButtonContainer>
                            <Button ct={theme} onClick={() => handleFom()}>Guardar</Button>
                        </ButtonContainer>
                    </ProjectFormContainer>
                </Container>
                // <div className="h-full w-full flex justify-center items-center">
                //     <form className="w-full h-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                //         <div className="mb-4">
                //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                //                 Nombre
                //             </label>
                //             {!editName ? (
                //                 <span className="italic w-full" onClick={() => setEditName(true)}>
                //                     {name}
                //                 </span>
                //             ) : (
                //                 <input
                //                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                //                     id="name"
                //                     type="text"
                //                     value={name}
                //                     onChange={(e) => setName(e.target.value)}
                //                     onKeyDown={handleName}
                //                 />
                //             )}
                //         </div>
                //         <div className="mb-4">
                //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                //                 Descripcion
                //             </label>
                //             {!editDescription ? (
                //                 <span className="italic w-full" onClick={() => setEditDescription(true)}>
                //                     {description}
                //                 </span>
                //             ) : (
                //                 <input
                //                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                //                     id="username"
                //                     type="text"
                //                     value={description}
                //                     onChange={(e) => setDescription(e.target.value)}
                //                     onKeyDown={handleDescription}
                //                 />
                //             )}
                //         </div>
                //         <div className="mb-4">
                //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                //                 Tipo
                //             </label>
                //             {!editType ? (
                //                 <span className="italic w-full" onClick={() => setEditType(true)}>
                //                     {type}
                //                 </span>
                //             ) : (
                //                 <ProjectTypeSearch fnc={handleType} />
                //             )}
                //         </div>
                //         {/* <div className="flex items-center justify-between">
                //             <button
                //             className="bg-indigo-700 hover:bg-indigo-800 text-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                //             type="button"
                //             onClick={() => login()}
                //             >
                //             Registrase
                //             </button>
                //             <span className="ml-4  font-bold text-xs text-gray-700 text-xs">
                //             ¿Ya tienes cuenta?
                //             <Link to="/login" className="inline-block align-baseline font-bold text-xs text-indigo-700">
                //             Inicia sesión
                //             </Link>
                //             </span>
                //         </div> */}
                //     </form>
                //     {/* <p className="text-center text-gray-500 text-xs">&copy;2021 Vira. All rights reserved.</p> */}
                // </div>
            )}
        </>
    );
};

export default ProjectDetails;
