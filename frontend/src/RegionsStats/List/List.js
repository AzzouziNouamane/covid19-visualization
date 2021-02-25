import { Table } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";
import './List.scss';
import {useHistory} from "react-router-dom";
import { REGIONS } from "./regions";


export const List = ({ userRegionId, columns, newCasesNow, mentalHealthNow }) => {
    let history = useHistory();
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
            </thead>
            <tbody>
            {newCasesNow.map((d) => (
                    <tr key={d.regionId}
                        className={+userRegionId === +d.regionId ? "user-region" : ""}
                        onClick={() => history.push("/graph/" + d.regionId)}
                        style={{cursor: "pointer"}}>
                        {
                            columns.map((col) => (
                            <td key={col + d.regionId} style={{verticalAlign: "middle"}}>
                                {d[col]} {+userRegionId === +d.regionId && col === "regionId" && "(votre région)"}
                            </td>
                        ))}
                </tr>
            ))}
            </tbody>
        </Table>
    );

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
