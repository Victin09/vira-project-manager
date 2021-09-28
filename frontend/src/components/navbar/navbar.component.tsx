import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';
import { RiFileListLine } from 'react-icons/ri';

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

    const [projects, setProjects] = useState(false);
    const [profile, setProfile] = useState(false);
    // const [isOpen, setOpen] = useState(false);
    const [autenticated, setAutenticated] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) setAutenticated(true);
    }, [localtion.pathname]);

    const menuItems: IMenuItem[] = [
        {
            name: 'Proyectos',
            path: '/project'
        }
    ];

    return (
        <div className="w-full flex items-center justify-between flex-wrap text-gray-600">
            <div className="w-full py-3 px-5 bg-white rounded shadow" style={{ zIndex: 2 }}>
                <div className="-mx-1">
                    <ul className="flex w-full flex-wrap items-center h-10">
                        <li className="block relative">
                            <Link to="/" className="flex items-center flex-shrink-0 text-gray-600 mr-6 hover:text-indigo-700">
                                <span className="font-semibold text-xl tracking-tight">VPM</span>
                            </Link>
                        </li>
                        <li
                            className={`block relative${localtion.pathname.includes('/project') ? ' border-b-2 border-indigo-700' : ''}`}
                            onClick={() => setProjects(!projects)}
                        >
                            <div className="flex items-center h-10 leading-10 px-4 rounded cursor-pointer no-underline hover:no-underline transition-colors duration-100 mx-1 hover:bg-gray-100">
                                <span className="mr-3 text-xl">
                                    <RiFileListLine />
                                </span>
                                <span>Proyectos</span>
                                <span className="ml-2"> {projects ? <BiChevronDown /> : <BiChevronRight />}</span>
                            </div>
                            <div
                                className="bg-white shadow-md rounded border border-gray-300 text-sm absolute top-auto left-0 min-w-full w-56 z-30 mt-1"
                                style={{ display: projects ? 'block' : 'none' }}
                            >
                                {/* <span className="absolute top-0 left-0 w-3 h-3 bg-white border transform rotate-45 -mt-1 ml-6"></span> */}
                                <div className="bg-white rounded w-full relative z-10 py-1">
                                    <ul className="list-reset">
                                        <li className="relative">
                                            <Link
                                                to="/project/new"
                                                className="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                                            >
                                                <span className="flex-1">Crear</span>
                                                <span className="ml-2">
                                                    {' '}
                                                    <i className="mdi mdi-chevron-right"></i>{' '}
                                                </span>
                                            </Link>
                                            {/* <div
                                                className="bg-white shadow-md rounded border border-gray-300 text-sm absolute inset-l-full top-0 min-w-full w-56 z-30 mt-1"
                                                x-show="showChildren"
                                                style={{ display: 'none' }}
                                            >
                                                <span className="absolute top-0 left-0 w-3 h-3 bg-white border transform rotate-45 -ml-1 mt-2"></span>
                                                <div className="bg-white rounded w-full relative z-10 py-1">
                                                    <ul className="list-reset">
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                                                            >
                                                                {' '}
                                                                <span className="flex-1">Accordion</span>{' '}
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                                                            >
                                                                {' '}
                                                                <span className="flex-1">Buttons</span>{' '}
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                                                            >
                                                                {' '}
                                                                <span className="flex-1">Badges</span>{' '}
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                                                            >
                                                                {' '}
                                                                <span className="flex-1">Breadcrumbs</span>{' '}
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                                                            >
                                                                {' '}
                                                                <span className="flex-1">Dropdown</span>{' '}
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                                                            >
                                                                {' '}
                                                                <span className="flex-1">Modals</span>{' '}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="block relative ml-auto">
                            <div className="flex items-center h-10 leading-10 px-4 rounded cursor-pointer no-underline hover:no-underline transition-colors duration-100 mx-1 hover:bg-gray-100">
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
                                    <div
                                        className="m-1 w-8 h-8 relative flex justify-center items-center rounded-full bg-indigo-700 text-xl text-white uppercase"
                                        onClick={() => setProfile(!profile)}
                                    >
                                        {icon ? icon : nameToInitials(name)}
                                    </div>
                                )}
                            </div>
                            <div
                                className="bg-white shadow-md rounded border border-gray-300 text-sm absolute top-auto left-0 min-w-full w-56 z-30 mt-1"
                                style={{ display: profile ? 'block' : 'none', left: '-185%' }}
                            >
                                {/* <span
                                    className="absolute top-0 w-3 h-3 bg-white border transform rotate-45 -mt-1 ml-6"
                                    style={{ left: '12em' }}
                                ></span> */}
                                <div className="bg-white rounded w-full relative z-10 py-1">
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
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        // <nav className="flex items-center justify-between flex-wrap bg-gray-0 text-gray-600 p-3 border-b-2">
        //     <Link to="/" className="flex items-center flex-shrink-0 text-gray-600 mr-6 hover:text-indigo-700">
        //         <span className="font-semibold text-xl tracking-tight">VPM</span>
        //         {/* <span className="ml-1">
        //             Vira Project Manager
        //         </span> */}
        //     </Link>
        //     <div className="block lg:hidden">
        //         <button
        //             onClick={() => {
        //                 setOpen(!isOpen);
        //             }}
        //             className="flex items-center px-3 py-2 border rounded border-teal-400 hover:text-indigo-700 hover:border-white"
        //         >
        //             <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        //                 <title>Menu</title>
        //                 <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        //             </svg>
        //         </button>
        //     </div>
        //     <div className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
        //         {menuItems.map((menu, index) => (
        //             <div className="text-sm lg:flex-grow" key={index}>
        //                 <Link
        //                     to={menu.path}
        //                     className={`block mt-4 lg:inline-block lg:mt-0 hover:text-indigo-700 mr-4${
        //                         localtion.pathname.includes(menu.path) ? ' border-b-2 border-indigo-700' : ''
        //                     }`}
        //                 >
        //                     {menu.name}
        //                 </Link>
        //             </div>
        //         ))}
        //         <div>
        //             {!autenticated ? (
        //                 <>
        //                     <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 hover:text-indigo-700 mr-4">
        //                         Iniciar sesión
        //                     </Link>
        //                     <Link to="/register" className="block mt-4 lg:inline-block lg:mt-0 hover:text-indigo-700 mr-4">
        //                         Registrate
        //                     </Link>
        //                 </>
        //             ) : (
        //                 <div className="m-1 w-8 h-8 relative flex justify-center items-center rounded-full bg-indigo-700 text-xl text-white uppercase">
        //                     {icon ? icon : nameToInitials(name)}
        //                 </div>
        //             )}
        //         </div>
        //     </div>
        // </nav>
    );
};

export default Navbar;
