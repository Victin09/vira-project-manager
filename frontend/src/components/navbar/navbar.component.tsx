import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiFileListLine, RiPaletteLine } from 'react-icons/ri';
import styled, { css } from 'styled-components';

import { isAuthenticated } from '@common/auth/auth.common';
import { useUser } from '@common/context/user-context.common';
import { nameToInitials } from '@common/util/initials.common';
import { useTheme } from '@common/hooks/theme.hook';

interface IMenuItem {
    name: string;
    path: string;
}

interface IComponent {
    displayMenu: boolean;
}

const Navbar = (): JSX.Element => {
    const { icon, name } = useUser();
    const localtion = useLocation();
    const { setMode } = useTheme();

    const [autenticated, setAutenticated] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayUserOptions, setDisplayUserOptions] = useState(false);
    const [displayThemes, setDisplayThemes] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) setAutenticated(true);
    }, [localtion.pathname]);

    const menuItems: IMenuItem[] = [
        {
            name: 'Proyectos',
            path: '/project'
        }
    ];

    const Header = styled.header`
        backdrop-filter: blur(16px) saturate(180%);
        -webkit-backdrop-filter: blur(16px) saturate(180%);
        background-color: ${({ theme }) => theme.colors.body};
        border: 1px solid rgba(209, 213, 219, 0.3);
    `;

    const Navbar = styled.nav`
        display: flex;
        align-items: center;
        padding: 1rem 1.5rem;
        color: rgb(87, 87, 87);
    `;

    const NavLogo = styled.span`
        font-size: 1.5rem;
        font-weight: 500;
        font-weight: bold;
    `;

    const NavMenu = styled.ul`
        display: flex;
        align-items: center;
        width: 100%;

        @media only screen and (max-width: 768px) {
            position: fixed;
            height: 100%;
            left: -100%;
            top: 5rem;
            flex-direction: column;
            background-color: #fff;
            width: 100%;
            border-radius: 10px;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            ${displayMenu && 'left: 0;'}
        }
    `;

    const NavItem = styled.li`
        margin-left: 2rem;

        @media only screen and (max-width: 768px) {
            margin: 2.5rem 0;
        }
    `;

    const NavItemRight = styled.li`
        margin-left: auto;

        @media only screen and (max-width: 768px) {
            margin-left: 0;
        }
    `;

    const NavLink = styled.div`
        display: flex;
        align-items: center;
        font-weight: 400;
        color: #475569;
        cursor: pointer;

        :hover {
            color: #482ff7;
        }
    `;

    const Hamburger = styled.div`
        display: none;

        @media only screen and (max-width: 768px) {
            display: block;
            position: relative;
            cursor: pointer;
            margin-left: auto;
        }
    `;

    const Bar = styled.span`
        display: block;
        width: 25px;
        height: 3px;
        margin: 5px auto;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        background-color: #101010;

        @media only screen and (max-width: 768px) {
            display: block;
            position: relative;
            cursor: pointer;
            margin-left: auto;

            ${displayMenu &&
            css`
                :nth-child(2) {
                    opacity: 0;
                }
                :nth-child(1) {
                    transform: translateY(8px) rotate(45deg);
                }
                :nth-child(3) {
                    transform: translateY(-8px) rotate(-45deg);
                }
            `}
        }
    `;

    const UserProfile = styled.div`
        display: inline-block;
        width: 2em;
        height: 2em;
        color: white;
        opacity: 1;
        content: attr(data-initials);
        display: inline-block;
        font-weight: bold;
        vertical-align: middle;
        line-height: 2em;
        text-align: center;
        background-color: #482ff7;
        border-radius: 50%;
        cursor: pointer;

        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;

        @media only screen and (max-width: 768px) {
            margin-bottom: 2em;
        }
    `;

    const DropDownRight = styled.div`
        background-color: white;
        position: absolute;
        left: auto;
        right: 0;
        padding: 0.5em;
        margin-right: 0.1em;
        margin-top: 5em;
        border-radius: 0.25em;
        /* border: 1px solid gray; */

        @media only screen and (max-width: 768px) {
            left: 0;
            right: 0;
            border: none;
            border-radius: 0;
            background-color: gray;
            margin-top: 0;
        }
    `;

    const handleUserClick = () => {
        setDisplayUserOptions(!displayUserOptions);
    };

    const handleThemesClick = () => {
        setDisplayThemes(!displayThemes);
    };

    const handleTheme = (theme: string) => {
        setMode(theme);
    };

    return (
        <Header>
            <Navbar>
                <NavLogo>VPM</NavLogo>
                <NavMenu>
                    {autenticated ? (
                        <>
                            <NavItem>
                                <NavLink>
                                    <span>
                                        <RiFileListLine />
                                    </span>
                                    <span>Proyectos</span>
                                </NavLink>
                            </NavItem>
                            <NavItemRight>
                                <UserProfile onClick={handleUserClick}>{icon ? icon : nameToInitials(name)}</UserProfile>
                                {displayUserOptions && (
                                    <DropDownRight>
                                        <ul className="list-reset">
                                            <li className="relative">
                                                <a
                                                    href="#"
                                                    className="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                                                >
                                                    <span className="flex-1">Crear</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </DropDownRight>
                                )}
                            </NavItemRight>
                        </>
                    ) : (
                        <>
                            <NavItemRight>
                                <NavLink>
                                    <Link to="/login">Iniciar sesión</Link>
                                </NavLink>
                            </NavItemRight>
                            <NavItem>
                                <NavLink>
                                    <Link to="/register">Registrate</Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <span>
                                        <RiPaletteLine onClick={handleThemesClick} />
                                    </span>
                                </NavLink>
                            </NavItem>
                            {displayThemes && (
                                <DropDownRight>
                                    <ul>
                                        <li onClick={() => handleTheme('light')}>Light</li>
                                        <li onClick={() => handleTheme('dark')}>Dark</li>
                                        <li>Sharp</li>
                                        <li>Calm</li>
                                        <li>Cherry Bon Bon</li>
                                        <li>Sea Wave</li>
                                    </ul>
                                </DropDownRight>
                            )}
                        </>
                    )}
                </NavMenu>
                <Hamburger onClick={() => setDisplayMenu(!displayMenu)}>
                    <Bar />
                    <Bar />
                    <Bar />
                </Hamburger>
            </Navbar>
        </Header>
    );
};

export default Navbar;
