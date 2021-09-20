import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getToken } from '@common/auth/auth.common';
import Sidebar from '@components/sidebar/sidebar.component';

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
        console.log('code', projectCode);
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
            }
        };

        fetchData();
    }, []);

    const selectedOption = (selected: string) => {
        setOption(selected);
    };

    return (
        <>
            {console.log('project', project)}
            {project && (
                <div className="h-full">
                    <Sidebar projectData={project} options={['Backlog', 'Tablero']} selectedOption={selectedOption} />
                </div>
            )}
        </>
    );
};

export default Project;
