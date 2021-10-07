import React, { createContext, useContext, useEffect, useState } from 'react';

import themesJSON from '../themes/schema.json';

interface IUseTheme {
    theme: ITheme;
    themeLoaded: boolean;
    setMode: (mode: string) => void;
}

interface ISchema {
    colors: { primary: string; secondary: string };
    general: { shadow: string; border: string; borderRadius: string; marginTop: string };
    sizes: { navbarHeight: string; containerHeightFull: string };
    text: { color: string; hover: string };
    input: { background: string; shadow: string; border: string; focus: string; height: string; color: string };
    button: { text: string; background: string };
    link: { text: string; opacity: number };
}

export interface ITheme {
    id: string;
    name: string;
    schema: ISchema;
}

interface IThemes {
    [key: string]: ITheme;
}

interface IThemeContext {
    theme: ITheme;
    changeTheme: (name: string) => void;
}

const initialState: IThemeContext = {
    theme: localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : themesJSON['dark'],
    changeTheme: () => {},
};

const ThemeContext = createContext<IThemeContext>(initialState);

export const ThemeProvider: React.FC<{}> = ({ children }): any => {
    const [themes, setThemes] = useState<IThemes>(themesJSON);
    const [theme, setTheme] = useState<ITheme>(initialState.theme);

    const changeTheme = (name: string) => {
        const selected = themes[name];
        localStorage.setItem('theme', JSON.stringify(selected));
        setTheme(selected);
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                changeTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): IThemeContext => {
    const context = useContext(ThemeContext);
    if (context === undefined) throw new Error('Theme context cant bet undefined');
    return context;
};
