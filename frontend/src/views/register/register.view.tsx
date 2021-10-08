import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';
import { useI18n } from 'vira-i18n-react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';

import { useUser } from '@common/context/user-context.common';
import { isAuthenticated } from '@common/auth/auth.common';
import { ITheme, useTheme } from '@common/context/theme-context.common';
import { Container } from '@components/ui/container.component';
import { Column, Row } from '@components/ui/column.component';
import { BsPalette2 } from 'react-icons/bs';
import useOnClickOutside from '@common/hooks/click-outside.hook';

const RegisterContainer = styled.div<{ ct: ITheme }>`
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

const VPMText = styled.h2<{ ct: ITheme }>`
    padding-top: 3em;
    color: ${(props) => props.ct.schema.text.hover};
    font-weight: bolder;
    letter-spacing: 0rem;
    text-transform: uppercase;
`;

const RegisterText = styled.span`
    font-weight: 100;
    letter-spacing: 0rem;
    margin-bottom: 1em;
    margin-top: 1.5em;
    font-style: italic;
    opacity: 0.5;
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

const NavMenuRight = styled.div<{ open: boolean; ct: ITheme }>`
    display: flex;
    align-items: center;
    justify-content: end;
    flex-flow: row nowrap;
    position: relative;
    width: 90%;
    height: 100%;

    @media (max-width: 768px) {
        flex-flow: column nowrap;
        background-color: ${(props) => props.ct.schema.colors.primary};
        position: fixed;
        transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(100%)')};
        top: -16px;
        right: 0;
        height: 100%;
        width: 90%;
        padding-top: 3.5rem;
        transition: transform 0.3s ease-in-out;
        z-index: 9;
        justify-content: normal;
    }
`;

const NavItem = styled.div<{ ct: ITheme }>`
    padding: 0.5em;
    cursor: pointer;
    color: ${(props) => props.ct.schema.text.color};
    display: flex;

    :hover {
        color: ${(props) => props.ct.schema.text.hover};
    }

    @media (max-width: 768px) {
        color: #000;
        margin-right: 34px;
        &:hover {
            color: #0dadea;
        }
    }
`;

const Dropdown = styled.div<{ ct: ITheme }>`
    cursor: pointer;
    height: 100%;
    color: ${(props) => props.ct.schema.text.color};
`;

const DropdownContent = styled.div<{ ct: ITheme }>`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    background-color: ${(props) => props.ct.schema.colors.primary};
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
`;

const DropdownItem = styled.span<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.color};
    padding: 12px 16px;
    /* width: 100%; */

    :hover {
        color: ${(props) => props.ct.schema.text.hover};
        background-color: ${(props) => props.ct.schema.colors.secondary};
    }
`;

const Register = (): JSX.Element => {
    const { setEmail, setName, setIcon } = useUser();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_cookies, setCookie] = useCookies(['vpm-um']);
    const history = useHistory();
    const { i18n, setLanguage } = useI18n();
    const { theme, changeTheme } = useTheme();

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const languageRef = useRef();
    const themeRef = useRef();

    const [lang, setLang] = useState('');
    const [autenticated, setAutenticated] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayUserOptions, setDisplayUserOptions] = useState(false);
    const [displayThemes, setDisplayThemes] = useState(false);
    const [displayLanguage, setDisplayLanguage] = useState(false);

    useEffect(() => {
        localStorage.getItem('language') && setLang(localStorage.getItem('language').toUpperCase());
        if (isAuthenticated()) setAutenticated(true);
    }, []);
    
    const handleTheme = (theme: string) => {
        changeTheme(theme);
    };

    const handleLanguage = (language: string) => {
        setLanguage(language);
        setLang(language.toUpperCase());
        localStorage.setItem('language', language);
    };

    const handleClickOutsideLanguage = () => {
        setDisplayLanguage(false);
    };

    const handleClickOutsideTheme = () => {
        setDisplayThemes(false);
    };

    useOnClickOutside(languageRef, handleClickOutsideLanguage);
    useOnClickOutside(themeRef, handleClickOutsideTheme);

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
        <Container ct={theme} auth={isAuthenticated()}>
            <Row>
                <NavMenuRight open={displayMenu} ct={theme}>
                        <NavItem ct={theme}>
                            <Dropdown ct={theme} onClick={() => setDisplayLanguage(!displayLanguage)}>
                                {lang}
                                {displayLanguage && (
                                    <DropdownContent ref={languageRef} ct={theme}>
                                        <DropdownItem ct={theme} onClick={() => handleLanguage('en')}>EN</DropdownItem>
                                        <DropdownItem ct={theme} onClick={() => handleLanguage('es')}>ES</DropdownItem>
                                    </DropdownContent>
                                )}
                            </Dropdown>
                        </NavItem>
                        <NavItem ct={theme}>
                            <Dropdown ct={theme} onClick={() => setDisplayThemes(!displayThemes)}>
                                <BsPalette2 />
                                {displayThemes && (
                                    <DropdownContent ref={themeRef} ct={theme}>
                                        <DropdownItem ct={theme} onClick={() => handleTheme('light')}>Light</DropdownItem>
                                        <DropdownItem ct={theme} onClick={() => handleTheme('dark')}>Dark</DropdownItem>
                                        <DropdownItem ct={theme} onClick={() => handleTheme('material')}>Material</DropdownItem>
                                    </DropdownContent>
                                )}
                            </Dropdown>
                        </NavItem>
                </NavMenuRight>
            </Row>
            <Row fullHeight center>
                <Column xs="12" sm="6" md="4" lg="4">
                    <RegisterContainer ct={theme}>
                        <VPMText ct={theme}>VIRA PROJECT MANAGER</VPMText>
                        <RegisterText>{i18n('sign_up_text')}</RegisterText>
                        <InputContainer>
                            <FormControl>
                                <Label ct={theme}>{i18n('email')}</Label>
                                <Input ct={theme} type="email" placeholder="Email" onChange={(e) => setMail(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <Label ct={theme}>{i18n('fullName')}</Label>
                                <Input ct={theme} type="text" placeholder="Full name" onChange={(e) => setFullname(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <Label ct={theme}>{i18n('username')}</Label>
                                <Input ct={theme} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
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
                    </RegisterContainer>
                </Column>
            </Row>
        </Container>
    );
};

export default Register;
