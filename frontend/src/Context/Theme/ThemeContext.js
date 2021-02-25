import React from 'react';

export const themes = {
    dark: {
        isDark:  true,
        color:  '#F5F5F5',
        background: 'black'
    },

    light: {
        isDark:  false,
        color: 'black',
        background: '#F5F5F5'
    }
};

const ThemeContext = React.createContext(themes.dark);

export default ThemeContext;
