import React from "react";
import RegionsStats from "./RegionsStats/RegionsStats"
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Authentication from './Authentication/Authentication';
import "./App.css";
import ThemeMode from "./ThemeMode/ThemeMode";
import UseLocalStorage from "./Utils/LocalStorage/UseLocalStorage";
import { useState, useEffect } from 'react';
import ThemeContext, { themes } from "./Context/Theme/ThemeContext";

const App = () => {
  const [storageMode, setStorageMode] = UseLocalStorage('darkmode');
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    if (theme.isDark) {
      setTheme(themes.light);
      setStorageMode(themes.light);
    }
    else {
      setTheme(themes.dark);
      setStorageMode(themes.dark);
    }
  }

    useEffect(() => {
      console.log('window.matchMedia');
      console.log(window.matchMedia('(prefers-color-scheme: light)').matches)
      if(window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme(storageMode || themes.light);
      }

      else {
        setTheme(storageMode || themes.dark);
      }
        
    }, [storageMode]);

  return (
    <div className="App" style={storageMode}>
        <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route exact path='/authentication' render={ (props) => <ThemeContext.Provider value={theme}> <Authentication {...props} /> </ThemeContext.Provider> } />
            <Route exact path='/home' render={ (props) => <ThemeContext.Provider value={theme}> <RegionsStats {...props} /> </ThemeContext.Provider> } />
        </Switch>
        </BrowserRouter>
        <ThemeMode onChange={toggleTheme} mode={theme}/>
    </div>

  );
};

export default App;
