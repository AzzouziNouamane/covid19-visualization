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
                legendTextStyle: { color: theme.isDark ?  "#fff" :"black"},
                titleTextStyle: { color: theme.isDark ?  "#fff" :"black"},
                backgroundColor : theme.isDark ? "black": "#fff",
                hAxis: {
                    textStyle:{color : theme.isDark ? "#fff" :"black"},
                    titleTextStyle: { color: theme.isDark ?  "#fff" :"black"},
                    title: 'Mois',
                },
                vAxis: {
                    titleTextStyle: { color: theme.isDark ?  "#fff" :"black"},
                    textStyle:{color : theme.isDark ? "#fff" : "black"},
                    title: 'Nombre de personnes',
                },
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
};

export default Charto;