/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
    createContext,
    useContext,
    useState
} from 'react';

interface IUserContext {
    email: string;
    setEmail: (id: string) => void;
    name: string;
    setName: (name: string) => void;
    icon: string;
    setIcon: (icon: string) => void;
}

const initialState: IUserContext = {
    email: '',
    setEmail: () => {},
    name: '',
    setName: () => {},
    icon: '',
    setIcon: () => {}
};

const UserContext =
    createContext<IUserContext>(initialState);

export const UserProvider = ({
    children
}: {
    children: JSX.Element;
}): any => {
    const [email, setEmail] = useState<string>(
        initialState.email
    );
    const [name, setName] = useState<string>(
        initialState.name
    );
    const [icon, setIcon] = useState<string>(
        initialState.icon
    );

    return (
        <UserContext.Provider
            value={{
                email,
                setEmail,
                name,
                setName,
                icon,
                setIcon
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): IUserContext => {
    const context = useContext(UserContext);
    if (context === undefined)
        throw new Error(
            'User context cant bet undefined'
        );
    return context;
};
