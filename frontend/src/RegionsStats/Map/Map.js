import React, {useEffect, useState} from "react";
import { REGIONS } from "./Region/regions";
import Region from "./Region/Region";
import { dataLoadingError } from "../../Utils/utils";

const getUserRegionId = async (lat, lon) => {
    let regionId;
    try {
        let depRes = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`);
        depRes = await depRes.json();
        const depCode = depRes.features[0]?.properties?.context?.split(',')[0]

        let regRes = await fetch(`https://geo.api.gouv.fr/departements/${depCode}`);
        regRes = await regRes.json();
        regionId = +regRes.codeRegion
    } catch (e) {
        dataLoadingError();
    }

    return regionId;
}

const Map = ({
                 newCasesNow,
                 minNewCasesNow,
                 maxNewCasesNow,
                 minNewCasesEver,
                 maxNewCasesEver,
                 mentalHealthNow,
                 minMentalHealthEver,
                 maxMentalHealthEver
             }) => {

    const [userRegionId, setUserRegionId] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
                setUserRegionId(await getUserRegionId(position.coords.latitude, position.coords.longitude));
            })
    }, [])
    return (
        <svg width="578px" height="544px" viewBox="0 0 578 544">
            <g id="carte" transform="translate(12.000000, 12.000000)">
                {
                    REGIONS.map(region =>
                        <Region
                            id={region.id}
                            isUserRegion={userRegionId === region.id}
                            key={region.id}
                            path={region.path}
                            smiley={region.smiley}
                            name={region.name}
                            regionNewCases={newCasesNow.find(r => region.id + "" === r.regionId)?.newCases}
                            minNewCasesNow={minNewCasesNow}
                            maxNewCasesNow={maxNewCasesNow}
                            minNewCasesEver={minNewCasesEver}
                            maxNewCasesEver={maxNewCasesEver}
                            mentalHealthNow={mentalHealthNow.find(r => region.id + "" === r.regionId)}
                            minMentalHealthEver={minMentalHealthEver}
                            maxMentalHealthEver={maxMentalHealthEver}>
                        </Region>)
                }
            </g>
        </svg>
    );
};

Map.defaultProps = {
    newCasesNowData: []
};

export default Map;
