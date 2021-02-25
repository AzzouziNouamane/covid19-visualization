import { Table } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";
import './List.css';
import {useHistory} from "react-router-dom";


export const List = ({ columns, newCasesNow }) => {
    let history = useHistory();

    return  (
        <Table bordered hover striped id="customers">
            <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col}>{col}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {newCasesNow.map((d) => (
                <tr key={d.id}
                    onClick={() => history.push("/graph/" + d.regionId)}
                    style={{cursor: "pointer"}}>
                    {columns.map((col) => (
                        <td key={col + d.id} style={{ verticalAlign: "middle" }}>
                            {d[col]}
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
