import Chart from "react-google-charts";
import React, { useState, useEffect } from "react";
import Charto from "./chart";

const api_URL = "http://localhost:3001/";

const Graph = ({regionId}) => {
    const [nb_cases, setCases] = useState({});
    const [nb_mental_cases, setMental] = useState({});

    const fetchData = async () => {
        const response_nb_cases = await fetch(api_URL +"nbcases/data/month/" + "53");
        let elt_cases = [[
            { type: 'date', label: 'Day' },
            'Number of cases ',
        ]];
        let data = await response_nb_cases.json();
        data.forEach(e=>{
            let elt = [new Date(e[0], e[1]-1), e[2]];
            elt_cases.push(elt)
        });
        setCases(elt_cases);

    };

    const fetchDataMentalCases = async ()=>{
        const response_nb_mental = await fetch(api_URL +"mentalHealth/data/month/" + "53");
        let elt_mental =[[
            { type: 'date', label: 'Day' },
            'Number of mental health issues ( depression, anxiety, problems of sleep',
        ]];
        let data = await response_nb_mental.json();
        data.forEach(e=>{
            let elt = [new Date(e[0], e[1]-1), e[2]];
           elt_mental.push(elt)
        });
        setMental(elt_mental);
    };

    useEffect(async () => {
       await fetchData();
       await fetchDataMentalCases();

    }, []);
    return (
        <div>
            <Charto data={nb_cases}></Charto>
            <Charto data={nb_mental_cases}></Charto>
        </div>

    );
};

export default Graph;

