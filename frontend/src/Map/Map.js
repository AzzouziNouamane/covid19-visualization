import React, { useEffect, useState } from "react";
import { REGIONS } from "./regions";
import Region from "./Region";
import { makeStyles, Slider, Typography } from "@material-ui/core";

function simulateFetch(ms) {
  return new Promise(resolve => setTimeout(() => resolve(
    [
      {
        id: 1,
        date: "23-25 mars",
        regions: [
          {
            regionId: 44,
            newCases: 232
          },
          {
            regionId: 28,
            newCases: 108
          }
        ]
      },
      {
        id: 2,
        date: "30 mars-1 avr",
        regions: [
          {
            regionId: 44,
            newCases: 543
          },
          {
            regionId: 28,
            newCases: 243
          }
        ]
      }
    ]), ms));
}

const computeOpacities = (periods, minNewCases, maxNewCases) => {
  return periods.map(period => {
    period.regions = period.regions.map(region => {
      region.opacity = ((1 - 0.2) / (maxNewCases - minNewCases)) * region.newCases + (1 - ((1 - 0.2) / (maxNewCases - minNewCases)) * maxNewCases);
      return region;
    });
    return period;
  });
}

const useStyles = makeStyles((theme) => ({
  slider: {
    width: 300,
    marginLeft: 100
  }
}));

const Map = () => {
  const [periods, setPeriods] = useState([]);
  const [currentPeriodId, setCurrentPeriodId] = useState(1);
  const classes = useStyles();

  useEffect(() => {
    simulateFetch(1000).then(periodsResult => {
      let minNewCases = Number.MAX_SAFE_INTEGER;
      let maxNewCases = 0;
      for (let period of periodsResult) {
        for (let region of period.regions) {
          if (region.newCases < minNewCases) {
            minNewCases = region.newCases;
          }
          if (region.newCases > maxNewCases) {
            maxNewCases = region.newCases;
          }
        }
      }
      setPeriods(computeOpacities(periodsResult, minNewCases, maxNewCases));
    });
  }, []);

  const periodChanged = (event, newValue) => {
    setCurrentPeriodId(newValue);
  }

  return (
    <>
      <svg width="578px" height="544px" viewBox="0 0 578 544">
        <g id="carte" transform="translate(12.000000, 12.000000)">
          {
            REGIONS.map(region =>
              <Region
                redOpacity={periods.find(p => p.id === currentPeriodId)?.regions.find(r => region.id === r.regionId)?.opacity}
                key={region.id}
                path={region.path}
                name={region.name}
                newCases={periods.find(p => p.id === currentPeriodId)?.regions.find(r => region.id === r.regionId)?.newCases}>
              </Region>)
          }
        </g>
      </svg>
      <div className={classes.slider}>
        <Typography gutterBottom>
          Choix de la période
        </Typography>
        <Slider
          min={1}
          max={periods.length || 2}
          defaultValue={1}
          step={1}
          onChange={periodChanged}
          valueLabelDisplay="auto"
        />
      </div>
    </>
  );
};

export default Map;