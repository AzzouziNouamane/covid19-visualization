import { Table } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";
import './List.css';


export const List = ({ columns, newCasesNow }) => (
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
            <tr key={d.id}>
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

List.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    newCasesNowData: PropTypes.arrayOf(PropTypes.shape())
};

List.defaultProps = {
    newCasesNowData: []
};
  
export default List;
