import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [selectedLevel, setSelectedLevel] = useState('All');

    const handleLevelChange = (level) => setSelectedLevel(level);

    const navbarSticky = () => {
        // Add sticky navbar logic if needed
    };

    useEffect(() => {
        window.addEventListener('scroll', navbarSticky);
        return () => {
            window.removeEventListener('scroll', navbarSticky);
        };
    }, []);

    return (
        <AppContext.Provider value={{ selectedLevel, handleLevelChange }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
