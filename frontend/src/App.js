import React from "react";

import Cases from "./Cases/cases";
import RegionsStats from "./RegionsStats/RegionsStats"
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Authentification from './Authentification/authentification';

const App = () => {
  return (
    <div>
        <BrowserRouter>
        <Switch>
            <Route exact path='/Authentification' component={Authentification} />
            <Route exact path='/home' component={RegionsStats} />
        </Switch>
        </BrowserRouter>
    </div>
  );
};

export default App;