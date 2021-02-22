import React, { useState } from "react";
import Map from "./Map/Map";
import List from "./List/List";
import { NEW_CASES_MOCK } from "./new-cases-mock"
import DateSlider from "./DateSlider/DateSlider";
function simulateFetchNewCases(date, ms) {
    return new Promise(resolve => setTimeout(() => resolve(NEW_CASES_MOCK.find(d => d.date.getTime() === date.getTime())?.regions), ms));
}

const RegionsStats = () => {
    const [regionsNewCases, setRegionsNewCases] = useState([]);
    const [modeMap, setModeMap] = useState(true);

    const onDateChange = (newDate) => {
        simulateFetchNewCases(newDate, 879).then(result => {
            setRegionsNewCases(result);
        })
    };

    const columns=["regionId", "newCases"];
    return (
        <>
            { modeMap && <List columns={columns} regionsNewCasesData={regionsNewCases}/>}
            { modeMap && <Map regionsNewCasesData={regionsNewCases}/>}
            <DateSlider onDateChange={onDateChange}/>
        </>
    );
};

export default RegionsStats;
