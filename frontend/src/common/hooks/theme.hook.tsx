import { useEffect, useState } from 'react';

import themes from '../themes/schema.json';
import { setToLocalStorage, getFromLocalStorage } from '../util/local-storage.common';

interface IUseTheme {
    theme: any;
    themeLoaded: boolean;
    setMode: (mode: any) => void;
}

interface IColors {
    [key: string]: string;
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
    const [theme, setTheme] = useState<any>(themes.light);
    const [themeLoaded, setThemeLoaded] = useState(false);

    const setMode = (mode: string) => {
        console.log('mode', mode);
        // setToLocalStorage(
        //     'theme',
        //     Object.keys(themes).find((key) => key === mode)
        // );
        console.log('theme', themes[mode]);
        setTheme(mode);
    };

    useEffect(() => {
        const localTheme = getFromLocalStorage('theme');
        localTheme ? setTheme(localTheme) : setTheme(themes.light);
        setThemeLoaded(true);
    }, []);

    return { theme, themeLoaded, setMode };
};
