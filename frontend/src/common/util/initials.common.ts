export const nameToInitials = (fullName: string): string => {
    const namesArray = fullName.trim().split(' ');
    if (namesArray.length === 1) return `${namesArray[0].charAt(0)}`.toUpperCase();
    else return `${namesArray[0].charAt(0)}${namesArray[namesArray.length - 1].charAt(0)}`.toUpperCase();
};
