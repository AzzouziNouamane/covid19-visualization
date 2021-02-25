import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import liveDot from "../assets/live.png";
import "./Cases.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api_URL = "http://localhost:3001/";

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
    const response = await fetch(api_URL + "cases/liveData");
    const data = await response.json();
    setTimeout(() => { 
      setCases(data);
      setLoading(false);
    }, 2000);
  };

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  

  useEffect(() => {
   // setInterval(fetchData(), 10000);
   fetchData().then(res => {
  }).catch(err => {
    notify();
  });
    const interval = setInterval(() => {
      fetchData().then(res => {
      }).catch(err => {
        notify();
      });
    }, 6000);
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
            <img className = "liveDot" src = {liveDot}></img>
            <h1>Statistiques en temps réel</h1> 
          </div>

          <div className = "stats">
          {cases.total.today_confirmed}
            </div>

            <div className = "lastUpdated">
            <span>Dernière mise à jour: 1 minute</span>
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
