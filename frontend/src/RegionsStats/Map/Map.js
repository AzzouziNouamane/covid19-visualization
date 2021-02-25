import React, {useEffect, useState} from "react";
import { REGIONS } from "./regions";
import Region from "./Region";

const Map = ({ newCasesNow, minNewCasesNow, maxNewCasesNow, minNewCasesEver, maxNewCasesEver, mentalHealthNow }) => {
  return (
    <svg width="578px" height="544px" viewBox="0 0 578 544">
      <g id="carte" transform="translate(12.000000, 12.000000)">
        {
          REGIONS.map(region =>
            <Region
              id={region.id}
              key={region.id}
              path={region.path}
              name={region.name}
              regionNewCases={newCasesNow.find(r => region.id + "" === r.regionId)?.newCases}
              minNewCasesNow={minNewCasesNow}
              maxNewCasesNow={maxNewCasesNow}
              minNewCasesEver={minNewCasesEver}
              maxNewCasesEver={maxNewCasesEver}
              mentalHealthNow={mentalHealthNow.find(r => region.id + "" === r.regionId)}
            >
            </Region>)
        }
      </g>
    </svg>
  );
};

Map.defaultProps = {
  newCasesNowData: []
};

export default Map;
