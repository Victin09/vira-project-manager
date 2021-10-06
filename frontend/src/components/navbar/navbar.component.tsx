import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { RiFileListLine, RiPaletteLine } from 'react-icons/ri';
import styled, { css } from 'styled-components';

import { isAuthenticated } from '@common/auth/auth.common';
import { useUser } from '@common/context/user-context.common';
import { nameToInitials } from '@common/util/initials.common';
import { ITheme, useTheme } from '@common/hooks/theme.hook';
import Dropdown from '@components/dropdown/dropdown.component';
import { useI18n } from 'vira-i18n-react';

const Hamburger = styled.div<{ theme: ITheme; open: boolean }>`
    width: 2rem;
    height: 2rem;
    position: fixed;
    top: 15px;
    right: 20px;
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

const Nav = styled.nav<{ theme: ITheme }>`
    height: 100%;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    /* justify-content: space-between; */
    background-color: ${(props) => props.theme.schema.colors.primary};
    align-items: center;
    position: relative;
    box-shadow: ${(props) => props.theme.schema.general.shadow};

    @media (max-width: 678px) {
        width: 100vw;
    }
`;

const NavMenu = styled.ul<{ open: boolean; theme: ITheme }>`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    position: relative;
    width: 90%;
    align-items: center;

    @media (max-width: 768px) {
        flex-flow: column nowrap;
        background-color: ${(props) => props.theme.schema.colors.primary};
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

const NavItem = styled.li<{ theme: ITheme }>`
    padding: 0.5em;
    cursor: pointer;

    :hover {
        color: ${(props) => props.theme.schema.text.hover};
    }

    @media (max-width: 768px) {
        color: #000;
        margin-right: 34px;
        &:hover {
            color: #0dadea;
        }
    }
`;

const NavLogo = styled.span`
    margin: 1em;
    /* width: 160px; */
    font-size: 1.5em;
    font-weight: bold;
    object-fit: contain;

    @media (max-width: 1250px) {
        margin: 20px 50px 20px 5%;
    }
`;

const Navbar = (): JSX.Element => {
    const { icon, name } = useUser();
    const localtion = useLocation();
    const { theme, setMode } = useTheme();
    const { i18n, setLanguage } = useI18n();

    const [autenticated, setAutenticated] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayUserOptions, setDisplayUserOptions] = useState(false);
    const [displayThemes, setDisplayThemes] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) setAutenticated(true);
    }, [localtion.pathname]);

    const handleUserClick = () => {
        setDisplayUserOptions(!displayUserOptions);
    };

    const handleThemesClick = () => {
        setDisplayThemes(!displayThemes);
    };

    const handleTheme = (theme: string) => {
        setMode(theme);
    };

    const handleLanguage = (language: string) => {
        setLanguage(language);
        localStorage.setItem('language', language);
    };

    return (
        <>
            <Nav>
                <NavLogo>VPM</NavLogo>
                <Hamburger open={displayMenu} onClick={() => setDisplayMenu(!displayMenu)}>
                    <Bar open={displayMenu} />
                    <Bar open={displayMenu} />
                    <Bar open={displayMenu} />
                </Hamburger>
                <NavMenu open={displayMenu}>
                    <NavItem theme={theme}>Menu 1</NavItem>
                    <NavItem theme={theme}>Menu 2</NavItem>
                    <NavItem theme={theme}>Menu 3</NavItem>
                    <NavItem theme={theme}>Menu 4</NavItem>
                    <Dropdown
                        data={[
                            { value: 'en', label: 'EN' },
                            { value: 'es', label: 'ES' }
                        ]}
                        selected={localStorage.getItem('language')}
                        fnc={handleLanguage}
                    />
                </NavMenu>
            </Nav>
        </>
        // <Header>
        //     <Navbar>
        //         <NavLogo>VPM</NavLogo>
        //         <NavMenu>
        //             {autenticated ? (
        //                 <>
        //                     <NavItem>
        //                         <NavLink>
        //                             <span>
        //                                 <RiFileListLine />
        //                             </span>
        //                             <span>Proyectos</span>
        //                         </NavLink>
        //                     </NavItem>
        //                     <NavItemRight>
        //                         <UserProfile onClick={handleUserClick}>{icon ? icon : nameToInitials(name)}</UserProfile>
        //                         {displayUserOptions && (
        //                             <DropDownRight>
        //                                 <ul className="list-reset">
        //                                     <li className="relative">
        //                                         <a
        //                                             href="#"
        //                                             className="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
        //                                         >
        //                                             <span className="flex-1">Crear</span>
        //                                         </a>
        //                                     </li>
        //                                 </ul>
        //                             </DropDownRight>
        //                         )}
        //                     </NavItemRight>
        //                 </>
        //             ) : (
        //                 <>
        //                     <NavItemRight>
        //                         <NavLink>
        //                             <Link to="/login">{i18n('sign_in')}</Link>
        //                         </NavLink>
        //                     </NavItemRight>
        //                     <NavItem>
        //                         <NavLink>
        //                             <Link to="/register">{i18n('sign_up')}</Link>
        //                         </NavLink>
        //                     </NavItem>
        //                     {/* <NavItem>
        //                         <NavLink>
        //                             <Dropdown
        //                                 data={[
        //                                     { value: 'light', label: 'Light' },
        //                                     { value: 'dark', label: 'Dark' },
        //                                     { value: 'material', label: 'Material' },
        //                                     { value: 'sharp', label: 'Sharp' },
        //                                     { value: 'calm', label: 'Calm' },
        //                                     { value: 'cherryBonBon', label: 'Cherry Bon Bon' },
        //                                     { value: 'seaWave', label: 'Sea Wave' }
        //                                 ]}
        //                                 icon={<RiPaletteLine />}
        //                                 fnc={handleTheme}
        //                             />
        //                         </NavLink>
        //                     </NavItem> */}
        //                     <NavItem>
        //                         <NavLink>
        //                             <Dropdown
        //                                 data={[
        //                                     { value: 'en', label: 'EN' },
        //                                     { value: 'es', label: 'ES' }
        //                                 ]}
        //                                 selected={localStorage.getItem('language')}
        //                                 fnc={handleLanguage}
        //                             />
        //                         </NavLink>
        //                     </NavItem>
        //                 </>
        //             )}
        //         </NavMenu>
        //         <StyledBurger onClick={() => setDisplayMenu(!displayMenu)}>
        //             <Menus />
        //             <Menus />
        //             <Menus />
        //         </StyledBurger>
        //     </Navbar>
        // </Header>
    );
};

export default Navbar;
