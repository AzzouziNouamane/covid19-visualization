import React, { useEffect, useState } from "react";
import { REGIONS } from "./regions";
import Region from "./Region";
import {Route, Link, BrowserRouter, Switch, Redirect} from "react-router-dom";
import Graph from "../../Graph/graph";

const computeOpacities = (regionsNewCases, minNewCases, maxNewCases) => {
  return regionsNewCases.map(region => {
    region.opacity = ((1 - 0.2) / (maxNewCases - minNewCases)) * region.newCases + (1 - ((1 - 0.2) / (maxNewCases - minNewCases)) * maxNewCases);
    return region;
  });
}

function simulateMinMaxNewCasesFetch(ms) {
  return new Promise(resolve => setTimeout(() => resolve({ minNewCases: 108, maxNewCases: 543 }), ms));
}

const Map = ({ regionsNewCasesData }) => {

  const [regionsNewCases, setRegionsNewCases] = useState([]);
  const [minNewCases, setMinNewCases] = useState(0);
  const [maxNewCases, setMaxNewCases] = useState(0);

  useEffect(() => {
    simulateMinMaxNewCasesFetch(500).then(result => {
      setMinNewCases(result.minNewCases);
      setMaxNewCases(result.maxNewCases);
    });
  }, []);

  useEffect(() => {
    setRegionsNewCases(computeOpacities(regionsNewCasesData, minNewCases, maxNewCases));
  }, [regionsNewCasesData, minNewCases, maxNewCases]);

  return (
      <BrowserRouter>
        <div>

        <svg width="578px" height="544px" viewBox="0 0 578 544">
          <g id="carte" transform="translate(12.000000, 12.000000)">
            {
              REGIONS.map(region =>
                  <Link to={'/graph/'+region.id}>
                    <Region
                        redOpacity={regionsNewCases.find(r => region.id === r.regionId)?.opacity}
                        key={region.id}
                        path={region.path}
                        name={region.name}
                        newCases={regionsNewCases.find(r => region.id === r.regionId)?.newCases}>
                    </Region>
                  </Link>)
            }
          </g>
        </svg>
          <Switch>
            <Route exact path='/graph/:regionId' component={Graph}/>
          </Switch>
      </div>
      </BrowserRouter>

  );
};

Map.defaultProps = {
  regionsNewCasesData: []
};

export default Map;
