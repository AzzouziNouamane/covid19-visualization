import { useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import Charto from "./Chart";
import 'react-toastify/dist/ReactToastify.css';
import {REGIONS} from "../RegionsStats/Map/Region/regions";
import {apiUrl, dataLoadingError} from "../Utils/utils";
import "../App.scss";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./Graph.scss";



const Graph = () => {
    let params = useParams();
    const [nbCases, setCases] = useState([]);
    const [nbMentalCases, setMental] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const responseNbCases = await fetch(apiUrl +"nbcases/data/month/" + params.regionId);
        let eltCases = [[
            { type: 'date', label: 'Mois' },
            'Nombre de cas ',
        ]];
        let data = await responseNbCases.json();
        data.forEach(e=>{
            let elt = [new Date(e[0], e[1]-1), e[2]];
            eltCases.push(elt)
        });

        setCases(eltCases)
        setLoading(false);
    };

    const fetchDataMentalCases = async ()=>{
        const responseNbMental= await fetch(apiUrl +"mentalHealth/data/month/" + params.regionId);
        let eltMental =[[
            { type: 'date', label: 'Jour' },
            'Nombre de personnes ayant des problèmes de santé mentale (dépression, anxiété, problèmes de sommeil)',
        ]];
        let data = await responseNbMental.json();
        data.forEach(e=>{
            let elt = [new Date(e[0], e[1]-1), e[2]];
            eltMental.push(elt)
        });
        setMental(eltMental);
        setLoading(false);
    };

    useEffect(() => {
        fetchData().catch(() => {
            dataLoadingError();
        });
        fetchDataMentalCases().catch(() => {
            dataLoadingError();
        });
    }, []);

    return (
        <div className = "Graph">
             {loading || (!nbCases && !nbMentalCases) ? (
            <div className = "loadingStats">
              <CircularProgress className = "firstSpinner" color="secondary" />
              <CircularProgress className = "secondSpinner" color="secondary" />
            </div>
        ) : (
            <div>            
                <h1 style={{marginTop: "0", paddingTop: "20px"}}>{ REGIONS.find(element => +element.id === +params.regionId)?.name }</h1>
                <Charto data={nbCases}/>
                <Charto data={nbMentalCases}/>
            </div>
        )}
        </div>
    );
};

export default Graph;

