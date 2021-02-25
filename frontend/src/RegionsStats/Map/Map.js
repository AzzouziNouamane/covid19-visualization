import React from "react";
import { REGIONS } from "./regions";
import Region from "./Region";

const Map = ({
                 newCasesNow,
                 minNewCasesNow,
                 maxNewCasesNow,
                 minNewCasesEver,
                 maxNewCasesEver,
                 mentalHealthNow,
                 minMentalHealthEver,
                 maxMentalHealthEver
}) => {
  return (
    <svg width="578px" height="544px" viewBox="0 0 578 544">
      <g id="carte" transform="translate(12.000000, 12.000000)">
        {
          REGIONS.map(region =>
            <Region
              id={region.id}
              key={region.id}
              path={region.path}
              smiley={region.smiley}
              name={region.name}
              regionNewCases={newCasesNow.find(r => region.id + "" === r.regionId)?.newCases}
              minNewCasesNow={minNewCasesNow}
              maxNewCasesNow={maxNewCasesNow}
              minNewCasesEver={minNewCasesEver}
              maxNewCasesEver={maxNewCasesEver}
              mentalHealthNow={mentalHealthNow.find(r => region.id + "" === r.regionId)}
              minMentalHealthEver={minMentalHealthEver}
              maxMentalHealthEver={maxMentalHealthEver}>
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
