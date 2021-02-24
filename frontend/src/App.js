import React from "react";
import RegionsStats from "./RegionsStats/RegionsStats"
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Authentication from './Authentication/Authentication';
import "./App.css";
import ThemeMode from "./ThemeMode/ThemeMode";
import UseLocalStorage from "./Utils/LocalStorage/UseLocalStorage";
import { useState, useEffect } from 'react';
import ThemeContext, { themes } from "./Context/Theme/ThemeContext";

const App = () => {
  const [storageMode, setStorageMode] = UseLocalStorage('darkmode');
  const [theme, setTheme] = useState();
  const toggleTheme = () => {
    if (theme.name === 'dark') {
      setTheme(themes.light);
      setStorageMode(themes.light);
    }
    else {
      setTheme(themes.dark);
      setStorageMode(themes.dark);
    }
  }

    useEffect(() => {
		setTheme(storageMode);
	}, [storageMode]);

  return (
    <div className = "App" style = {storageMode}>
        <BrowserRouter>
        <Switch>
            <Route exact path='/authentication' render={ (props) => <ThemeContext.Provider value = {storageMode}> <Authentication {...props} /> </ThemeContext.Provider> } />
            <Route exact path='/home' render={ (props) => <ThemeContext.Provider value = {storageMode}> <RegionsStats {...props} /> </ThemeContext.Provider> } />
        </Switch>
        </BrowserRouter>
        <ThemeMode
        onChange={toggleTheme}
        mode={storageMode}></ThemeMode>
    </div>

  );
};

export default App;
