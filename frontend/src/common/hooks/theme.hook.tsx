import { useEffect, useState } from 'react';

import themesJSON from '../themes/schema.json';
import { setToLocalStorage, getFromLocalStorage } from '../util/local-storage.common';

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
    input: { background: string; shadow: string; border: string; focus: string; height: string };
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

export const useTheme = (): IUseTheme => {
    const [themes, setThemes] = useState<IThemes>(themesJSON);
    const [theme, setTheme] = useState<ITheme>(themesJSON.light);
    const [themeLoaded, setThemeLoaded] = useState(false);

    const setMode = (mode: string) => {
        console.log('theme', themes[mode]);
        setTheme(themes[mode]);
    };

    useEffect(() => {
        if (!themes) setThemes(themesJSON);
        const localTheme = getFromLocalStorage('theme');
        localTheme ? setTheme(JSON.parse(localTheme)) : setTheme(themesJSON.light);
        setThemeLoaded(true);
    }, []);

    return { theme, themeLoaded, setMode };
};
