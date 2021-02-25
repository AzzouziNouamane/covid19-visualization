import React, { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import liveDot from "../assets/live.png";
import "./Cases.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = "http://localhost:3001/";

const Cases = () => {
  const [cases, setCases] = useState({});
  const [loading, setLoading] = useState(true);

  const notify = () => toast.error('Désolé, une erreur est survenue ! Merci de réessayer ultérieurement.', {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const fetchData = async () => {
    const response = await fetch(apiUrl + "cases/liveData");
    const data = await response.json();
    setTimeout(() => {
      setCases(data);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchData().catch(() => {
      notify();
    });
    const interval = setInterval(() => {
      fetchData().catch(() => {
        notify();
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
      <div className = "Cases">
        {loading || !cases ? (
            <div className = "loadingCases">
              <CircularProgress color="secondary" />
            </div>
        ) : (
            <div className = "cardStats">
              <div className = "title">
                <h4>Nouveaux cas aujourd'hui (monde)</h4>
              </div>

              <div className = "stats">
                <img className="liveDot" alt="live dot" src={liveDot}/>
                {cases.total.today_confirmed}
              </div>

              <div className = "lastUpdated">
                <span>(mis à jour toutes les minutes)</span>
              </div>
            </div>
        )}

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

export default Cases;
