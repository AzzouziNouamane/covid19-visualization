import React, {useContext, useEffect, useState} from "react";
import { makeStyles, Slider, Tooltip, Typography } from "@material-ui/core";
import moment from 'moment-timezone';
import PropTypes from "prop-types";
import ThemeContext from "../../Context/Theme/ThemeContext";

const useStyles = makeStyles((theme) => ({
    slider: {
        width: 400,
        marginBottom: 10
    }
}));

function computeDifferenceInDays(date1, date2) {
    return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
}

const DateSlider = ({onDateChange, minDate, maxDate}) => {
    const [firstDatasetDate, setFirstDatasetDate] = useState(null);
    const [currentSliderValue, setCurrentSliderValue] = useState(0);
    const [maxSliderValue, setMaxSliderValue] = useState(2);
    const [selectedDate, setSelectedDate] = useState(null);
    const classes = useStyles();

    const theme = useContext(ThemeContext);

    useEffect(() => {
        if (minDate && maxDate) {
            setFirstDatasetDate(minDate);
            setMaxSliderValue(computeDifferenceInDays(minDate, maxDate));
            setSelectedDate(minDate);
            onDateChange(minDate);
        }
    }, [minDate, maxDate]);

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
                <Typography align='center'>
                    Date
                </Typography>
                <Slider
                    color={ theme.isDark ? 'secondary': 'primary' }
                    min={0}
                    max={maxSliderValue}
                    defaultValue={0}
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
