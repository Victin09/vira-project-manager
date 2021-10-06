import { pipelineTopicExpression } from '@babel/types';
import { ITheme, useTheme } from '@common/hooks/theme.hook';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface IDropdownData {
    label: string;
    value: string;
}

interface IDropdown {
    data: IDropdownData[];
    title?: string;
    icon?: JSX.Element;
    fnc: (value: string) => void;
    selected?: string;
}

const DropdownElement = styled.div<{ theme: ITheme }>`
    border-radius: ${(props) => props.theme.schema.general.borderRadius};
    background-color: ${(props) => props.theme.schema.colors.primary};
`;

const DropdownHeader = styled.div`
    /* padding: 15px; */
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DropdownBody = styled.div<{ theme: ITheme; open: boolean }>`
    padding: 5px;
    border: ${(props) => props.theme.schema.general.border};
    display: ${(props) => (props.open ? 'block' : 'none')};
    box-shadow: ${(props) => props.theme.schema.general.shadow};
    position: absolute;
    background-color: ${(props) => props.theme.schema.colors.primary};
    border-radius: ${(props) => props.theme.schema.general.borderRadius};
    margin-left: auto;
    right: 0;
    margin-top: 0.9em;
`;

const DropdownItem = styled.div`
    padding: 10px;
    display: flex;

    :hover {
        cursor: pointer;
        color: ${(props) => props.theme.schema.text.hover};
    }
`;

const DropdownItemDot = styled.div<{ selected: boolean }>`
    opacity: ${(props) => (props.selected ? 1 : 0)};
    color: ${(props) => props.theme.schema.text.color};
    transition: all 0.2s ease-in-out;
    margin-right: 0.25em;
`;

const Dropdown = ({ data, title, icon, fnc, selected }: IDropdown): JSX.Element => {
    const { theme } = useTheme();

    const [isOpen, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    useEffect(() => {
        if (selected) setSelectedItem(selected);
    }, []);

    const toggleDropdown = () => {
        setOpen(!isOpen);
    };

    const handleItemClick = (id: string) => {
        setSelectedItem(id);
        fnc(id);
    };

    const renderLabel = () => {
        if (selected && !selectedItem) {
            return data.find((item) => item && item.value === selected)?.label;
        } else if (selected && selectedItem) {
            return data.find((item) => item && item.value === selectedItem)?.label;
        } else if (!selected && icon) {
            return icon;
        } else if (!selected && !icon && selectedItem) {
            return data.find((item) => item && item.value === selectedItem)?.label;
        } else {
            return title;
        }
    };

    return (
        <DropdownElement>
            <DropdownHeader onClick={toggleDropdown}>
                {renderLabel()}
                {/* <i className={`fa fa-chevron-right icon ${isOpen && 'open'}`}></i> */}
            </DropdownHeader>
            <DropdownBody open={isOpen} theme={theme}>
                {data.map((item: IDropdownData, index: number) => (
                    <DropdownItem onClick={() => handleItemClick(item.value)} id={item.value} key={index}>
                        <DropdownItemDot selected={item.value == selectedItem}>•</DropdownItemDot>
                        {item.label}
                    </DropdownItem>
                ))}
            </DropdownBody>
        </DropdownElement>
    );
};

export default Dropdown;
