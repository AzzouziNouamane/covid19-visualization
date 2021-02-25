import {useParams} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Charto from "./Chart";
import {REGIONS} from "../RegionsStats/Map/regions";

const apiUrl = "http://localhost:3001/";

const Graph = () => {
    const params = useParams();
    const [nbCases, setCases] = useState({});
    const [nbMentalCases, setMental] = useState({});

    const fetchData = async () => {
        const responseNbCases = await fetch(apiUrl +"nbcases/data/month/" + params.regionId);
        let eltCases = [[
            { type: 'date', label: 'mois' },
            'Nombre de cas ',
        ]];
        let data = await responseNbCases.json();
        data.forEach(e => {
            let elt = [new Date(e[0], e[1]-1), e[2]];
            eltCases.push(elt)
        });
        setCases(eltCases);
    };

    const fetchDataMentalCases = async () => {
        const responseNbMental= await fetch(apiUrl +"mentalHealth/data/month/" + params.regionId);
        let eltMental =[[
            { type: 'date', label: 'Day' },
            'Nombre de personnes ayant des problèmes de santé mentale (dépression, anxiété, problèmes de sommeil)',
        ]];
        let data = await responseNbMental.json();
        data.forEach(e=>{
            let elt = [new Date(e[0], e[1]-1), e[2]];
            eltMental.push(elt)
        });
        setMental(eltMental);
    };

    useEffect( () => {
        fetchData();
        fetchDataMentalCases();
    }, []);

    return (
        <div>
            <h1 style={{marginTop: "0", paddingTop: "20px"}}>{REGIONS.find(element => +element.id === +params.regionId)?.name}</h1>
            <Charto data={nbCases}/>
            <Charto data={nbMentalCases}/>
        </div>
    );
};

export default Graph;

