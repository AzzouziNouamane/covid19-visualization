import React from "react";
import { REGIONS } from "./regions";
import Region from "./Region";

const Map = ({ regionsNewCases, minNewCasesDate, maxNewCasesDate, minNewCasesAllDates, maxNewCasesAllDates }) => {

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
              regionNewCases={regionsNewCases.find(r => region.id + "" === r.regionId)?.newCases}
              minNewCasesDate={minNewCasesDate}
              maxNewCasesDate={maxNewCasesDate}
              minNewCasesAllDates={minNewCasesAllDates}
              maxNewCasesAllDates={maxNewCasesAllDates}
            >
            </Region>)
        }
      </g>
    </svg>
  );
};

Map.defaultProps = {
  regionsNewCasesData: []
};

export default Map;
