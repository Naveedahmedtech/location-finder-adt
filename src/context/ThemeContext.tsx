'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'dark',
    toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    // ✅ Load saved theme or fallback to 'dark'
    useEffect(() => {
        const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const initialTheme = saved ?? 'dark';

        setTheme(initialTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(initialTheme);
    }, []);

    // ✅ Toggle & persist theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
