import React, { useEffect, useState } from "react";
import { DEPARTMENTS } from "./departments";
import Department from "./Department";

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

const Map = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    simulateFetch(1000).then(res => {
      setStats(computeOpacity(res, Math.min(...res.map(stat => stat.newCases)), Math.max(...res.map(stat => stat.newCases))));
    });
  }, []);

  return (
    <svg width="578px" height="544px" viewBox="0 0 578 544">
      <g id="carte" transform="translate(12.000000, 12.000000)">
        {
          DEPARTMENTS.map(department => 
          <Department
          redOpacity={stats.find(stat => department.id === stat.departmentId)?.opacity}
          key={department.id}
          path={department.path}
          name={department.name}
          newCases={stats.find(stat => department.id === stat.departmentId)?.newCases}>
          </Department>)
        }
      </g>
    </svg>
  );
};

export default Map;