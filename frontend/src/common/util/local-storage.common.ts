import { ITheme } from '@common/hooks/theme.hook';

export const setToLocalStorage = (key: string, value: any): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string): ITheme | undefined => {
    const value = window.localStorage.getItem(key);

    if (value) {
        return JSON.parse(value);
    }
};
