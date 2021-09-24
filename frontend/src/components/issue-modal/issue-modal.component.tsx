import React from 'react';

interface IIssueModal {
    selectedIssue: string;
}

const IssueModal = ({ selectedIssue }: IIssueModal): JSX.Element => {
    return (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <a href="#" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                your profile
            </a>
            <a href="#" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                Your projects
            </a>
            <a href="#" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                Help
            </a>
            <a href="#" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                Settings
            </a>
            <a href="#" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                Sign Out
            </a>
        </div>
    );
};

export default IssueModal;
