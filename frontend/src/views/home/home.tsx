import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useUser } from '@common/context/user-context.common';
import { getToken, isAuthenticated } from '@common/auth/auth.common';
import { nameToInitials } from '@common/util/initials.common';
import { ITheme, useTheme } from '@common/context/theme-context.common';
import { Column, Row } from '@components/ui/column.component';
import { Container } from '@components/ui/container.component';

interface IProject {
    name: string;
    code: string;
    description: string;
    image: string;
    type: IType;
    users: IUser[];
    responsible: IUser;
}

interface IType {
    name: string;
    description: string;
}

interface IUser {
    email: string;
    name: string;
    icon?: string;
}

const ProjectsContainer = styled.div<{ ct: ITheme }>`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Grid = styled.div<{ ct: ITheme }>`
    display: grid;
    grid-template-columns: 
        minmax(4em, 4fr)
        minmax(4em, 4fr)
        minmax(8em, 8fr)
        minmax(4px, 4fr)
    ;
    /* border: ${(props) => props.ct.schema.general.border}; */
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    margin-top: 2em;
`;

const GridRowTitle = styled.div<{ ct: ITheme }>`
    border-bottom: ${(props) => props.ct.schema.general.border};
`;

const GridColumnTitle = styled.div<{ ct: ITheme }>`
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    text-align: left;
`;

const GridRow = styled.div<{ ct: ITheme }>`
    display: contents;
`;

const GridColumnData = styled.div<{ ct: ITheme }>`
    /* border: ${(props) => props.ct.schema.general.border}; */
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    text-align: left;
    margin-top: 1em;
`;

const Home = (): JSX.Element => {
    const { email } = useUser();
    const { theme } = useTheme();

    const [projects, setProjects] = useState<IProject[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await (
                await fetch(`${process.env.API_URL}/projects/find-user/${email}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json'
                    }
                })
            ).json();
            if (result.length > 0) setProjects(result);
        };

        fetchData();
    }, []);

    return (
        <>
            {!projects.length && !email ? (
                <Container ct={theme} auth={isAuthenticated()}>
                    <Row fullHeight center>
                        <Column xs="12" sm="12" md="12" lg="12">
                            No tienes ningún proyecto asociado{' '}
                            <Link to="/project/new">
                                Crea un proyecto
                            </Link>
                        </Column>
                    </Row>
                </Container>
            ) : (
                <Container ct={theme} auth={isAuthenticated()}>
                    <Row fullHeight center>
                        <Column xs="12" sm="12" md="10" lg="8">
                            <ProjectsContainer ct={theme}>
                                <div>
                                    <h2 className="text-2xl font-semibold leading-tight">Proyectos</h2>
                                </div>
                                <Grid ct={theme}>
                                    <GridRowTitle ct={theme}>
                                        <GridColumnTitle ct={theme}>
                                            Nombre
                                        </GridColumnTitle>
                                        <GridColumnTitle ct={theme}>
                                            Tipo
                                        </GridColumnTitle>
                                        <GridColumnTitle ct={theme}>
                                            Descripcion
                                        </GridColumnTitle>
                                        <GridColumnTitle ct={theme}>
                                            Responsable
                                        </GridColumnTitle>
                                    </GridRowTitle>
                                    {projects.map((project, index) => (
                                        <GridRow ct={theme}>
                                            <GridColumnData ct={theme}>
                                                {project.name}
                                            </GridColumnData>
                                            <GridColumnData ct={theme}>
                                                {project.type.name}
                                            </GridColumnData>
                                            <GridColumnData ct={theme}>
                                                {project.description}
                                            </GridColumnData>
                                            <GridColumnData ct={theme}>
                                                {project.responsible.name}
                                            </GridColumnData>
                                                {/* <td className="px-5 py-5 bg-white text-sm">
                                                    <div className="flex items-center">
                                                        {project.image ? (
                                                            <img
                                                            className="m-1 w-10 h-10 relative flex justify-center items-center rounded"
                                                            src={project.image}
                                                            />
                                                            ) : (
                                                                <div
                                                                className="m-1 w-10 h-10 relative flex justify-center items-center rounded bg-indigo-700 text-xl text-white uppercase"
                                                                key={index}
                                                                >
                                                                {nameToInitials(project.name)}
                                                            </div>
                                                        )}
                                                        <Link
                                                            to={`/project/view/${project.code}`}
                                                            className="ml-1 font-bold text-indigo-700 whitespace-no-wrap cursor-pointer hover:underline hover:text-indigo-700 hover:italic"
                                                            >
                                                            {project.name}
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 bg-white text-sm">
                                                    <p className="text-gray-600 whitespace-no-wrap">{project.type.name}</p>
                                                </td>
                                                <td className="px-5 py-5 bg-white text-sm">
                                                    <p className="text-gray-600 whitespace-no-wrap">{project.description}</p>
                                                </td>
                                                <td className="px-5 py-5 bg-white text-sm flex items-center">
                                                    <div
                                                        className="m-1 w-8 h-8 relative flex justify-center items-center rounded-full bg-indigo-700 text-xl text-white uppercase"
                                                        key={index}
                                                        >
                                                        {project.responsible.icon
                                                            ? project.responsible.icon
                                                            : nameToInitials(project.responsible.name)}
                                                    </div>
                                                    <span className="ml-1 text-indigo-700 whitespace-no-wrap cursor-pointer hover:underline hover:text-indigo-700">
                                                        {project.responsible.name}
                                                    </span>
                                                </td> */}
                                        </GridRow>
                                    ))}
                                </Grid>
                            </ProjectsContainer>
                        </Column>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default Home;
