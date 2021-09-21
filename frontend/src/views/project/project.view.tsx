import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BsKanban } from 'react-icons/bs';
import { IoMdList } from 'react-icons/io';

import { getToken } from '@common/auth/auth.common';
import Sidebar from '@components/sidebar/sidebar.component';
import Backlog from '@views/backlog/backlog.view';
import Board from '@views/board/board.view';

interface IParams {
    projectCode: string;
}

interface IProject {
    name: string;
    image: string;
}

const Project = (): JSX.Element => {
    const { projectCode } = useParams<IParams>();

    const [project, setProject] = useState<IProject>();
    const [option, setOption] = useState('');

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

    /* eslint-disable indent */
    const renderOption = (): JSX.Element => {
        let render: JSX.Element = <Backlog projectCode={projectCode} />;
        switch (option) {
            case 'Backlog':
                render = <Backlog projectCode={projectCode} />;
                break;
            case 'Tablero':
                render = <Board />;
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
                        <Sidebar projectData={project} options={options} selected={option} selectedOption={selectedOption} />
                        {renderOption()}
                    </div>
                </>
            )}
        </>
    );
};

export default Project;
