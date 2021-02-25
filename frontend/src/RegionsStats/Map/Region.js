import React, { useEffect, useState } from "react";
import PropTypes, {element} from "prop-types";
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Graph from "../../Graph/graph";
import { REGIONS } from "./regions"
const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

const Region = ({  name, redOpacity, path, newCases,key }) => {
    const classes = useStyles();
    const red = '#eb0e0e';
    const blue = '#b6d2f0';
    const darkBlue = '#4b5969';

    const [color, setColor] = useState(redOpacity ? red : blue);
    const[id, setId] = useState(key);
    const [opacity, setOpacity] = useState(redOpacity || 1);
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        setColor(redOpacity ? red : blue);
        setId(key);
        setOpacity(redOpacity || 1);
    }, [redOpacity]);

    const mouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
        setColor(darkBlue);
        setOpacity(1);
        console.log(name)
    };
    const mouseLeave = () => {
        setAnchorEl(null);
        setColor(redOpacity ? red : blue);
        setOpacity(redOpacity || 1);
    };
    const navigate = ()=>{
        let reg = REGIONS.find(element => element.name === name);
        console.log(reg);
        window.location.href = "http://localhost:3000/graph/"+ reg.id
    };

    const open = Boolean(anchorEl);
    return (
        <>

            <path
                d={path}
                stroke="white"
                fill={color}
                opacity={opacity}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                onClick={navigate}
            >
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
            >
                <Typography align='center'>
                    <strong>{name}</strong>
                </Typography>
                <Typography>
                    Nouveaux cas: {newCases}
                </Typography></Popover>
        </>

    );
};

Region.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    redOpacity: PropTypes.number,
    newCases: PropTypes.number
};

Region.defaultProps = {
    redOpacity: 0,
    newCases: 0
};

export default Region;
