import { Table } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";
import { REGIONS } from "./regions";
import './List.css';


export const List = ({ columns, newCasesNow, mentalHealthNow }) => (
    <Table bordered hover striped id="customers">
        <thead>
        <tr>
            {columns.map((col) => (
                <th key={col}>{col}</th>
            ))}
        </tr>
        </thead>
        <tbody>
        {REGIONS.map(region =>
            <tr key={region.id}>

                <td style={{ verticalAlign: "middle" }}>
                    {region.id}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                    {region.name}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                    {newCasesNow.find(r => region.id + "" === r.regionId)?.newCases}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                    {mentalHealthNow.find(r => region.id + "" === r.regionId)?.anxiete}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                    {mentalHealthNow.find(r => region.id + "" === r.regionId)?.depression}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                    {mentalHealthNow.find(r => region.id + "" === r.regionId)?.pbsommeil}
                </td>

            </tr>

        )}
        </tbody>
    </Table>
);

List.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    newCasesNowData: PropTypes.arrayOf(PropTypes.shape())
};

List.defaultProps = {
    newCasesNowData: []
};
  
export default List;
