import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

const getWidthString = (span: string) => {
    if (!span) return ;

    let width = Number(span) / 12 * 100;
    return `width: ${width}%;`;
}

const Row = styled.div<{ fullHeight?: boolean; center?: boolean }>`
    display: flex;
    ${({ fullHeight }) => fullHeight && {height: '100%'}};
    ${({ center }) => center && {justifyContent: 'center'}};

    &::after {
        content: "";
        clear: both;
        display: table;
    }
`;

const Column = styled.div<{ xs?: string; sm?: string; md?: string; lg?: string }>`
    float: left;
    display: flex;
    ${({ xs }) => (xs ? getWidthString(xs) : 'width: 100%;')};

    @media only screen and (min-width: 768px) {
        ${({ sm }) => sm && getWidthString(sm)}
    }
    @media only screen and (min-width: 992px) {
        ${({ md }) => md && getWidthString(md)}
    }
    @media only screen and (min-width: 1200px) {
        ${({ lg }) => lg && getWidthString(lg)}
    }
`;

export { Row, Column };