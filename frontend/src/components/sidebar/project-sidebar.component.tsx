import React, { useState } from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import styled from 'styled-components';

import { nameToInitials } from '@common/util/initials.common';
import { ITheme, useTheme } from '@common/context/theme-context.common';

interface IType {
    name: string;
}

interface IProject {
    name: string;
    description: string;
    image: string;
    type: IType;
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

const SidebarContainer = styled.div<{ ct: ITheme }>`
    border-right: ${(props) => props.ct.schema.general.border};
    background-color: ${(props) => props.ct.schema.colors.secondary};
    min-width: 20em;
    width: 20em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    left: 0;
`;

const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1em;
    margin-bottom: 1em;
`;

const Image = styled.div<{ ct: ITheme }>`
    width: 3.5em;
    height: 3.5em;
    border-radius: 25%;
    font-size: 1em;
    color: ${(props) => props.ct.schema.button.text};
    font-weight: bold;
    line-height: 3.5em;
    text-align: center;
    background: ${(props) => props.ct.schema.button.background};  
    margin-right: 1em;

    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProjectName = styled.span<{ ct: ITheme }>`
    font-weight: bolder;
    font-size: 2em;
    color: ${(props) => props.ct.schema.text.color};
`;

const ProjectDescription = styled.span<{ ct: ITheme }>`
    font-size: 1em;
    font-style: italic;
    color: ${(props) => props.ct.schema.text.color};
`;

const SidebarSeparator = styled.hr`
    width: 100%;
    margin-top: 2em;
    margin-bottom: 2em;
    opacity: 0.25;
`;

const SidebarBody = styled.div<{ ct: ITheme }>`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const SidebarOption = styled.span<{ ct: ITheme, selected: boolean }>`
    color: ${(props) => props.selected ? props.ct.schema.button.text : props.ct.schema.text.color};
    background-color: ${(props) => props.selected && props.ct.schema.button.background};
    cursor: pointer;
    padding: 1em;
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    display: flex;
    align-items: center;

    :hover {
        color: ${(props) => !props.selected && props.ct.schema.text.hover};
    }
`;

const SidebarFooter = styled.div<{ ct: ITheme }>`
    display: flex;
    justify-content: center;
    color: ${(props) => props.ct.schema.text.color};
    font-size: 1em;
`;

const SidebarFooterText = styled.div<{ ct: ITheme }>`
    color: ${(props) => props.ct.schema.text.color};
    opacity: 0.5;
    font-style: italic;
`;

const TextWithIcon = styled.div`
    display: flex;
    align-items: center;
`;

const BackOptionText = styled.span`
    margin-left: 0.5em;
`;

const Sidebar = ({ projectData, options, selected, selectedOption, settings, showSettings, setShowSettings }: ISidebar): JSX.Element => {
    const { theme } = useTheme();

    const handleOptions = (option: string) => {
        if (option === 'Ajustes') setShowSettings(!showSettings);
        else selectedOption(option);
    }

    return (
        <SidebarContainer ct={theme}>
            <SidebarHeader>
                {projectData.image ? (
                    <img className="m-1 w-10 h-10 relative flex justify-center items-center rounded" src={projectData.image} />
                ) : (
                    <Image ct={theme}>
                        {nameToInitials(projectData.name)}
                    </Image>
                )}
                <TextContainer>
                    <ProjectName ct={theme}>{projectData.name.toUpperCase()}</ProjectName>
                    <ProjectDescription ct={theme}>{projectData.description}</ProjectDescription>
                </TextContainer>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarBody ct={theme}>
                {!showSettings ? (
                    <>
                        {options.map((element, index) => (
                            <SidebarOption
                                ct={theme}
                                selected={selected === element.title}
                                key={index}
                                onClick={() => handleOptions(element.title)}
                            >
                                <TextWithIcon>
                                    {element.icon}
                                    &nbsp; &nbsp;
                                    {element.title}
                                </TextWithIcon>
                            </SidebarOption>
                        ))}
                    </>
                ) : (
                    <>
                        <SidebarOption
                            ct={theme}
                            selected={false}
                            onClick={() => setShowSettings(false)}
                        >
                            <TextWithIcon>
                                <IoChevronBackCircleSharp />
                                <BackOptionText>Volver al proyecto</BackOptionText>
                            </TextWithIcon>
                        </SidebarOption>
                        <SidebarSeparator />
                        {settings.map((element, index) => (
                            <SidebarOption
                                ct={theme}
                                selected={selected === element.title}
                                key={index}
                                onClick={() => selectedOption(element.title)}
                            >
                                {element.title}
                            </SidebarOption>
                        ))}
                    </>
                )}
            </SidebarBody>
            <SidebarFooter ct={theme}>
                <SidebarFooterText ct={theme}>Este proyecto es de tipo {projectData.type.name}</SidebarFooterText>
            </SidebarFooter>
        </SidebarContainer>
    );
};

export default Sidebar;
