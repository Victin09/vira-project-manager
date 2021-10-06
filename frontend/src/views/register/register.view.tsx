import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';
import { useI18n } from 'vira-i18n-react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';

import { useUser } from '@common/context/user-context.common';
import { isAuthenticated } from '@common/auth/auth.common';
import { ITheme, useTheme } from '@common/hooks/theme.hook';

const MainContainer = styled.div<{ theme: ITheme }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: ${(props) => props.theme.schema.sizes.containerHeightFull};
    background-color: ${(props) => props.theme.schema.colors.secondary};
`;

const LoginContainer = styled.div<{ theme: ITheme }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background: ${(props) => props.theme.schema.colors.primary};
    box-shadow: ${(props) => props.theme.schema.general.shadow};
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border-radius: 10px;
    color: ${(props) => props.theme.schema.text.color};
    text-transform: uppercase;
    letter-spacing: 0.4rem;
    @media only screen and (max-width: 320px) {
        width: 100vw;
        height: 90vh;
        hr {
            margin-bottom: 0.3rem;
        }
        h4 {
            font-size: small;
        }
    }
    @media only screen and (min-width: 360px) {
        width: 100vw;
        height: 90vh;
        h4 {
            font-size: small;
        }
    }
    @media only screen and (min-width: 411px) {
        width: 700vw;
        height: 90vh;
    }

    @media only screen and (min-width: 768px) {
        width: 50vw;
        height: 80vh;
    }
    @media only screen and (min-width: 1024px) {
        width: 40vw;
        height: 80vh;
    }
    @media only screen and (min-width: 1280px) {
        width: 40vw;
        height: 80vh;
    }
`;

const WelcomeText = styled.h2`
    margin: 3rem 0 2rem 0;
`;

const Label = styled.span<{ theme: ITheme }>`
    color: ${(props) => props.theme.schema.text.color};
    letter-spacing: 0rem;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
`;

const Input = styled.input<{ theme: ITheme }>`
    background: ${(props) => props.theme.schema.input.background};
    box-shadow: ${(props) => props.theme.schema.input.shadow};
    border-radius: 0.25rem;
    width: 80%;
    height: ${(props) => props.theme.schema.input.height};
    padding: 1rem;
    border: ${(props) => props.theme.schema.input.border};
    outline: none;
    color: ${(props) => props.theme.schema.text.color};
    &:focus {
        display: inline-block;
        backdrop-filter: blur(12rem);
        border: ${(props) => props.theme.schema.input.focus};
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
    margin: 2rem 0 1rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button<{ theme: ITheme }>`
    background: ${(props) => props.theme.schema.button.background};
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 65%;
    height: 3rem;
    border: none;
    color: ${(props) => props.theme.schema.button.text};
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
`;

const ForgotPassword = styled.span`
    cursor: pointer;
    margin-bottom: 6em;
    font-weight: 25;
    letter-spacing: 0rem;

    :hover {
        color: ${(props) => props.theme.schema.text.hover};
    }
`;

const LoginWith = styled.h5`
    cursor: text;
`;

const HorizontalRule = styled.hr<{ theme: ITheme }>`
    width: 90%;
    height: 0.1rem;
    border-radius: 0.8rem;
    border: none;
    background: ${(props) => props.theme.schema.button.background};
    backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 1rem 0 3rem 0;
    width: 80%;
`;

const Icon = styled.div<{ theme: ITheme; color: string }>`
    height: 3.5rem;
    width: 3.5rem;
    background: ${(props) => props.color};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4rem;
    color: ${(props) => props.theme.schema.button.background};
    cursor: pointer;
    svg {
        width: 1.5rem;
        height: 1.5rem;
    }
`;

const Register = (): JSX.Element => {
    const { setEmail, setName, setIcon } = useUser();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_cookies, setCookie] = useCookies(['vpm-um']);
    const history = useHistory();
    const { i18n } = useI18n();
    const { theme } = useTheme();

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAuthenticated()) history.push('/');
    }, []);

    const login = async () => {
        const result = await (
            await fetch(`${process.env.API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: fullname,
                    username,
                    email: mail,
                    password,
                    icon: ''
                })
            })
        ).json();
        if (result.username === username) {
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
        }
    };

    return (
        <MainContainer>
            <LoginContainer theme={theme}>
                <WelcomeText>{i18n('welcome')}</WelcomeText>
                <InputContainer>
                    <FormControl>
                        <Label>{i18n('email')}</Label>
                        <Input type="text" placeholder="Email" onChange={(e) => setMail(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <Label>{i18n('fullName')}</Label>
                        <Input type="text" placeholder="Email" onChange={(e) => setFullname(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <Label>{i18n('username')}</Label>
                        <Input type="text" placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <Label>{i18n('password')}</Label>
                        <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                </InputContainer>
                <ButtonContainer>
                    <Button onClick={() => login()}>{i18n('sign_in')}</Button>
                </ButtonContainer>
                <ForgotPassword>{i18n('haveAccount')}</ForgotPassword>
                <LoginWith>{i18n('login_with')}</LoginWith>
                <HorizontalRule theme={theme} />
                <IconsContainer>
                    <Icon color="">
                        <FaFacebookF />
                    </Icon>
                    <Icon color="">
                        <FaInstagram />
                    </Icon>
                    <Icon color="">
                        <FaTwitter />
                    </Icon>
                </IconsContainer>
            </LoginContainer>
        </MainContainer>
    );
};

export default Register;
