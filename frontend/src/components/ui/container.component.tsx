import styled from 'styled-components';

import { ITheme } from '@common/context/theme-context.common';

export const Container = styled.div<{ ct: ITheme }>`
    width: 100%;
    height: ${(props) => props.ct.schema.sizes.containerHeightFull};
    margin-top: ${(props) => props.ct.schema.general.marginTop};
    background-color: ${(props) => props.ct.schema.colors.secondary};
`;