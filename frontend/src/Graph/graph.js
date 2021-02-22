import Chart from "react-google-charts";
import React, { useState, useEffect } from "react";
import Charto from "./chart";

const api_URL = "http://localhost:3001/nbcases/data/month/";

const Graph = ({regionId}) => {
    const [nb_cases, setCases] = useState({});
    const [nb_mental_cases, setMental] = useState({});

    const fetchData = async () => {
        const response = await fetch(api_URL + "53");
        let elt_cases = [[
            { type: 'date', label: 'Day' },
            'Number of cases ',
        ]];
        let elt_mental =[[
            { type: 'date', label: 'Day' },
            'Number of mental health issues ( depression, anxiety, problems of sleep',
        ]];
        let data = await response.json();
        console.log(data);

        data.forEach(e=>{
            let data_cases = [new Date(e[0], e[1]-1), e[2]];
            let data_mental = [new Date(e[0], e[1]-1), e[3]];
            elt_cases.push(data_cases);
            elt_mental.push(data_mental)
        });
        console.log(elt_cases);
        setMental(elt_mental);
        setCases(elt_cases);

    };

    useEffect(async () => {
       await fetchData();

    }, []);
    return (
        <div>
            <Charto data={nb_cases}></Charto>
            <Charto data={nb_mental_cases}></Charto>
        </div>

    );
};

export default Graph;

