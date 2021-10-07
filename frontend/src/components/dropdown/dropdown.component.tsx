import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ITheme, useTheme } from '@common/context/theme-context.common';

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

const DropdownElement = styled.div<{ ct: ITheme }>`
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    background-color: ${(props) => props.ct.schema.colors.primary};
`;

const DropdownHeader = styled.div`
    /* padding: 15px; */
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DropdownBody = styled.div<{ ct: ITheme; open: boolean }>`
    padding: 5px;
    border: ${(props) => props.ct.schema.general.border};
    display: ${(props) => (props.open ? 'block' : 'none')};
    box-shadow: ${(props) => props.ct.schema.general.shadow};
    position: absolute;
    background-color: ${(props) => props.ct.schema.colors.primary};
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    margin-left: auto;
    right: 0;
    margin-top: 0.9em;
`;

const DropdownItem = styled.div<{ ct: ITheme}>`
    padding: 10px;
    display: flex;

    :hover {
        cursor: pointer;
        color: ${(props) => props.ct.schema.text.hover};
    }
`;

const DropdownItemDot = styled.div<{ selected: boolean, ct: ITheme }>`
    opacity: ${(props) => (props.selected ? 1 : 0)};
    color: ${(props) => props.ct.schema.text.color};
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
        <DropdownElement ct={theme}>
            <DropdownHeader onClick={toggleDropdown}>
                {renderLabel()}
                {/* <i className={`fa fa-chevron-right icon ${isOpen && 'open'}`}></i> */}
            </DropdownHeader>
            <DropdownBody open={isOpen} ct={theme}>
                {data.map((item: IDropdownData, index: number) => (
                    <DropdownItem ct={theme} onClick={() => handleItemClick(item.value)} id={item.value} key={index}>
                        <DropdownItemDot ct={theme} selected={item.value == selectedItem}>•</DropdownItemDot>
                        {item.label}
                    </DropdownItem>
                ))}
            </DropdownBody>
        </DropdownElement>
    );
};

export default Dropdown;
