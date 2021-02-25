import { Table } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";
import './List.scss';
import {useHistory} from "react-router-dom";


export const List = ({ userRegionId, columns, newCasesNow }) => {
    let history = useHistory();

    return  (
        <Table className="List" bordered hover striped>
            <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col}>{col}</th>
                ))}
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

}
List.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    newCasesNowData: PropTypes.arrayOf(PropTypes.shape())
};

List.defaultProps = {
    newCasesNowData: []
};
  
export default List;
