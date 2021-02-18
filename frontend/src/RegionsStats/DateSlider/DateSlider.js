import React, { useEffect, useState } from "react";
import { makeStyles, Slider, Tooltip, Typography } from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    slider: {
        width: 300,
        marginLeft: 100
    }
}));

function simulateFetchFirstLastDates(ms) {
    return new Promise(resolve => setTimeout(() => resolve({ firstDatasetDate: new Date(2020, 3, 22), lastDatasetDate: new Date(2020, 3, 24) }), ms));
}

function computeDifferenceInDays(date1, date2) {
    return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
}

const DateSlider = ({onDateChange}) => {
    const [firstDatasetDate, setFirstDatasetDate] = useState(null);
    const [currentSliderValue, setCurrentSliderValue] = useState(0);
    const [maxSliderValue, setMaxSliderValue] = useState(2);
    const [selectedDate, setSelectedDate] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        simulateFetchFirstLastDates(432).then(resultDates => {
            setFirstDatasetDate(resultDates.firstDatasetDate);
            setMaxSliderValue(computeDifferenceInDays(resultDates.firstDatasetDate, resultDates.lastDatasetDate));
            setSelectedDate(resultDates.firstDatasetDate);

            onDateChange(resultDates.firstDatasetDate);
        });
    }, []);

    const dateChanged = (event, newValue) => {
        if (newValue !== currentSliderValue) {
            setCurrentSliderValue(newValue);

            const newValueDate = moment(firstDatasetDate).add(newValue, 'days').toDate();
            setSelectedDate(newValueDate);
            
            onDateChange(newValueDate);
        }
    }

    const sliderLabelFormat = () => {
        return selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : '';
    }

    return (
        <div className={classes.slider}>
                <Typography gutterBottom>
                    Choix de la date
                </Typography>
                <Slider
                    min={0}
                    max={maxSliderValue}
                    defaultValue={0}
                    step={1}
                    onChange={dateChanged}
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
    );
};

DateSlider.propTypes = {
    onDateChange: PropTypes.func
};

DateSlider.defaultProps = {
    onDateChange: () => {}
};

export default DateSlider;
