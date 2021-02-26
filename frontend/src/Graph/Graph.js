import { useParams } from "react-router-dom";
import React, {useState, useEffect, useContext} from "react";
import Charto from "./Chart";
import 'react-toastify/dist/ReactToastify.css';
import {REGIONS} from "../RegionsStats/Map/Region/regions";
import {apiUrl, dataLoadingError} from "../Utils/utils";
import Button from "reactstrap/lib/Button";
import "../App.css";
import ThemeContext from "../Context/Theme/ThemeContext";
import {useHistory} from "react-router-dom";




const Graph = () => {
    let params = useParams();
    const theme = useContext(ThemeContext);
    const [nbCases, setCases] = useState({});
    const [nbMentalCases, setMental] = useState({});
    const history = useHistory();

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
        setCases(eltCases);
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
        <div>
            <h1 style={{marginTop: "0", paddingTop: "20px"}}>{ REGIONS.find(element => +element.id === +params.regionId)?.name }</h1>
            <Charto data={nbCases}/>
            <Charto data={nbMentalCases}/>
            <Button  onClick={() => history.push("/home/")} style={{ backgroundColor : theme.isDark? "white" : "black", color : theme.isDark? "black" : "white", }}> Retour </Button>
            <Button  onClick={() => history.push("/contact/")} style={{ backgroundColor : theme.isDark? "white" : "black", color : theme.isDark? "black" : "white", }}> Contact </Button>

        </div>
    );
};

export default Graph;

