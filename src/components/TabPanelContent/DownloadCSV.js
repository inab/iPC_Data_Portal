import React from 'react';
import { CSVLink } from "react-csv";

const DownloadCSV = (props) => {
    return (
        <>
            <div class="container">
                <div class="row mt-5">
                    <table class="table table-hover">
                        <tbody>
                            {props.collections.map(col => {
                                return (<>
                                    <tr>
                                        <th scope="row" style={{ "color": "#005076" }}> {col["label"]} </th>
                                        <td> <CSVLink data={col["items"]}> Download </CSVLink> </td>
                                    </tr>
                                </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>)
};

export default DownloadCSV;
