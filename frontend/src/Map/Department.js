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

const Department = ({ name, path, strokeColor, color, stripesColor, stripesOpacity }) => {
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
            <path
                title={name}
                d={path}
                stroke={strokeColor}
                fill="url(#diagonalHatch)"
                fillOpacity={opacity}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}>
            </path>
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
            <pattern id="diagonalHatch" width="5" height="5" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <rect fill={color} x="0" y="0" width="5" height="5" strokeWidth="0"></rect>
                <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: stripesColor, strokeWidth: 5 }} opacity={stripesOpacity} />
            </pattern>
        </>
    );
};

Department.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    color: PropTypes.string,
    strokeColor: PropTypes.string,
    stripesColor: PropTypes.string,
    stripesOpacity: PropTypes.number
};

Department.defaultProps = {
    color: "#8aa9eb",
    strokeColor: "white",
    stripesColor: "black",
    stripesOpacity: 0.1
};

export default Department;