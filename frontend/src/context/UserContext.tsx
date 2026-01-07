import { createContext, useContext, useState, ReactNode } from "react";

type UserType = 'startup' | 'investor' | null;

interface UserContextType {
    userType: UserType;
    isAuthenticated: boolean;
    login: (type: UserType) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userType, setUserType] = useState<UserType>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (type: UserType) => {
        setUserType(type);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUserType(null);
        setIsAuthenticated(false);
    };

    return (
        <UserContext.Provider value={{ userType, isAuthenticated, login, logout }}>
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
