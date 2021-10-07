import styled from 'styled-components';

import { ITheme } from '@common/context/theme-context.common';
import { isAuthenticated } from '@common/auth/auth.common';

export const Container = styled.div<{ ct: ITheme }>`
    width: 100%;
    height: ${isAuthenticated() ? (props) => props.ct.schema.sizes.containerHeightFull : '100%'};
    margin-top: ${isAuthenticated() ? (props) => props.ct.schema.general.marginTop : 0};
    background-color: ${(props) => props.ct.schema.colors.secondary};
`;