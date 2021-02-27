import React from "react";
import RegionsStats from "./RegionsStats/RegionsStats"
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Authentication from './Authentication/Authentication';
import "./App.scss";
import ThemeMode from "./ThemeMode/ThemeMode";
import UseLocalStorage from "./Utils/LocalStorage/UseLocalStorage";
import { useState, useEffect } from 'react';
import ThemeContext, { themes } from "./Context/Theme/ThemeContext";
import Contact from "./ContactForm/ContactForm";
import Graph from "./Graph/Graph";
import Cases from "./Cases/Cases";
import {ToastContainer} from "react-toastify";
import Cookies from "js-cookie"
import Button from "reactstrap/lib/Button";

const AdminGuardedRoute = ({ auth, theme, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (auth ?  <ThemeContext.Provider value={theme}><Component {...props} /> </ThemeContext.Provider> :  <Redirect to="/authentication" />)}
        />
    );
}

const App = () => {
    const [storageMode, setStorageMode] = UseLocalStorage('darkmode');
    const [theme, setTheme] = useState(themes.light);
    const history = useHistory();
    const [auth, setAuth] = useState(Cookies.get("user"));

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

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            setTheme(storageMode || themes.light);
        }
        else {
            setTheme(storageMode || themes.dark);
        }
    }, [storageMode]);

    const authenticated = () => {
        setAuth(true);
        Cookies.set("user", "login");
    }

    return (
        <div className="App" style={theme}>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route exact path='/authentication' render={ (props) => <ThemeContext.Provider value={theme}> <Authentication {...props} history={history} authenticated={authenticated} /> </ThemeContext.Provider> } />
                <AdminGuardedRoute auth={auth} theme={theme} exact path='/home' component={RegionsStats} />
                <AdminGuardedRoute auth={auth} theme={theme} exact path='/graph/:regionId' component={Graph}/>
                <AdminGuardedRoute auth={auth} theme={theme} exact path='/contact' component={Contact}/>
            </Switch>
            { auth && <Button className="home" onClick={() => history.push("/home/")}>Accueil</Button> }
            { auth && <Button className="contact" onClick={() => history.push("/contact/")}>Contact</Button> }
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
