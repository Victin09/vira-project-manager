import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { isAuthenticated } from '@common/auth/auth.common';
import { useUser } from '@common/context/user-context.common';
import { nameToInitials } from '@common/util/initials.common';

interface IMenuItem {
    name: string;
    path: string;
}

const Navbar = (): JSX.Element => {
    const { icon, name } = useUser();
    const localtion = useLocation();
    const [isOpen, setOpen] = useState(false);
    const [autenticated, setAutenticated] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) setAutenticated(true);
    }, []);

    const menuItems: IMenuItem[] = [
        {
            name: 'Proyectos',
            path: '/project'
        }
    ];

    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-0 text-gray-600 p-3 border-b-2">
            <Link to="/" className="flex items-center flex-shrink-0 text-gray-600 mr-6 hover:text-indigo-700">
                <span className="font-semibold text-xl tracking-tight">VPM</span>
                {/* <span className="ml-1">
                    Vira Project Manager
                </span> */}
            </Link>
            <div className="block lg:hidden">
                <button
                    onClick={() => {
                        setOpen(!isOpen);
                    }}
                    className="flex items-center px-3 py-2 border rounded border-teal-400 hover:text-indigo-700 hover:border-white"
                >
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
                {menuItems.map((menu, index) => (
                    <div className="text-sm lg:flex-grow" key={index}>
                        <Link
                            to={menu.path}
                            className={`block mt-4 lg:inline-block lg:mt-0 hover:text-indigo-700 mr-4${
                                localtion.pathname.includes(menu.path) ? ' border-b-2 border-indigo-700' : ''
                            }`}
                        >
                            {menu.name}
                        </Link>
                    </div>
                ))}
                <div>
                    {!autenticated ? (
                        <>
                            <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 hover:text-indigo-700 mr-4">
                                Iniciar sesión
                            </Link>
                            <Link to="/register" className="block mt-4 lg:inline-block lg:mt-0 hover:text-indigo-700 mr-4">
                                Registrate
                            </Link>
                        </>
                    ) : (
                        <div className="m-1 w-8 h-8 relative flex justify-center items-center rounded-full bg-indigo-700 text-xl text-white uppercase">
                            {icon ? icon : nameToInitials(name)}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
