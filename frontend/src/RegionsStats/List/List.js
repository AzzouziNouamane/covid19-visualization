import { Table } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";
import './List.css';
import {REGIONS} from "../Map/regions";


export const List = ({ columns, newCasesNow }) =>{
    const navigate = (regionId)=>{
        window.location.href = "http://localhost:3000/graph/"+ regionId
    };
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
                <tr key={d.id} onClick={()=>navigate(d.regionId)}>
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
