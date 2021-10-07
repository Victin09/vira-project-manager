import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { useI18n } from 'vira-i18n-react';

import { useUser } from '@common/context/user-context.common';
import { isAuthenticated } from '@common/auth/auth.common';
import { Row, Column } from '@components/ui/column.component';
import { Container } from '@components/ui/container.component';
import { ITheme, useTheme } from '@common/context/theme-context.common';

const LoginContainer = styled.div<{ ct: ITheme }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    height: 50%;
    width: 100%;
    background: ${(props) => props.ct.schema.colors.primary};
    box-shadow: ${(props) => props.ct.schema.general.shadow};
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border-radius: 10px;
    color: ${(props) => props.ct.schema.text.color};
    text-transform: uppercase;
    letter-spacing: 0.4rem;

    @media only screen and (min-width: 320px) {
        box-shadow: none;
        height: 100%;
    }
    @media only screen and (min-width: 768px) {
        box-shadow: ${(props) => props.ct.schema.general.shadow};
        height: 75%;
    }
`;

const WelcomeText = styled.h2`
    padding-top: 3em;
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
    text-transform: uppercase;
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

const Login = (): JSX.Element => {
    const { setEmail, setName, setIcon } = useUser();
    const [_cookies, setCookie] = useCookies(['vpm-um']);
    const history = useHistory();
    const { theme } = useTheme();
    const { i18n } = useI18n();

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAuthenticated()) history.push('/project');
    }, []);

    const login = async () => {
        const result = await (
            await fetch(`${process.env.API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: mail,
                    password
                })
            })
        ).json();
        if (result.access_token) {
            sessionStorage.setItem('token', result.access_token);
            setName(result.name);
            setEmail(result.email);
            setIcon(result.icon);
            setCookie('vpm-um', result);
            history.push('/');
        }
    };

    return (
        <Container ct={theme}>
            <Row fullHeight center>
                <Column xs="12" sm="10" md="8" lg="6">
                    <LoginContainer ct={theme}>
                        <WelcomeText>{i18n('welcome')}</WelcomeText>
                        <InputContainer>
                            <FormControl>
                                <Label ct={theme}>{i18n('email')}</Label>
                                <Input ct={theme} type="text" placeholder="Email" onChange={(e) => setMail(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <Label ct={theme}>{i18n('password')}</Label>
                                <Input ct={theme} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </FormControl>
                        </InputContainer>
                        <ButtonContainer>
                            <Button ct={theme} onClick={() => login()}>{i18n('sign_in')}</Button>
                        </ButtonContainer>
                        <ForgotPassword ct={theme}>{i18n('forgot_password')}</ForgotPassword>
                    </LoginContainer>
                </Column>
            </Row>
        </Container>
    );
};

export default Login;
