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

const Header = styled.h4<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.color};
    font-size: large;
    text-transform: uppercase;
`;

const Grid = styled.table<{ ct: ITheme }>`
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    table-layout: fixed;
    border-radius: ${(props) => props.ct.schema.general.borderRadius};

    @media screen and (max-width: 600px) {
        border: 0;
    }
`;

const GridRow = styled.tr<{ ct: ITheme }>`
    padding: .35em;

    @media screen and (max-width: 600px) {
        border-bottom: 3px solid #ddd;
        display: block;
        margin-bottom: .625em;
    }
`;

const GridHead = styled.thead<{ ct: ITheme }>`
    border-bottom: ${(props) => props.ct.schema.general.border};
    background-color: ${(props) => props.ct.schema.colors.secondary};

    @media screen and (max-width: 600px) {
        border: none;
        clip: rect(0 0 0 0);
        height: 1em;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1em;
    }
`;

const GridHeadColumn = styled.th<{ ct: ITheme }>`
    padding: 1.5em;
    text-align: left;
    font-size: .85em;
    letter-spacing: .1em;
    text-transform: uppercase;
`;

const GridBody = styled.tbody<{ ct: ITheme }>`
`;

const GridBodyColumn = styled.td<{ ct: ITheme }>`
    padding: 1.5em;

    @media screen and (max-width: 600px) {
        border-bottom: 1px solid #ddd;
        display: block;
        font-size: .8em;
        text-align: right;

        ::before {
            content: attr(data-label);
            float: left;
            font-weight: bold;
            text-transform: uppercase;
        }

        :last-child {
            border-bottom: 0;
        }
    }
`;

const GridBodyColumnWithImage = styled.td<{ ct: ITheme }>`
    padding: 1.5em;
    display: flex;
    align-items: center;

    @media screen and (max-width: 600px) {
        border-bottom: 1px solid #ddd;
        display: block;
        font-size: .8em;
        text-align: right;

        ::before {
            content: attr(data-label);
            float: left;
            font-weight: bold;
            text-transform: uppercase;
        }

        :last-child {
            border-bottom: 0;
        }
    }
`;

const GridBodyColumnData = styled.span<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.color};
`;

const GridBodyColumnDataClickable = styled.span<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.hover};

    :hover {
        cursor: pointer;
        font-weight: bold;
    }
`;

const GridBodyColumnDataImage = styled.div<{ ct: ITheme }>`
    width: 3em;
    height: 3em;
    border-radius: 25%;
    font-size: 1em;
    color: ${(props) => props.ct.schema.button.text};
    font-weight: bold;
    line-height: 3em;
    text-align: center;
    background: ${(props) => props.ct.schema.button.background};  
    margin-right: .5em;

    @media screen and (max-width: 600px) {
        display: none;
    }
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
                               <Header ct={theme}>Proyectos</Header>
                                <Grid ct={theme}>
                                    <GridHead ct={theme}>
                                        <GridRow ct={theme}>
                                            <GridHeadColumn ct={theme}>
                                                Nombre
                                            </GridHeadColumn>
                                            <GridHeadColumn ct={theme}>
                                                Tipo
                                            </GridHeadColumn>
                                            <GridHeadColumn ct={theme}>
                                                Descripcion
                                            </GridHeadColumn>
                                            <GridHeadColumn ct={theme}>
                                                Responsable
                                            </GridHeadColumn>
                                        </GridRow>
                                    </GridHead>
                                        <GridBody ct={theme}>
                                            {projects.map((project, index) => (
                                                <GridRow ct={theme} key={index}>
                                                    <GridBodyColumnWithImage ct={theme} data-label="Nombre">
                                                        <GridBodyColumnDataImage ct={theme}>
                                                            {nameToInitials(project.name)}
                                                        </GridBodyColumnDataImage>
                                                        <GridBodyColumnDataClickable ct={theme}>
                                                            <Link to={`/project/view/${project.code}`}>{project.name}</Link>
                                                        </GridBodyColumnDataClickable>
                                                    </GridBodyColumnWithImage>
                                                    <GridBodyColumn ct={theme} data-label="Tipo">
                                                        <GridBodyColumnData ct={theme}>
                                                            {project.type.name}
                                                        </GridBodyColumnData>
                                                    </GridBodyColumn>
                                                    <GridBodyColumn ct={theme} data-label="Descripcion">
                                                        <GridBodyColumnData ct={theme}>
                                                            {project.description}
                                                        </GridBodyColumnData>
                                                    </GridBodyColumn>
                                                    <GridBodyColumnWithImage ct={theme} data-label="Responsable">
                                                        <GridBodyColumnDataImage ct={theme}>
                                                            {nameToInitials(project.responsible.name)}
                                                        </GridBodyColumnDataImage>
                                                        <GridBodyColumnDataClickable ct={theme}>
                                                            <Link to={`/user/view/${project.responsible.email}`}>{project.responsible.name}</Link>
                                                        </GridBodyColumnDataClickable>
                                                    </GridBodyColumnWithImage>
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
                                    </GridBody>
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
