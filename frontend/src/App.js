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
import Graph from "./Graph/Graph";
import Cases from "./Cases/Cases";
import {ToastContainer} from "react-toastify";
import Cookies from "js-cookie"




const App = () => {

  const [storageMode, setStorageMode] = UseLocalStorage('darkmode');
  const [theme, setTheme] = useState(themes.light);
  const [contactVisible, setVisibility] = useState(true);
  function AdminGuardedRoute(user: "login" | undefined)  {
        return function ({ component: Component, ...rest }) {
            return (
                <Route
                    {...rest}
                    render={props => (!!user ?  <ThemeContext.Provider value={theme}><Component {...props} /> </ThemeContext.Provider> :  <Redirect to="/authentication" />)}
                />
            );
        };
    }

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

    const AdminRoute = AdminGuardedRoute(Cookies.get("user"));

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
            <AdminRoute exact path='/home'   component={RegionsStats} />
            <AdminRoute exact path='/graph/:regionId' component={Graph}/>

            <Route exact path='/home' render={ (props) => <ThemeContext.Provider value={theme}> <RegionsStats {...props} /> </ThemeContext.Provider> } />
            <Route exact path='/contact' render={ (props) => <ThemeContext.Provider value={theme}> <Contact {...props} /> </ThemeContext.Provider> } />
        </Switch>

            { contactVisible  ?
            <Link to="/contact">
                <Button style={{ backgroundColor : theme.isDark? "white" : "black", color : theme.isDark? "black" : "white", }} onClick={changeVisibility}> Contact </Button>
            </Link> :<div></div>}

        </BrowserRouter>
        <ThemeMode onChange={toggleTheme} mode={theme}/>
        <Cases/>
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </div>

  );
};

export default App;
