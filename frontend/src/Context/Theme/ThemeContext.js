import React from 'react';

export const themes = {
    dark: {
        name:  'dark',
        color:  'white',
        background: 'black'
    },

    light: {
        name:  'light',
        color: 'black',
        background: 'white'
    }
};

const ThemeContext = React.createContext(themes.dark);

export default ThemeContext;
