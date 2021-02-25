import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import ThemeContext from "../../Context/Theme/ThemeContext";
import {linear} from "../../Utils/utils";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

const Region = ({ id, name, regionNewCases, minNewCasesNow, maxNewCasesNow, minNewCasesEver, maxNewCasesEver, path, mentalHealthNow }) => {
    const classes = useStyles();

    const theme = useContext(ThemeContext);

    const red = '#eb0e0e';
    const darkBlue = '#4b5969';

    const [redOpacity, setRedOpacity] = useState(linear(minNewCasesNow, 0.05, maxNewCasesNow, 1, regionNewCases) || 0);
    const [blackOpacity, setBlackOpacity] = useState(linear(minNewCasesNow, 0.05, maxNewCasesNow, 1, regionNewCases) || 0);
    const [popover, setPopover] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        setRedOpacity(linear(minNewCasesNow, 0.05, maxNewCasesNow, 1, regionNewCases));
        setBlackOpacity(linear(minNewCasesEver, 0.05, maxNewCasesEver, 1, regionNewCases));
    }, [regionNewCases, minNewCasesNow, maxNewCasesNow, minNewCasesEver, maxNewCasesEver]);

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
                </Typography>
                {
                    mentalHealthNow?.anxiete &&
                    <Typography>
                        Anxiété: {mentalHealthNow?.anxiete}
                    </Typography>
                }
                {
                    mentalHealthNow?.depression &&
                    <Typography>
                        Dépression: {mentalHealthNow?.depression}
                    </Typography>
                }
                {
                    mentalHealthNow?.pbsommeil &&
                    <Typography>
                        Problèmes de sommeil: {mentalHealthNow?.pbsommeil}
                    </Typography>
                }
            </Popover>
        </>
    );
};

Region.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    regionNewCases: PropTypes.number,
    minNewCasesNow: PropTypes.number,
    maxNewCasesNow: PropTypes.number,
    minNewCasesEver: PropTypes.number,
    maxNewCasesEver: PropTypes.number
};

Region.defaultProps = {
    regionNewCases: 0,
    minNewCasesNow: 0,
    maxNewCasesNow: 0,
    minNewCasesEver: 0,
    maxNewCasesEver: 0
};

export default Region;
