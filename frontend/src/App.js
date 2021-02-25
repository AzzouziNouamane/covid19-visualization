import React from "react";
import RegionsStats from "./RegionsStats/RegionsStats"
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Authentication from './Authentication/Authentication';
import Graph from "./Graph/graph";

const App = () => {
  return (
    <div>
        <BrowserRouter>
        <Switch>
            <Route exact path='/authentication' component={Authentication} />
            <Route exact path='/home' component={RegionsStats} />
            <Route exact path='/graph/:regionId'>
                <Graph/>
            </Route>
        </Switch>
        </BrowserRouter>
    </div>
  );
};

export default App;
