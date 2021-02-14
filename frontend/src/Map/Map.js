import React, { useEffect, useState } from "react";
import { DEPARTMENTS } from "./departments";
import Department from "./Department";
import { makeStyles, Slider, Typography } from "@material-ui/core";

function simulateFetch(ms) {
  return new Promise(resolve => setTimeout(() => resolve([
    {
      week: 1,
      departmentId: '83',
      newCases: 232
    },
    {
      week: 1,
      departmentId: '05',
      newCases: 108
    },
    {
      week: 2,
      departmentId: '83',
      newCases: 423
    },
    {
      week: 2,
      departmentId: '05',
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
      setWeekStats(stats.filter(stat => stat.week === 1));
    });
  }, []);

  const weekChanged = (event, newValue) => {
    setWeekStats(stats.filter(stat => stat.week === newValue));
  }

  return (
    <>
      <svg width="578px" height="544px" viewBox="0 0 578 544">
        <g id="carte" transform="translate(12.000000, 12.000000)">
          {
            DEPARTMENTS.map(department =>
              <Department
                redOpacity={weekStats.find(stat => department.id === stat.departmentId)?.opacity}
                key={department.id}
                path={department.path}
                name={department.name}
                newCases={weekStats.find(stat => department.id === stat.departmentId)?.newCases}>
              </Department>)
          }
        </g>
      </svg>
      <div className={classes.slider}>
        <Typography id="discrete-slider-custom" gutterBottom>
          Choisissez la semaine
        </Typography>
        <Slider
          min={1}
          max={Math.max(...stats.map(stat => stat.week))}
          defaultValue={1}
          aria-labelledby="discrete-slider-custom"
          step={1}
          onChange={weekChanged}
          valueLabelDisplay="auto"
        />
      </div>
    </>
  );
};

export default Map;