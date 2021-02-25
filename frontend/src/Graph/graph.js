import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Charto from "./chart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api_URL = "http://localhost:3001/";
const notify = () => toast.error('Désolé, une erreur est survenue ! Merci de réessayer ultérieurement.', {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

const Graph = () => {
    let params = useParams();
    const [nb_cases, setCases] = useState({});
    const [nb_mental_cases, setMental] = useState({});

    const fetchData = async () => {
        const response_nb_cases = await fetch(api_URL +"nbcases/data/month/" + params.regionId);
        let elt_cases = [[
            { type: 'date', label: 'mois' },
            'Nombre de cas ',
        ]];
        let data = await response_nb_cases.json();
        data.forEach(e=>{
            let elt = [new Date(e[0], e[1]-1), e[2]];
            elt_cases.push(elt)
        });
        setCases(elt_cases);


    };

    const fetchDataMentalCases = async ()=>{
        const responseNbMental= await fetch(api_URL +"mentalHealth/data/month/" + params.regionId);
        let elt_mental =[[
            { type: 'date', label: 'Day' },
            'Nombre des gens qui ont des problèmes de santé mentale (dépression, anxiété, problèmes de sommeil)',
        ]];
        let data = await responseNbMental.json();
        data.forEach(e=>{
            let elt = [new Date(e[0], e[1]-1), e[2]];
           elt_mental.push(elt)
        });
        setMental(elt_mental);
    };

    useEffect(async () => {
       await fetchData().catch(err => {
        notify();
      });;
       await fetchDataMentalCases().catch(err => {
        notify();
      });;
    }, []);
    return (
        <div>
            <Charto data={nb_cases}></Charto>
            <Charto data={nb_mental_cases}></Charto>

            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
        </div>

    );
};

export default Graph;

