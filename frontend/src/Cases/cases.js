import React, { useState, useEffect } from "react";

const api_URL = "http://localhost:3001/";

const Cases = () => {
  const [cases, setCases] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetch(api_URL + "cases");
    const data = await response.json();
    setCases(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading || !cases ? (
        <div>Loading</div>
      ) : (
        <div>
          <p>Today's date: {cases.total.date}</p>
          <p>Today new confirmed cases: {cases.total.today_new_confirmed}</p>
          <p>Today new recovered cases: {cases.total.today_new_recovered}</p>
          <p>Today new confirmed deaths: {cases.total.today_new_deaths}</p>
        </div>
      )}
    </div>
  );
};

export default Cases;
