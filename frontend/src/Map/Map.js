import React from "react";
import PropTypes from "prop-types";
import { DEPARTMENTS } from "./departments";
import Department from "./Department";


const Map = () => {
  return (
    <svg width="578px" height="544px" viewBox="0 0 578 544">
      <g id="carte" transform="translate(12.000000, 12.000000)">
        {
          DEPARTMENTS.map(department => <Department key={department.id} path={department.path} name={department.name}></Department>)
        }
      </g>
    </svg>
  );
};

Map.propTypes = {
  color: PropTypes.string,
  departements: PropTypes.array,
  highlightColor: PropTypes.string
};

Map.defaultProps = {
  color: "#74B4FF",
  highlightColor: "#b3ff75",
  departements: []
};

export default Map;