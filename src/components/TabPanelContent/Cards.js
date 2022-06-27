import React from 'react';
import DetailsModal from '../Navigation/Modal/Details';
import classes2 from '../../App.module.css';

const Cards = (props) => {

    return (
        <>
            <div class="mt-5">
                {props.selections.map((item, idx) => {
                    return (
                        <div class="card mt-3 mb-2" key={idx}>
                            <div class="card-body">
                                <h4 class="card-title"> fileID : {item.file_ID} </h4>
                                <p class="card-text"> <i> file_locator : {item.file_external_ID} </i> </p>
                                <p class="card-text"> <i> es_host : {item.es_index} </i> </p>
                                {
                                    (props.currentSwitch === "vre" || props.currentSwitch === "cavatica") ? (
                                        <>
                                            <button onClick={(e) => props.removeFromAnalysis(e, item, props.currentSwitch)} class="btn btn-danger" style={{ 'margin-right': "5px" }}> Unload data </button>
                                        </>) :
                                    props.currentSwitch === "allowedItems" ? (
                                        <>
                                            <button onClick={(e) => props.sendToAnalysis(e, item, "vre")} class="btn btn-success" style={{ 'margin-right': "5px" }}> Load to VRE </button>
                                            <button onClick={(e) => props.sendToAnalysis(e, item, "cavatica")} class="btn btn-success" style={{ 'margin-right': "5px" }}> Load to Cavatica </button>
                                        </>) :
                                    props.currentSwitch === "restrictedItems" ? (
                                         <>
                                            {
                                                item.dac_ID === undefined ?
                                                    <button class="btn btn-warning" style={{ "margin-right": "5px" }} disabled> Request Access </button> :
                                                    <button class="btn btn-warning" style={{ "margin-right": "5px" }} onClick={(e) => props.handleRequest(e, item, idx)}> Request Access </button>
                                            }      
                                        </>) : 
                                    null
                                }

                                <button onClick={(e) => props.getDetails(e, idx, props.currentSwitch, item)} className={classes2.ipcButton} style={{ 'margin-right': "5px" }}> Get Details </button>

                                <DetailsModal stateIdx={props.stateIdx} currentIdx={idx} stateSwitch={props.stateSwitch} currentSwitch={props.currentSwitch}>
                                    <div>
                                        <table class="table table-hover table-bordered">
                                            <tbody>
                                                {Object.entries(props.stateDetails).map(([key, value]) => {
                                                    return (
                                                        <tr>
                                                            <th scope="row" style={{ "color": "#75B9BE" }}> {key} </th>
                                                            <td> {value.toString()} </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </DetailsModal>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>)
};

export default Cards;
