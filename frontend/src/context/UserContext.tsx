import { createContext, useContext, useState, ReactNode } from "react";

type UserType = 'startup' | 'investor' | null;

interface UserContextType {
    userType: UserType;
    isAuthenticated: boolean;
    userName: string;
    login: (type: UserType, token?: string, name?: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    // Initialize from localStorage
    const [userType, setUserType] = useState<UserType>(() => {
        return (localStorage.getItem('userType') as UserType) || null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('token'); // Assuming token presence means auth
    });
    const [userName, setUserName] = useState<string>(() => {
        return localStorage.getItem('userName') || "";
    });

    const login = (type: UserType, token?: string, name?: string) => {
        setUserType(type);
        setIsAuthenticated(true);
        localStorage.setItem('userType', type || '');
        if (token) {
            localStorage.setItem('token', token);
        }
        if (name) {
            setUserName(name);
            localStorage.setItem('userName', name);
        }
    };

    const logout = () => {
        setUserType(null);
        setIsAuthenticated(false);
        setUserName("");
        localStorage.removeItem('userType');
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
    };

    return (
        <UserContext.Provider value={{ userType, isAuthenticated, userName, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
