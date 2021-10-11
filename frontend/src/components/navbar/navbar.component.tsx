import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiFileListLine } from 'react-icons/ri';
import styled, { css } from 'styled-components';
import { useI18n } from 'vira-i18n-react';

import { isAuthenticated } from '@common/auth/auth.common';
import { useUser } from '@common/context/user-context.common';
import { nameToInitials } from '@common/util/initials.common';
import { ITheme, useTheme } from '@common/context/theme-context.common';
import { BsPalette2 } from 'react-icons/bs';
import useOnClickOutside from '@common/hooks/click-outside.hook';

const Nav = styled.nav<{ ct: ITheme }>`
    display: flex;
    align-items: center;
    width: 100%;
    height: ${(props) => props.ct.schema.sizes.navbarHeight};
    background: ${(props) => props.ct.schema.colors.primary};
    align-items: center;
    position: fixed;
    top: 0;
    box-shadow: ${(props) => props.ct.schema.general.shadow};

    @media (max-width: 678px) {
        width: 100vw;
    }
`;

const NavMenu = styled.div<{ open: boolean; ct: ITheme }>`
    display: flex;
    flex-flow: row nowrap;
    position: relative;
    width: 90%;
    align-items: center;

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

const NavLogo = styled.span<{ ct: ITheme }>`
    margin: 1em;
    font-size: 1.5em;
    font-weight: 600;
    object-fit: contain;
    color: ${(props) => props.ct.schema.button.background};

    @media (max-width: 1250px) {
        margin: 20px 50px 20px 5%;
    }
`;

const Dropdown = styled.div<{ ct: ITheme }>`
    cursor: pointer;
    height: 100%;
    color: ${(props) => props.ct.schema.text.color};
`;

const DropdownContent = styled.div<{ ct: ITheme, right: boolean }>`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: ${(props) => props.right ? 0 : 'auto'};
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

const UserProfile = styled.div<{ ct: ITheme }>`
    width: 2em;
    height: 2em;
    border-radius: 25%;
    font-size: 1em;
    color: ${(props) => props.ct.schema.button.text};
    font-weight: bold;
    line-height: 2em;
    text-align: center;
    background: ${(props) => props.ct.schema.button.background};  
    margin-right: .5em;

    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const MenuItemWithIcon = styled.span`
    display: flex;
    align-items: center;
`;

const Hamburger = styled.div<{ ct: ITheme; open: boolean }>`
    width: 2rem;
    height: 2rem;
    position: relative;
    margin-left: auto;
    right: 2em;
    z-index: 20;
    display: none;
    cursor: pointer;

    @media (max-width: 768px) {
        display: flex;
        justify-content: space-around;
        flex-flow: column nowrap;
    }
`;

const Bar = styled.div<{ open: boolean }>`
    width: 2rem;
    height: 0.25rem;
    background-color: #000;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    cursor: pointer;

    &:nth-child(1) {
        transform: ${(props) => (props.open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
        transform: ${(props) => (props.open ? 'translateX(100%)' : 'translateX(0)')};
        opacity: ${(props) => (props.open ? 0 : 1)};
    }
    &:nth-child(3) {
        transform: ${(props) => (props.open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
`;

const Navbar = (): JSX.Element => {
    const { icon, name } = useUser();
    const localtion = useLocation();
    const { theme, changeTheme } = useTheme();
    const { setLanguage } = useI18n();
    const projectsRef = useRef();
    const languageRef = useRef();
    const themeRef = useRef();

    const [lang, setLang] = useState('');
    const [autenticated, setAutenticated] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayUserOptions, setDisplayUserOptions] = useState(false);
    const [displayProjects, setDisplayProjects] = useState(false);
    const [displayThemes, setDisplayThemes] = useState(false);
    const [displayLanguage, setDisplayLanguage] = useState(false);

    useEffect(() => {
        localStorage.getItem('language') && setLang(localStorage.getItem('language').toUpperCase());
        if (isAuthenticated()) setAutenticated(true);
    }, [localtion.pathname]);

    const handleUserClick = () => {
        setDisplayUserOptions(!displayUserOptions);
    };

    const handleTheme = (theme: string) => {
        changeTheme(theme);
    };

    const handleLanguage = (language: string) => {
        setLanguage(language);
        setLang(language.toUpperCase());
        localStorage.setItem('language', language);
    };

    const handleClickOutsideProjects = () => {
        setDisplayProjects(false);
    };

    const handleClickOutsideLanguage = () => {
        setDisplayLanguage(false);
    };

    const handleClickOutsideTheme = () => {
        setDisplayThemes(false);
    };

    useOnClickOutside(projectsRef, handleClickOutsideProjects);
    useOnClickOutside(languageRef, handleClickOutsideLanguage);
    useOnClickOutside(themeRef, handleClickOutsideTheme);

    return (
        <>
        {autenticated && (
            <Nav ct={theme}>
                <NavLogo ct={theme}>VPM</NavLogo>
                <Hamburger open={displayMenu} ct={theme} onClick={() => setDisplayMenu(!displayMenu)}>
                    <Bar open={displayMenu} />
                    <Bar open={displayMenu} />
                    <Bar open={displayMenu} />
                </Hamburger>
                <NavItem ct={theme}>
                    <NavItem ct={theme}>
                        <Dropdown ct={theme} onClick={() => setDisplayProjects(!displayProjects)}>
                            <MenuItemWithIcon>
                                <RiFileListLine /> Proyectos
                            </MenuItemWithIcon>
                            {displayProjects && (
                                <DropdownContent ref={projectsRef} ct={theme} right={false}>
                                    <DropdownItem ct={theme}><Link to="/project">Ver</Link></DropdownItem>
                                    <DropdownItem ct={theme}><Link to="/project/new">Crear</Link></DropdownItem>
                                </DropdownContent>
                            )}
                        </Dropdown>
                    </NavItem>
                </NavItem>
                <NavMenuRight open={displayMenu} ct={theme}>
                    <UserProfile ct={theme} onClick={handleUserClick}>{icon ? icon : nameToInitials(name)}</UserProfile>
                    <NavItem ct={theme}>
                        <Dropdown ct={theme} onClick={() => setDisplayLanguage(!displayLanguage)}>
                            {lang}
                            {displayLanguage && (
                                <DropdownContent ref={languageRef} ct={theme} right>
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
                                <DropdownContent ref={themeRef} ct={theme} right>
                                    <DropdownItem ct={theme} onClick={() => handleTheme('light')}>Light</DropdownItem>
                                    <DropdownItem ct={theme} onClick={() => handleTheme('dark')}>Dark</DropdownItem>
                                    <DropdownItem ct={theme} onClick={() => handleTheme('material')}>Material</DropdownItem>
                                </DropdownContent>
                            )}
                        </Dropdown>
                    </NavItem>
                </NavMenuRight>
            </Nav>
        )}
        </>
    );
};

export default Navbar;
