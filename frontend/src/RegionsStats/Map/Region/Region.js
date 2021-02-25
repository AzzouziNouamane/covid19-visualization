import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { REGIONS } from "./regions"
import {linear} from "../../../Utils/utils";
import {useHistory} from "react-router-dom";
import "./Region.scss";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

const changeSmileyMood = (smileyHtml, moodNumber) => {
    return smileyHtml?.replaceAll(smileyHtml?.split('<')[4]?.split(' ')[3], Number(smileyHtml?.split('<')[4]?.split(' ')[3])+moodNumber) || '';
}

const setSmileyInactive = (smileyHtml) => {
    smileyHtml = smileyHtml?.replaceAll('#F9FC81', 'lightgray');
    return smileyHtml?.replaceAll('<' + smileyHtml?.split('<')[4], '');
}

const Region = ({
                    id,
                    isUserRegion,
                    name,
                    regionNewCases,
                    minNewCasesNow,
                    maxNewCasesNow,
                    minNewCasesEver,
                    maxNewCasesEver,
                    path,
                    smiley,
                    mentalHealthNow,
                    minMentalHealthEver,
                    maxMentalHealthEver
}) => {
    const classes = useStyles();
    let history = useHistory();

    const red = '#eb0e0e';
    const darkBlue = '#4b5969';

    const [redOpacity, setRedOpacity] = useState(linear(minNewCasesNow, 0.05, maxNewCasesNow, 1, regionNewCases) || 0);
    const [blackOpacity, setBlackOpacity] = useState(linear(minNewCasesNow, 0.05, maxNewCasesNow, 1, regionNewCases) || 0);
    const [popover, setPopover] = useState(false);
    const [smileyHtml, setSmileyHtml] = useState(changeSmileyMood(smiley, -10));

    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        setRedOpacity(linear(minNewCasesNow, 0.05, maxNewCasesNow, 1, regionNewCases));
        setBlackOpacity(linear(minNewCasesEver, 0.05, maxNewCasesEver, 1, regionNewCases));
    }, [regionNewCases, minNewCasesNow, maxNewCasesNow, minNewCasesEver, maxNewCasesEver]);

    useEffect(() => {
        if (mentalHealthNow?.anxiete) {
            setSmileyHtml(changeSmileyMood(smiley, linear(minMentalHealthEver, 5, maxMentalHealthEver, -15, (+mentalHealthNow?.anxiete + +mentalHealthNow?.depression) / 2)));
        } else {
            setSmileyHtml(setSmileyInactive(smiley));
        }
    }, [smiley, mentalHealthNow, minMentalHealthEver, maxMentalHealthEver]);

    const mouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
        setPopover(true);
    };
    const mouseLeave = () => {
        setAnchorEl(null);
        setPopover(false);
    };

    const open = Boolean(anchorEl);
    return (
        <>
            <path
                style={{cursor: "pointer"}}
                d={path}
                stroke="black"
                fill={"url(#layers" + id + ")"}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                onClick={() => history.push("/graph/" + REGIONS.find(element => element.name === name)?.id)}
            >
            </path>
            <svg style={{pointerEvents: "none"}} fill="none" dangerouslySetInnerHTML={{ __html: smileyHtml }} />
            <pattern id={"layers" + id} width="5" height="5" patternUnits="userSpaceOnUse">
                <rect fill="white" x="0" y="0" width="5" height="5"/>
                <rect fill={red} opacity={redOpacity} x="0" y="0" width="5" height="5"/>
                <rect fill="black" opacity={blackOpacity} x="0" y="0" width="5" height="5"/>
                <rect fill={darkBlue} opacity={popover ? "1" : "0"} x="0" y="0" width="5" height="5"/>
                { isUserRegion && <rect className="user-region-map" fill={darkBlue} x="0" y="0" width="5" height="5"/> }
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
                    <strong>{name} { isUserRegion && "(votre région)"}</strong>
                </Typography>
                <Typography>
                    Nouveaux cas: {regionNewCases}
                </Typography>
                <Typography>
                    Anxiété: {mentalHealthNow?.anxiete || '?'}
                </Typography>
                <Typography>
                    Dépression: {mentalHealthNow?.depression || '?'}
                </Typography>
                <Typography>
                    Problèmes de sommeil: {mentalHealthNow?.pbsommeil || '?'}
                </Typography>
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
