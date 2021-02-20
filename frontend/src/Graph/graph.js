import Chart from "react-google-charts";
import React, { useState, useEffect } from "react";

const api_URL = "http://localhost:3001/";

const Graph = ({period}) => {
    const [nb_cases, setCases] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const response = await fetch(api_URL + "cases");
        const data = await response.json();
        setCases(data);
        setLoading(false);

    };

    useEffect(async () => {
       await fetchData();

    }, []);
    return (
        <Chart
            width={'100%'}
            height={'500'}
            chartType="Line"
            loader={<div>

                <div>Loading</div>
            </div>}
            data={[
                [
                    { type: 'date', label: 'Day' },
                    'Number of cases ',
                    'Number of mental health issues',
                ],
                [new Date(2014, 0), -0.5, 5.7],
                [new Date(2014, 1), 0.4, 8.7],
                [new Date(2014, 2), 0.5, 12],
                [new Date(2014, 3), 2.9, 15.3],
                [new Date(2014, 4), 6.3, 18.6],
                [new Date(2014, 5), 9, 20.9],
                [new Date(2014, 6), 10.6, 19.8],
                [new Date(2014, 7), 10.3, 16.6],
                [new Date(2014, 8), 7.4, 13.3],
                [new Date(2014, 9), 4.4, 9.9],
                [new Date(2014, 10), 1.1, 6.6],
                [new Date(2014, 11), -0.2, 4.5],
            ]}
            options={{
                chart: {
                    title:
                        'Number of cases vs Number of mental health issues through'+ period,
                },
                width: 900,
                height: 500,
                series: {
                    // Gives each series an axis name that matches the Y-axis below.
                    0: { axis: 'NumberC' },
                    1: { axis: 'NumberM' },
                },
                axes: {
                    // Adds labels to each axis; they don't have to match the axis names.
                    y: {
                        NumberC: { label: 'Number of cases (per person)' },
                        NumberM: { label: 'Number of mental issues (per person)' }
                        },
                },
            }}
            rootProps={{ 'data-testid': '4' }}
        />
    );
};

export default Graph;

