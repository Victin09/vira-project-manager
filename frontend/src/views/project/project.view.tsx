import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BsKanban } from 'react-icons/bs';
import { IoMdList } from 'react-icons/io';

import { getToken } from '@common/auth/auth.common';
import ProjectSidebar from '@components/sidebar/project-sidebar.component';
import Backlog from '@views/backlog/backlog.view';
import Board from '@views/board/board.view';
import IssueSidebar from '@components/sidebar/issue-sidebar.component';
import ProjectDetails from '@views/project-settings/project-details.view';
import ProjectAccess from '@views/project-settings/project-access.view';

interface IParams {
    projectCode: string;
}

interface IProject {
    name: string;
    description: string;
    image: string;
}

const Project = (): JSX.Element => {
    const { projectCode } = useParams<IParams>();

    const [project, setProject] = useState<IProject>();
    const [option, setOption] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [issue, setIssue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await (
                await fetch(`${process.env.API_URL}/projects/find/` + projectCode, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json'
                    }
                })
            ).json();
            if (result.name) {
                setProject(result);
                setOption('Backlog');
            }
        };

        fetchData();
    }, []);

    const displayOptions = (item: any) => {
        console.log('item', item);
        setIssue(item);
    };

    const selectedOption = (selected: string) => {
        setOption(selected);
    };

    const options = [
        {
            title: 'Backlog',
            icon: <BsKanban />
        },
        {
            title: 'Tablero',
            icon: <IoMdList />
        }
    ];

    const settings = [
        {
            title: 'Detalles'
        },
        {
            title: 'Acceso'
        }
    ];

    /* eslint-disable indent */
    const renderOption = (): JSX.Element => {
        let render: JSX.Element = <Backlog projectCode={projectCode} displayOptions={displayOptions} setDisplayOptions={setShowOptions} />;
        switch (option) {
            case 'Backlog':
                render = <Backlog projectCode={projectCode} displayOptions={displayOptions} setDisplayOptions={setShowOptions} />;
                break;
            case 'Tablero':
                render = <Board projectCode={projectCode} />;
                break;
            default:
                break;
        }
        return render;
    };

    const renderSettings = () => {
        let render: JSX.Element = <Backlog projectCode={projectCode} displayOptions={displayOptions} setDisplayOptions={setShowOptions} />;
        switch (option) {
            case 'Detalles':
                render = <ProjectDetails projectCode={projectCode} />;
                break;
            case 'Accesso':
                render = <ProjectAccess projectCode={projectCode} />;
                break;
            default:
                break;
        }
        return render;
    };

    return (
        <>
            {project && (
                <>
                    <div className="h-full flex">
                        <ProjectSidebar
                            projectData={project}
                            options={options}
                            selected={option}
                            selectedOption={selectedOption}
                            settings={settings}
                            showSettings={showSettings}
                            setShowSettings={setShowSettings}
                        />
                        {!showSettings ? renderOption() : renderSettings()}
                        <IssueSidebar display={showOptions} setDisplay={setShowOptions} item={issue} projectCode={projectCode} />
                    </div>
                </>
            )}
        </>
    );
};

export default Project;
