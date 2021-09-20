import { nameToInitials } from '@common/util/initials.common';
import React from 'react';

interface IProject {
    name: string;
    image: string;
}

interface ISidebar {
    projectData: IProject;
    options: string[];
    selectedOption: (selected: string) => void;
}

const Sidebar = ({ projectData, options, selectedOption }: ISidebar): JSX.Element => {
    return (
        <div
            className="h-full border-r-2 text-gray-600 md:w-64 w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto"
            data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
        >
            <div className="flex flex-col space-y-6 h-full">
                <div className="flex items-center space-x-2 px-4">
                    <div className="m-1 w-10 h-10 relative flex justify-center items-center rounded bg-indigo-700 text-white text-xl uppercase">
                        {projectData.image ? projectData.image : nameToInitials(projectData.name)}
                    </div>
                    <span className="text-2xl font-extrabold whitespace-nowrap truncate">{projectData.name}</span>
                </div>
                <hr />
                <div className="space-y-6">
                    asdfasdfasdf
                    {console.log('options', options)}
                    {options.map((element, index) => (
                        <div
                            className="flex items-center text-gray-600 space-x-2 py-2 px-4 transition duration-200 hover:bg-indigo-700 hover:text-white group"
                            key={index}
                        >
                            <span className="w-4 h-4 flex-shrink-0 border border-gray-600 rounded group-hover:border-gray-400 transition duration-200"></span>
                            <span>{element}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
