import React from "react";
import RegionsStats from "./RegionsStats/RegionsStats"
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom';
import Authentication from './Authentication/Authentication';
import "./App.css";
import ThemeMode from "./ThemeMode/ThemeMode";
import UseLocalStorage from "./Utils/LocalStorage/UseLocalStorage";
import { useState, useEffect } from 'react';
import ThemeContext, { themes } from "./Context/Theme/ThemeContext";
import Contact from "./ContactForm/contact-form";
import Button from "reactstrap/lib/Button";

const App = () => {
  const [storageMode, setStorageMode] = UseLocalStorage('darkmode');
  const [theme, setTheme] = useState(themes.light);
  const [contactVisible, setVisibility] = useState(true);


  const toggleTheme = () => {
    if (theme.isDark) {
      setTheme(themes.light);
      setStorageMode(themes.light);
    }
    else {
      setTheme(themes.dark);
      setStorageMode(themes.dark);
    }
  };

    useEffect(() => {
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme(storageMode || themes.light);
      }
      else {
        setTheme(storageMode || themes.dark);
      }
    }, [storageMode]);

    let changeVisibility = () =>{
        setVisibility(false)
    };

  return (
    <div className="App" style={theme}>
        <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route exact path='/authentication' render={ (props) => <ThemeContext.Provider value={theme}> <Authentication {...props} /> </ThemeContext.Provider> } />
            <Route exact path='/home' render={ (props) => <ThemeContext.Provider value={theme}> <RegionsStats {...props} /> </ThemeContext.Provider> } />
            <Route exact path='/contact' render={ (props) => <ThemeContext.Provider value={theme}> <Contact {...props} /> </ThemeContext.Provider> } />

        </Switch>
            { contactVisible  ?
            <Link to="/contact">
                <Button style={{ backgroundColor : theme.isDark? "white" : "black", color : theme.isDark? "black" : "white", }} onClick={changeVisibility}> Contact </Button>
            </Link> :<div></div>}

        </BrowserRouter>
        <ThemeMode onChange={toggleTheme} mode={theme}/>
    </div>

  );
};

export default App;
