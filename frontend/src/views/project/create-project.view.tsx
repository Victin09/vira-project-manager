import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFileUpload } from 'react-icons/fa';

import { useUser } from '@common/context/user-context.common';
import { getToken, isAuthenticated } from '@common/auth/auth.common';
import { useHistory } from 'react-router';
import UserSearch from '@components/search/users-search.component';
import ProjectTypeSearch from '@components/search/type-search.component';
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
                                <ButtonWrapper>
                                    <LabelFile ct={theme}>{fileName ? fileName : 'Selecciona una imagen'}</LabelFile>
                                    <InputFile ct={theme} type="file" accept="image/png, image/jpeg" className="hidden" onChange={photoUpload} />
                                </ButtonWrapper>
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
    );
};

export default CreateProject;
