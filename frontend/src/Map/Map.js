import React, { useEffect, useState } from "react";
import { REGIONS } from "./regions";
import Region from "./Region";
import { makeStyles, Slider, Typography } from "@material-ui/core";

function simulateFetch(ms) {
  return new Promise(resolve => setTimeout(() => resolve([
    {
      week: 1,
      regionId: 44,
      newCases: 232
    },
    {
      week: 1,
      regionId: 28,
      newCases: 108
    },
    {
      week: 2,
      regionId: 44,
      newCases: 423
    },
    {
      week: 2,
      regionId: 28,
      newCases: 230
    },
  ]), ms));
}

const computeOpacity = (stats, minNewCases, maxNewCases) => {
  return stats.map(stat => {
    stat.opacity = ((1 - 0.2) / (maxNewCases - minNewCases)) * stat.newCases + (1 - ((1 - 0.2) / (maxNewCases - minNewCases)) * maxNewCases);
    return stat;
  });
}

const useStyles = makeStyles((theme) => ({
  slider: {
    width: 300,
    marginLeft: 100
  }
}));

const Map = () => {
  const [stats, setStats] = useState([]);
  const [weekStats, setWeekStats] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    simulateFetch(1000).then(res => {
      setStats(computeOpacity(res, Math.min(...res.map(stat => stat.newCases)), Math.max(...res.map(stat => stat.newCases))));
    });
  }, []);

  useEffect(() => {
    setWeekStats(stats.filter(stat => stat.week === 1));
  }, [stats]);

  const weekChanged = (event, newValue) => {
    setWeekStats(stats.filter(stat => stat.week === newValue));
  }

  return (
    <>
      <svg width="578px" height="544px" viewBox="0 0 578 544">
        <g id="carte" transform="translate(12.000000, 12.000000)">
          {
            REGIONS.map(region =>
              <Region
                redOpacity={weekStats.find(stat => region.id === stat.regionId)?.opacity}
                key={region.id}
                path={region.path}
                name={region.name}
                newCases={weekStats.find(stat => region.id === stat.regionId)?.newCases}>
              </Region>)
          }
        </g>
      </svg>
      <div className={classes.slider}>
        <Typography gutterBottom>
          Choix de la vague
        </Typography>
        <Slider
          min={1}
          max={Math.max(...stats.map(stat => stat.week))}
          defaultValue={1}
          step={1}
          onChange={weekChanged}
          valueLabelDisplay="auto"
        />
      </div>
    </>
  );
};

export default Map;