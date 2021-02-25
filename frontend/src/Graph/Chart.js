import Chart from "react-google-charts";
import React, {useContext} from "react";
import ThemeContext from "../Context/Theme/ThemeContext";
const Charto = ({data}) => {
    const theme = useContext(ThemeContext);
    return (
        <Chart
            width={'1500px'}
            height={'700px'}
            chartType="LineChart"
            loader={<div>Chargement</div>}
            data={data}
            options={{
                legendTextStyle: { color: theme.color},
                titleTextStyle: { color: theme.color},
                backgroundColor: theme.background,
                hAxis: {
                    textStyle:{ color: theme.color },
                    titleTextStyle: { color: theme.color},
                    title: 'Mois',
                },
                vAxis: {
                    titleTextStyle: { color: theme.color},
                    textStyle:{ color: theme.color },
                    title: 'Nombre de personnes',
                },
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
};

export default Charto;
