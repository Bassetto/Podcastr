import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

import { DefaultTheme, ThemeProvider } from 'styled-components';
import { combineTheme, light, dark } from '../styles/themes';
import GlobalStyles from '../styles/global';

type ThemeContextData = {
    theme: DefaultTheme;
    toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextData);

type ThemeContextProviderProps = {
    children: ReactNode;
};

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
    const [theme, setTheme] = useState<DefaultTheme>(combineTheme(light));

    useEffect(() => {
        setTheme(window.localStorage.getItem('color-mode') === 'light' ? combineTheme(dark) : combineTheme(light));
        return () => {
          window.localStorage.setItem('color-mode', theme.title)
        }
      }, []);

    function toggleTheme() {
        setTheme(theme.title === 'light' ? combineTheme(dark) : combineTheme(light));
    }

    return(
        <ThemeContext.Provider value={{
            theme,
            toggleTheme,
        }}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
};

export const useTheme = () => {
    return useContext(ThemeContext);
};