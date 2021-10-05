import { useEffect, useState } from 'react';

import themesJSON from '../themes/schema.json';
import { setToLocalStorage, getFromLocalStorage } from '../util/local-storage.common';

interface IUseTheme {
    theme: any;
    themeLoaded: boolean;
    setMode: (mode: any) => void;
}

interface IColors {
    body: string;
    text: string;
    button: { text: string; background: string };
    link: { text: string; opacity: number };
}

interface ITheme {
    id: string;
    name: string;
    colors: IColors;
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
