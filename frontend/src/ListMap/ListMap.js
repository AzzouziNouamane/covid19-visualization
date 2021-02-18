import React, { useEffect, useState } from "react";
import { makeStyles, Slider, Tooltip, Typography } from "@material-ui/core";
import Map from "./Map/Map";
import List from "./List/List";
import moment from "moment";

const NEW_CASES_MOCK = [
    {
        date: new Date(2020, 3, 22),
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
        date: new Date(2020, 3, 23),
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
    },
    {
        date: new Date(2020, 3, 24),
        regions: [
            {
                regionId: 44,
                newCases: 453
            },
            {
                regionId: 28,
                newCases: 301
            }
        ]
    }
];

function simulateFetchNewCases(date, ms) {
    return new Promise(resolve => setTimeout(() => resolve(NEW_CASES_MOCK.find(d => {
        return d.date.getTime() === date.getTime();
    }).regions), ms));
}

function simulateFetchFirstLastDates(ms) {
    return new Promise(resolve => setTimeout(() => resolve({ firstDatasetDate: new Date(2020, 3, 22), lastDatasetDate: new Date(2020, 3, 24) }), ms));
}

const useStyles = makeStyles((theme) => ({
    slider: {
        width: 300,
        marginLeft: 100
    }
}));

function computeDifferenceInDays(date1, date2) {
    return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
}

const ListMap = () => {
    const [firstDatasetDate, setFirstDatasetDate] = useState(null);
    const [currentSliderValue, setCurrentSliderValue] = useState(0);
    const [maxSliderValue, setMaxSliderValue] = useState(2);
    const [regionsNewCases, setRegionsNewCases] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modeMap, setModeMap] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        simulateFetchFirstLastDates(1000).then(resultDates => {
            setFirstDatasetDate(resultDates.firstDatasetDate);
            setMaxSliderValue(computeDifferenceInDays(resultDates.firstDatasetDate, resultDates.lastDatasetDate));
            setSelectedDate(resultDates.firstDatasetDate);
            
            simulateFetchNewCases(resultDates.firstDatasetDate, 1000).then(resultNewCases => {
                setRegionsNewCases(resultNewCases);
            });
        });
    }, []);

    const periodChanged = (event, newValue) => {
        if (newValue !== currentSliderValue) {
            setCurrentSliderValue(newValue);

            const newValueDate = moment(firstDatasetDate).add(newValue, 'days').toDate();
            setSelectedDate(newValueDate);
            
            simulateFetchNewCases(newValueDate, 1000).then(result => {
                setRegionsNewCases(result);
            })
        }
    }

    const sliderLabelFormat = () => {
        return selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : '';
    }

    return (
        <>
            { !modeMap && <List newCases={regionsNewCases}></List>}
            { modeMap && <Map newCases={regionsNewCases}></Map>}
            <div className={classes.slider}>
                <Typography gutterBottom>
                    Choix de la période
                </Typography>
                <Slider
                    min={0}
                    max={maxSliderValue}
                    defaultValue={0}
                    step={1}
                    onChange={periodChanged}
                    valueLabelFormat={sliderLabelFormat}
                    ValueLabelComponent={({ children, open, value }) => {
                        return (
                            <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
                                {children}
                            </Tooltip>
                        );
                    }}
                    valueLabelDisplay="auto"
                />
            </div>
        </>
    );
};

export default ListMap;