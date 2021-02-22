import Chart from "react-google-charts";
import React from "react";
const Charto = ({data}) => {
    console.log("hi I'm in");
    return (
        <Chart
            width={'1500px'}
            height={'700px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
                hAxis: {
                    title: 'Time',
                },
                vAxis: {
                    title: 'Popularity',
                },
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
};

export default Charto;