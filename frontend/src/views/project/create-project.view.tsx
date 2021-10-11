import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFileUpload } from 'react-icons/fa';

import { useUser } from '@common/context/user-context.common';
import { getToken, isAuthenticated } from '@common/auth/auth.common';
import { useHistory } from 'react-router';
import UserSearch from '@components/user-search/users-search.component';
import ProjectTypeSearch from '@components/type-search/type-search.component';
import { Container } from '@components/ui/container.component';
import { Column, Row } from '@components/ui/column.component';
import { ITheme, useTheme } from '@common/context/theme-context.common';
import { useI18n } from 'vira-i18n-react';

const ProjectFormContainer = styled.div<{ ct: ITheme }>`
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
    letter-spacing: 0.4rem;

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

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
`;

const Input = styled.input<{ ct: ITheme }>`
    background: ${(props) => props.ct.schema.input.background};
    box-shadow: ${(props) => props.ct.schema.input.shadow};
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    width: 80%;
    height: ${(props) => props.ct.schema.input.height};
    padding: 1rem;
    border: ${(props) => props.ct.schema.input.border};
    outline: none;
    color: ${(props) => props.ct.schema.input.color};

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
    width: 100%;
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
    width: 85%;
    height: 3rem;
    border: none;
    color: ${(props) => props.ct.schema.button.text};
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    cursor: pointer;
    font-weight: bold;
`;

const ForgotPassword = styled.span<{ ct: ITheme}>`
    cursor: pointer;
    margin-bottom: 6em;
    font-weight: 25;
    letter-spacing: 0rem;
    font-style: italic;

    :hover {
        color: ${(props) => props.ct.schema.text.hover};
    }
`;


const CreateProject = (): JSX.Element => {
    const { email } = useUser();
    const history = useHistory();
    const { theme } = useTheme();
    const { i18n } = useI18n();

    const [projectName, setProjectName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [base64, setBase64] = useState<string>();
    const [type, setType] = useState<string>();
    const [users, setUsers] = useState<string[]>([]);
    const [fileName, setFileName] = useState<string>();

    const [projectNameError, setProjectNameError] = useState(false);
    const [typeError, setTypeError] = useState(false);

    const create = async () => {
        if (!projectName) {
            setProjectNameError(true);
            return;
        }
        if (!type) {
            setTypeError(true);
            return;
        }

        const result = await (
            await fetch(`${process.env.API_URL}/projects/${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    name: projectName,
                    description,
                    image: base64,
                    type,
                    users,
                    responsible: email
                })
            })
        ).json();
        if (result) history.push('/');
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

    const typeSelected = (data: string) => {
        setType(data);
    };

    const usersSelected = (data: string[]) => {
        setUsers(data);
    };

    return (
        <Container ct={theme} auth={isAuthenticated()}>
            <Row fullHeight center>
                <Column xs="12" sm="6" md="4" lg="4">
                    <ProjectFormContainer ct={theme}>
                        <FormText>Crear un nuevo proyecto</FormText>
                        <InputContainer>
                            <FormControl>
                                <Label ct={theme}>Nombre</Label>
                                <Input ct={theme} type="text" placeholder="Nombre" onChange={(e) => setProjectName(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <Label ct={theme}>Descripcion</Label>
                                <Input ct={theme} type="text" placeholder="Descripcion" onChange={(e) => setDescription(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <Label ct={theme}>Imagen</Label>
                                <Input ct={theme} type="file" placeholder={fileName ? fileName : 'Selecciona un archivo'} accept="image/png, image/jpeg" className="hidden" onChange={photoUpload} />
                            </FormControl>
                            <FormControl>
                                <Label ct={theme}>Tipo de proyecto</Label>
                                <ProjectTypeSearch fnc={typeSelected} />
                            </FormControl>
                            <FormControl>
                                <Label ct={theme}>Usuarios</Label>
                                <UserSearch isMultiple fnc={usersSelected} />
                            </FormControl>
                        </InputContainer>
                        <ButtonContainer>
                            <Button ct={theme} onClick={() => create()}>Crear proyecto</Button>
                        </ButtonContainer>
                    </ProjectFormContainer>
                </Column>
            </Row>
        </Container>

        // <div className="h-full w-full flex justify-center p-3">
        //     <form className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        //         <div className="mb-4">
        //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        //                 Nombre del proyecto
        //             </label>
        //             <input
        //                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //                 id="name"
        //                 type="text"
        //                 placeholder="Project one"
        //                 onChange={(e) => setProjectName(e.target.value)}
        //             />
        //             {projectNameError && <p className="text-red-500 text-xs italic">Por favor escribe un nombre.</p>}
        //         </div>
        //         <div className="mb-4">
        //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
        //                 Descripcion del proyecto
        //             </label>
        //             <input
        //                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //                 id="description"
        //                 type="text"
        //                 placeholder="This is the first project"
        //                 onChange={(e) => setDescription(e.target.value)}
        //             />
        //         </div>
        //         <div className="mb-4">
        //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
        //                 Imagen
        //             </label>
        //             <label className="w-full flex justify-center items-center py-2 px-3 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
        //                 {!fileName && <FaFileUpload />}
        //                 <span className="ml-2 mt-2 text-base leading-normal truncate">{fileName ? fileName : 'Selecciona un archivo'}</span>
        //                 <input id="image" type="file" accept="image/png, image/jpeg" className="hidden" onChange={photoUpload} />
        //             </label>
        //         </div>
        //         <div className="mb-6">
        //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        //                 Tipo de proyecto
        //             </label>
        //             <ProjectTypeSearch fnc={typeSelected} />
        //             {typeError && <p className="text-red-500 text-xs italic">Por favor seleccione un tipo.</p>}
        //         </div>
        //         <div className="mb-6">
        //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        //                 Usuarios
        //             </label>
        //             <UserSearch isMultiple fnc={usersSelected} />
        //         </div>
        //         <div className="flex items-center justify-between">
        //             <button
        //                 className="bg-indigo-700 hover:bg-indigo-800 text-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        //                 type="button"
        //                 onClick={() => create()}
        //             >
        //                 Crear proyecto
        //             </button>
        //         </div>
        //     </form>
        // </div>
    );
};

export default CreateProject;
