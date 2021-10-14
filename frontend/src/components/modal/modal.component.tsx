import React, { useRef } from 'react'
import styled from 'styled-components';

import { ITheme, useTheme } from '@common/context/theme-context.common';
import useOnClickOutside from '@common/hooks/click-outside.hook';

interface IModal {
    display: boolean;
    setDisplay: (display: boolean) => void;
    content: JSX.Element;
}

const ModalContainer = styled.div<{ ct: ITheme }>`
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.ct.schema.colors.primary};
    background-color: rgba(0,0,0,0.4);
    `;

const ModalContent = styled.div<{ ct: ITheme }>`
    background-color: ${(props) => props.ct.schema.colors.secondary};
    border-radius: ${(props) => props.ct.schema.general.borderRadius};
    margin: 15% auto;
    padding: 1em;
    border: ${(props) => props.ct.schema.general.border};
    width: 50%;
`;

const Modal = ({ display, setDisplay, content }: IModal) => {
    const { theme } = useTheme();
    const ref = useRef();

    const handleClickOutside = () => {
        setDisplay(false);
    };

    useOnClickOutside(ref, handleClickOutside);

    return (
        <>
            {display && (
                <ModalContainer ct={theme}>
                    <ModalContent ref={ref} ct={theme}>
                        {content}
                    </ModalContent>
                </ModalContainer>
            )}
        </>
    )
}

export default Modal;
