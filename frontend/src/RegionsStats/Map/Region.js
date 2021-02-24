import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import ThemeContext from "../../Context/Theme/ThemeContext";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

const computeOpacity = (regionNewCases, minNewCases, maxNewCases) => {
    if (minNewCases === 0 && maxNewCases === 0) {
        return 0;
    }
    return ((1 - 0.05) / (maxNewCases - minNewCases)) * regionNewCases + (1 - ((1 - 0.05) / (maxNewCases - minNewCases)) * maxNewCases);
}

const Region = ({ id, name, regionNewCases, minNewCasesDate, maxNewCasesDate, minNewCasesAllDates, maxNewCasesAllDates, path }) => {
    const classes = useStyles();

    const theme = useContext(ThemeContext);

    const red = '#eb0e0e';
    const darkBlue = '#4b5969';

    const [redOpacity, setRedOpacity] = useState(computeOpacity(regionNewCases, minNewCasesDate, maxNewCasesDate) || 0);
    const [blackOpacity, setBlackOpacity] = useState(computeOpacity(regionNewCases, minNewCasesAllDates, maxNewCasesAllDates) || 0);
    const [popover, setPopover] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        setRedOpacity(computeOpacity(regionNewCases, minNewCasesDate, maxNewCasesDate));
        setBlackOpacity(computeOpacity(regionNewCases, minNewCasesAllDates, maxNewCasesAllDates));
    }, [regionNewCases, minNewCasesDate, maxNewCasesDate, minNewCasesAllDates, maxNewCasesAllDates]);

    const mouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
        setPopover(true);
    }
    const mouseLeave = () => {
        setAnchorEl(null);
        setPopover(false);
    }

    const open = Boolean(anchorEl);
    return (
        <>
            <path
                d={path}
                stroke={ theme.background }
                fill={"url(#layers" + id + ")"}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}>
            </path>
            <pattern id={"layers" + id} width="5" height="5" patternUnits="userSpaceOnUse">
                <rect fill="white" x="0" y="0" width="5" height="5"/>
                <rect fill={red} opacity={redOpacity} x="0" y="0" width="5" height="5"/>
                <rect fill="black" opacity={blackOpacity} x="0" y="0" width="5" height="5"/>
                <rect fill={darkBlue} opacity={popover ? "1" : "0"} x="0" y="0" width="5" height="5"/>
            </pattern>
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={mouseLeave}
                disableRestoreFocus
            >
                <Typography align='center'>
                    <strong>{name}</strong>
                </Typography>
                <Typography>
                    Nouveaux cas: {regionNewCases}
                </Typography></Popover>
        </>
    );
};

Region.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    regionNewCases: PropTypes.number,
    minNewCasesDate: PropTypes.number,
    maxNewCasesDate: PropTypes.number,
    minNewCasesAllDates: PropTypes.number,
    maxNewCasesAllDates: PropTypes.number
};

Region.defaultProps = {
    regionNewCases: 0,
    minNewCasesDate: 0,
    maxNewCasesDate: 0,
    minNewCasesAllDates: 0,
    maxNewCasesAllDates: 0
};

export default Region;
