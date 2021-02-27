import { Table } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";
import './List.scss';
import {useHistory} from "react-router-dom";
import { REGIONS } from "./regions";

export const List = ({ userRegionId, columns, newCasesNow, mentalHealthNow }) => {
    let history = useHistory();
    return (
        <Table className="List" bordered hover striped>
            <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col}>{col}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {
                REGIONS.map(region =>
                <tr key={region.id}
                    className={+userRegionId === +region.id ? "user-region-list" : ""}
                    onClick={() => history.push("/graph/" + region.id)}
                    style={{cursor: "pointer"}}>
                    <td>
                        {region.name} {+userRegionId === +region.id && "(votre région)"}
                    </td>
                    <td>
                        {newCasesNow.find(r => region.id + "" === r.regionId)?.newCases || "?"}
                    </td>
                    <td>
                        {mentalHealthNow.find(r => region.id + "" === r.regionId)?.anxiete || "?"}
                    </td>
                    <td>
                        {mentalHealthNow.find(r => region.id + "" === r.regionId)?.depression || "?"}
                    </td>
                    <td>
                        {mentalHealthNow.find(r => region.id + "" === r.regionId)?.pbsommeil || "?"}
                    </td>

                </tr>
            )}
            </tbody>
        </Table>
    );
};

List.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    newCasesNow: PropTypes.arrayOf(PropTypes.shape())
};

List.defaultProps = {
    newCasesNow: []
};

export default List;
