import React from "react";
import RegionsStats from "./RegionsStats/RegionsStats"
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Authentication from './Authentication/Authentication';
import "./App.scss";
import ThemeMode from "./ThemeMode/ThemeMode";
import UseLocalStorage from "./Utils/LocalStorage/UseLocalStorage";
import { useState, useEffect } from 'react';
import ThemeContext, { themes } from "./Context/Theme/ThemeContext";
import Contact from "./ContactForm/contact-form";
import Graph from "./Graph/Graph";
import Cases from "./Cases/Cases";
import {ToastContainer} from "react-toastify";
import Cookies from "js-cookie"
import Button from "reactstrap/lib/Button";

const AdminGuardedRoute = ({ theme, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (!!Cookies.get("user") ?  <ThemeContext.Provider value={theme}><Component {...props} /> </ThemeContext.Provider> :  <Redirect to="/authentication" />)}
        />
    );
}

const App = () => {
    const [storageMode, setStorageMode] = UseLocalStorage('darkmode');
    const [theme, setTheme] = useState(themes.light);
    const history = useHistory();

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


    return (
        <div className="App" style={theme}>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route exact path='/authentication' render={ (props) => <ThemeContext.Provider value={theme}> <Authentication {...props} /> </ThemeContext.Provider> } />
                <AdminGuardedRoute theme={theme} exact path='/home' component={RegionsStats} />
                <AdminGuardedRoute theme={theme} exact path='/graph/:regionId' component={Graph}/>
                <AdminGuardedRoute theme={theme} exact path='/contact' component={Contact}/>
            </Switch>
            { !!Cookies.get("user") && <Button className="home" onClick={() => history.push("/home/")}>Accueil</Button> }
            { !!Cookies.get("user") && <Button className="contact" onClick={() => history.push("/contact/")}>Contact</Button> }
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
