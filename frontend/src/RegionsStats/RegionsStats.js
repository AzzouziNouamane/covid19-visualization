import React, {useEffect, useState} from "react";
import Map from "./Map/Map";
import List from "./List/List";
import DateSlider from "./DateSlider/DateSlider";
import "./RegionsStats.scss";
import {apiUrl, computeDifferenceInDays, linear} from "../Utils/utils";
import Toggle from "react-toggle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobeEurope, faList} from "@fortawesome/free-solid-svg-icons";
import {REGIONS} from "./Map/Region/regions";
import UseLocalStorage from "../Utils/LocalStorage/UseLocalStorage";
import 'react-toastify/dist/ReactToastify.css';
import {dataLoadingError} from "../Utils/utils";

const RegionsStats = () => {
    const [modeMapStorage, setModeMapStorage] = UseLocalStorage('modeMap');
    const [newCasesNow, setNewCasesNow] = useState([]);
    const [mentalHealthNow, setMentalHealthNow] = useState([]);
    const [newCasesPerDay, setNewCasesPerDay] = useState([]);
    const [mentalHealthPerDay, setMentalHealthPerDay] = useState([]);
    const [modeMap, setModeMap] = useState(modeMapStorage);
    const [minNewCasesNow, setMinNewCasesNow] = useState(0);
    const [maxNewCasesNow, setMaxNewCasesNow] = useState(0);
    const [minNewCasesEver, setMinNewCasesEver] = useState(0);
    const [maxNewCasesEver, setMaxNewCasesEver] = useState(0);
    const [minMentalHealthEver, setMinMentalHealthEver] = useState(0);
    const [maxMentalHealthEver, setMaxMentalHealthEver] = useState(0);
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch(apiUrl + 'nbcases/data/day'),
            fetch(apiUrl + 'mentalHealth/data')
        ]).then(async ([casesPerDay, mentalHealthPerDay]) => {
            casesPerDay = await casesPerDay.json();
            mentalHealthPerDay = await mentalHealthPerDay.json();

            const filterDay = (day) => {
                day.date = new Date(day.date);
                const regions = [];
                for (const region of day.regions) {
                    if (REGIONS.find(r => r.id + "" === region.regionId)) {
                        regions.push(region);
                    }
                }
                day.regions = regions;
                return day;
            }

            casesPerDay = casesPerDay.map(day => filterDay(day));
            mentalHealthPerDay = mentalHealthPerDay.map(day => filterDay(day));

            setMinMaxNewCasesEver(casesPerDay);
            setMinMaxNewCasesNow(casesPerDay[0].regions);
            setMinDate(casesPerDay[0].date);
            setMaxDate(casesPerDay[casesPerDay.length-1].date);
            setNewCasesPerDay(casesPerDay);
            setNewCasesNow(casesPerDay[0].regions);

            setMinMaxMentalHealthEver(mentalHealthPerDay);
            setMentalHealthPerDay(mentalHealthPerDay);
            setMentalHealthNow(computeMentalHealthAtDate(casesPerDay[0].date, mentalHealthPerDay))
        }).catch(() => {
            dataLoadingError();
        });
    }, []);

    useEffect(() => {
        setModeMap(modeMapStorage);
    }, [modeMapStorage]);

    const setMinMaxNewCasesEver = (dataPerDay) => {
        if (dataPerDay) {
            let minNewCasesNowEver = Number.MAX_SAFE_INTEGER;
            let maxNewCasesNowEver = 0;
            for (const day of dataPerDay) {
                for (const region of day.regions) {
                    if (region.newCases < minNewCasesNowEver) {
                        minNewCasesNowEver = region.newCases;
                    }
                    if (region.newCases > maxNewCasesNowEver) {
                        maxNewCasesNowEver = region.newCases;
                    }
                }
            }
            setMinNewCasesEver(minNewCasesNowEver);
            setMaxNewCasesEver(maxNewCasesNowEver);
        }
    }

    const setMinMaxMentalHealthEver = (mentalHealthPerDay) => {
        if (mentalHealthPerDay) {
            let minMentalHealthEver = Number.MAX_SAFE_INTEGER;
            let maxMentalHealthEver = 0;
            for (let i = 5; i < mentalHealthPerDay.length; i++) {
                for (const region of mentalHealthPerDay[i].regions) {
                    const regionMentalHealth = (+region.anxiete + +region.depression) / 2;
                    if (regionMentalHealth < minMentalHealthEver) {
                        minMentalHealthEver = regionMentalHealth;
                    }
                    if (regionMentalHealth > maxMentalHealthEver) {
                        maxMentalHealthEver = regionMentalHealth;
                    }
                }
            }
            setMinMentalHealthEver(minMentalHealthEver);
            setMaxMentalHealthEver(maxMentalHealthEver);
        }
    }

    const setMinMaxNewCasesNow = (regions) => {
        if (regions) {
            let minNewCasesNow = Number.MAX_SAFE_INTEGER;
            let maxNewCasesNow = 0;
            for (const region of regions) {
                if (region.newCases < minNewCasesNow) {
                    minNewCasesNow = region.newCases;
                }
                if (region.newCases > maxNewCasesNow) {
                    maxNewCasesNow = region.newCases;
                }
            }
            setMinNewCasesNow(minNewCasesNow);
            setMaxNewCasesNow(maxNewCasesNow);
        }
    }

    const computeMentalHealthAtDate = (newDate, mentalHealthPerDay) => {
        const mentalHealth = mentalHealthPerDay.find(mentalHealth => mentalHealth.date.getTime() === newDate.getTime())?.regions || [];
        if (mentalHealth.length === 0 && mentalHealthPerDay.length > 1) {
            for (let i = 0; i < mentalHealthPerDay.length-1; i++) {
                if (mentalHealthPerDay[i].date.getTime() < newDate && newDate < mentalHealthPerDay[i+1].date.getTime()) {
                    const x = computeDifferenceInDays(mentalHealthPerDay[i].date, newDate);
                    const diff = computeDifferenceInDays(mentalHealthPerDay[i].date, mentalHealthPerDay[i+1].date);
                    for (let j = 0; j < mentalHealthPerDay[i].regions.length; j++) {
                        if (mentalHealthPerDay[i+1].regions[j]) {
                            const x1 = 0;
                            const x2 = diff;
                            const anxieteY1 = mentalHealthPerDay[i].regions[j].anxiete;
                            const anxieteY2 = mentalHealthPerDay[i+1].regions[j].anxiete;
                            const depressionY1 = mentalHealthPerDay[i].regions[j].depression;
                            const depressionY2 = mentalHealthPerDay[i+1].regions[j].depression;
                            const pbsommeilY1 = mentalHealthPerDay[i].regions[j].pbsommeil;
                            const pbsommeilY2 = mentalHealthPerDay[i+1].regions[j].pbsommeil;
                            mentalHealth.push({
                                regionId: mentalHealthPerDay[i].regions[j].regionId,
                                anxiete: linear(x1, anxieteY1, x2, anxieteY2, x).toFixed(0),
                                depression: linear(x1, depressionY1, x2, depressionY2, x).toFixed(0),
                                pbsommeil: linear(x1, pbsommeilY1, x2, pbsommeilY2, x).toFixed(0),
                            })
                        }
                    }
                }
            }
        }
        return mentalHealth;
    }

    const onDateChange = (newDate) => {
        const regions = newCasesPerDay.find(date => date.date.getTime() === newDate.getTime())?.regions;
        setMinMaxNewCasesNow(regions);
        setNewCasesNow(regions);

        setMentalHealthNow(computeMentalHealthAtDate(newDate, mentalHealthPerDay));
    };

    const onModeMapChange = () => {
        const newModeMap = !modeMap;
        setModeMap(newModeMap)
        setModeMapStorage(newModeMap);
    };

    const columns=["regionId", "newCases"];
    return (
        <div className="RegionsStats">
            <div id="display">
                <DateSlider minDate={minDate} maxDate={maxDate} onDateChange={onDateChange}/>
                { !modeMap && <List columns={columns} newCasesNow={newCasesNow || []}/>}
                { modeMap && <Map minNewCasesNow={minNewCasesNow}
                                  maxNewCasesNow={maxNewCasesNow}
                                  minNewCasesEver={minNewCasesEver}
                                  maxNewCasesEver={maxNewCasesEver}
                                  newCasesNow={newCasesNow || []}
                                  mentalHealthNow={mentalHealthNow || []}
                                  minMentalHealthEver={minMentalHealthEver}
                                  maxMentalHealthEver={maxMentalHealthEver}/>}
            </div>
            <div id="mapMode">
                <Toggle
                    icons={{
                        checked: (
                            <FontAwesomeIcon icon={faList} />
                        ),
                        unchecked: (
                            <FontAwesomeIcon icon={faGlobeEurope} />
                        ),
                    }}
                    onChange={onModeMapChange}
                    defaultChecked={!modeMap}
                />
            </div>
        </div>
    );
};

export default RegionsStats;
