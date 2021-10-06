export const isAuthenticated = (): boolean => {
    const token = sessionStorage.getItem('token');
    return !!token;
};

export const getToken = (): string | undefined => {
    const token = sessionStorage.getItem('token');
    if (token) return token;
    return undefined;
};
