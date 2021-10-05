import React, { useState } from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';
import { IoChevronBackCircleSharp } from 'react-icons/io5';

import { nameToInitials } from '@common/util/initials.common';

interface IProject {
    name: string;
    description: string;
    image: string;
}

interface IOption {
    title: string;
    icon?: JSX.Element;
}

interface ISidebar {
    projectData: IProject;
    options: IOption[];
    selected: string;
    selectedOption: (selected: string) => void;
    settings: IOption[];
    showSettings: boolean;
    setShowSettings: (show: boolean) => void;
}

const Sidebar = ({ projectData, options, selected, selectedOption, settings, showSettings, setShowSettings }: ISidebar): JSX.Element => {
    return (
        <div
            className="h-full border-r-2 bg-gray-50 text-gray-600 md:w-64 w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out md:flex md:flex-col md:justify-between overflow-y-auto"
            data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
        >
            <div className="flex flex-col space-y-6 h-full min-w-full">
                <div className="flex items-center space-x-2 px-4">
                    {projectData.image ? (
                        <img className="m-1 w-10 h-10 relative flex justify-center items-center rounded" src={projectData.image} />
                    ) : (
                        <div className="m-1 p-1 w-10 h-10 relative flex justify-center items-center rounded bg-indigo-700 text-white text-xl uppercase">
                            {nameToInitials(projectData.name)}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-2xl font-extrabold">{projectData.name}</span>
                        <span className="text-xl font-thin italic">{projectData.description}</span>
                    </div>
                </div>
                <hr />
                <div className="space-y-6 cursor-pointer h-full">
                    {!showSettings ? (
                        <>
                            {options.map((element, index) => (
                                <div
                                    className={`flex items-center space-x-2 py-2 px-4 hover:bg-indigo-700 hover:text-white ${
                                        selected === element.title ? ' bg-indigo-700 text-white' : ' text-gray-600'
                                    }`}
                                    key={index}
                                    onClick={() => selectedOption(element.title)}
                                >
                                    <span className="flex justify-center items-center">
                                        {element.icon}
                                        &nbsp; &nbsp;
                                        {element.title}
                                    </span>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <div
                                className="flex items-center space-x-2 py-2 px-4 hover:bg-indigo-700 hover:text-white"
                                onClick={() => setShowSettings(false)}
                            >
                                <span className="flex justify-center items-center">
                                    <IoChevronBackCircleSharp />
                                    <span className="ml-2">Volver al proyecto</span>
                                </span>
                            </div>
                            <hr />
                            {settings.map((element, index) => (
                                <div
                                    className={`flex items-center space-x-2 py-2 px-4 hover:bg-indigo-700 hover:text-white ${
                                        selected === element.title ? ' bg-indigo-700 text-white' : ' text-gray-600'
                                    }`}
                                    key={index}
                                    onClick={() => selectedOption(element.title)}
                                >
                                    <span className="flex justify-center items-center">{element.title}</span>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div className="flex justify-end p-2 cursor-pointer text-xl">
                    <AiTwotoneSetting onClick={() => setShowSettings(!showSettings)} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;