import { ITheme } from '@common/hooks/theme.hook';
import 'styled-components';

interface IPalette {
    main: string;
    contrastText: string;
}

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends ITheme {}
}

declare module '*.json' {
    const value: any;
    export default value;
}
