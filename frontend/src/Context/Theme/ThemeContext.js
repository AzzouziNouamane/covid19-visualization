import React from 'react';

export const themes = {
    dark: {
        isDark:  true,
        color:  'white',
        background: 'black'
    },

    light: {
        isDark:  false,
        color: 'black',
        background: 'white'
    }
};

const ThemeContext = React.createContext(themes.dark);

export default ThemeContext;
