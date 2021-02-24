import React, {useEffect, useState} from "react";
import Map from "./Map/Map";
import List from "./List/List";
import DateSlider from "./DateSlider/DateSlider";
import "./RegionsStats.css";

const RegionsStats = () => {
    const [regionsNewCases, setRegionsNewCases] = useState([]);
    const [newCasesPerDay, setNewCasesPerDay] = useState([]);
    const [modeMap, setModeMap] = useState(true);
    const [minNewCases, setMinNewCases] = useState(0);
    const [maxNewCases, setMaxNewCases] = useState(0);
    const [minDate, setMinDate] = useState(0);
    const [maxDate, setMaxDate] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3001/nbcases/data/day')
            .then(dataPerDayResult => dataPerDayResult.json())
            .then(dataPerDayResult => dataPerDayResult.map(day => {
                day.date = new Date(day.date);
                return day;
            }))
            .then(dataPerDayResult => {
                setMinMaxNewCases(dataPerDayResult[0].regions);
                setMinDate(dataPerDayResult[0].date);
                setMaxDate(dataPerDayResult[dataPerDayResult.length-1].date);
                setNewCasesPerDay(dataPerDayResult);
                setRegionsNewCases(dataPerDayResult[0].regions)
            });
    }, []);

    const setMinMaxNewCases = (regions) => {
        if (regions) {
            let minNewCases = Number.MAX_SAFE_INTEGER;
            let maxNewCases = 0;
            for (const region of regions) {
                if (region.newCases < minNewCases) {
                    minNewCases = region.newCases;
                }
                if (region.newCases > maxNewCases) {
                    maxNewCases = region.newCases;
                }
            }
            setMinNewCases(minNewCases);
            setMaxNewCases(maxNewCases);
        }
    }

    const onDateChange = (newDate) => {
        setMinMaxNewCases(newCasesPerDay.find(date => date.date.getTime() === newDate.getTime())?.regions);
        setRegionsNewCases(newCasesPerDay.find(date => date.date.getTime() === newDate.getTime())?.regions);
    };

    const columns=["regionId", "newCases"];
    return (
        <div className="RegionsStats">
            <DateSlider minDate={minDate} maxDate={maxDate} onDateChange={onDateChange}/>
            { !modeMap && <List columns={columns} regionsNewCasesData={regionsNewCases || []}/>}
            { modeMap && <Map minNewCases={minNewCases} maxNewCases={maxNewCases} regionsNewCasesData={regionsNewCases || []}/>}
        </div>
    );
};

export default RegionsStats;
