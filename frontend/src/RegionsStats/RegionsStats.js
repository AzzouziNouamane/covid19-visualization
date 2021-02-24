import React, {useEffect, useState} from "react";
import Map from "./Map/Map";
import List from "./List/List";
import DateSlider from "./DateSlider/DateSlider";
import "./RegionsStats.css";

const RegionsStats = () => {
    const [regionsNewCases, setRegionsNewCases] = useState([]);
    const [newCasesPerDay, setNewCasesPerDay] = useState([]);
    const [modeMap, setModeMap] = useState(true);
    const [minNewCasesDate, setMinNewCasesDate] = useState(0);
    const [maxNewCasesDate, setMaxNewCasesDate] = useState(0);
    const [minNewCasesAllDates, setMinNewCasesAllDates] = useState(0);
    const [maxNewCasesAllDates, setMaxNewCasesAllDates] = useState(0);
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
                setMinMaxNewCasesAllDates(dataPerDayResult);
                setMinMaxNewCasesDate(dataPerDayResult[0].regions);
                setMinDate(dataPerDayResult[0].date);
                setMaxDate(dataPerDayResult[dataPerDayResult.length-1].date);
                setNewCasesPerDay(dataPerDayResult);
                setRegionsNewCases(dataPerDayResult[0].regions)
            });
    }, []);

    const setMinMaxNewCasesAllDates = (dataPerDay) => {
        if (dataPerDay) {
            let minNewCasesDateAllDates = Number.MAX_SAFE_INTEGER;
            let maxNewCasesDateAllDates = 0;
            for (const day of dataPerDay) {
                for (const region of day.regions) {
                    if (region.newCases < minNewCasesDateAllDates) {
                        minNewCasesDateAllDates = region.newCases;
                    }
                    if (region.newCases > maxNewCasesDateAllDates) {
                        maxNewCasesDateAllDates = region.newCases;
                    }
                }
            }
            setMinNewCasesAllDates(minNewCasesDateAllDates);
            setMaxNewCasesAllDates(maxNewCasesDateAllDates);
        }
    }

    const setMinMaxNewCasesDate = (regions) => {
        if (regions) {
            let minNewCasesDate = Number.MAX_SAFE_INTEGER;
            let maxNewCasesDate = 0;
            for (const region of regions) {
                if (region.newCases < minNewCasesDate) {
                    minNewCasesDate = region.newCases;
                }
                if (region.newCases > maxNewCasesDate) {
                    maxNewCasesDate = region.newCases;
                }
            }
            setMinNewCasesDate(minNewCasesDate);
            setMaxNewCasesDate(maxNewCasesDate);
        }
    }

    const onDateChange = (newDate) => {
        const regions = newCasesPerDay.find(date => date.date.getTime() === newDate.getTime())?.regions;
        setMinMaxNewCasesDate(regions);
        setRegionsNewCases(regions);
    };

    const columns=["regionId", "newCases"];
    return (
        <div className="RegionsStats">
            <DateSlider minDate={minDate} maxDate={maxDate} onDateChange={onDateChange}/>
            { !modeMap && <List columns={columns} regionsNewCasesData={regionsNewCases || []}/>}
            { modeMap && <Map minNewCasesDate={minNewCasesDate}
                              maxNewCasesDate={maxNewCasesDate}
                              minNewCasesAllDates={minNewCasesAllDates}
                              maxNewCasesAllDates={maxNewCasesAllDates}
                              regionsNewCases={regionsNewCases || []}/>}
        </div>
    );
};

export default RegionsStats;
