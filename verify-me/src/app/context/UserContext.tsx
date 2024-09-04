// context/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
    _id?: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Function to check session storage for user
        const checkUserInSessionStorage = () => {
            const storedUser = sessionStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };

        // Initial check when the component mounts
        checkUserInSessionStorage();

        // Event listener for changes in session storage
        const handleStorageChange = () => {
            checkUserInSessionStorage();
        };

        window.addEventListener('storage', handleStorageChange);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export { UserProvider, useUser };
