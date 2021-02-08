import React, { useState } from "react";
import PropTypes from "prop-types";
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

const Department = ({ name, path, strokeColor, color }) => {
    const [opacity, setOpacity] = useState(0.5)

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const mouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
        setOpacity(1);
    }
    const mouseLeave = () => {
        setAnchorEl(null);
        setOpacity(0.5);
    }

    const open = Boolean(anchorEl);
    return (
        <>
            <path title={name} d={path} stroke={strokeColor} fill={color} fillOpacity={opacity} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}></path>
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
            >{name}</Popover>
        </>
    );
};

Department.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    color: PropTypes.string,
    strokeColor: PropTypes.string
};

Department.defaultProps = {
    color: "#74B4FF",
    strokeColor: "white"
};

export default Department;