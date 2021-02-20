import React from "react";
import Cases from "./Cases/cases";
import RegionsStats from "./RegionsStats/RegionsStats"
import Graph from "./Graph/graph";

const App = () => {
  return (
    <div>
        <Graph></Graph>
      <RegionsStats></RegionsStats>
      <Cases></Cases>
    </div>
  );
};

export default App;