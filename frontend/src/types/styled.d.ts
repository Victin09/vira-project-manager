import 'styled-components';

interface IPalette {
    main: string;
    contrastText: string;
}

declare module 'styled-components' {
    export interface DefaultTheme {
        id: string;
        name: string;
        colors: {
            body: string;
            text: string;
            button: {
                text: string;
                background: string;
            };
            link: {
                text: string;
                opacity: number;
            };
        };
        font: string;
    }
}

declare module '*.json' {
    const value: any;
    export default value;
}
