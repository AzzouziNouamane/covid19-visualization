import React from "react";
import RegionsStats from "./RegionsStats/RegionsStats"
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Authentication from './Authentication/Authentication';
import "./App.css";
import ThemeMode from "./ThemeMode/ThemeMode";
import UseLocalStorage from "./Utils/LocalStorage/UseLocalStorage";
import { useState, useEffect } from 'react';
import ThemeContext, { themes } from "./Context/Theme/ThemeContext";
import Graph from "./Graph/Graph";
import Cases from "./Cases/Cases";
import {ToastContainer} from "react-toastify";
import Cookies from "js-cookie"




const App = () => {

  const [storageMode, setStorageMode] = UseLocalStorage('darkmode');
  const [theme, setTheme] = useState(themes.light);

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
  }

    useEffect(() => {
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme(storageMode || themes.light);
      }
      else {
        setTheme(storageMode || themes.dark);
      }
    }, [storageMode]);

    const AdminRoute = AdminGuardedRoute(Cookies.get("user"));

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
             </Switch>
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
