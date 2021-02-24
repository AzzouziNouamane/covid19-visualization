import React from "react";
import Cases from "./Cases/Cases";
import Map from "./Map/Map"
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

/* 	const changeThemeContext = useCallback((newTheme) => {
		setTheme(newTheme);
		setStorageMode(newTheme);
	}, [setStorageMode]);

	useEffect(() => {
		setTheme(storageMode);
	}, [storageMode]); */

  return (
    <div className = "App" style = {storageMode}>
    <ThemeContext.Provider value = {storageMode}>
        <Map></Map>
        <Cases></Cases>
        <ThemeMode
        onChange={toggleTheme}
        mode={storageMode}></ThemeMode>
    </ThemeContext.Provider>
    </div>

  );
};

export default App;
