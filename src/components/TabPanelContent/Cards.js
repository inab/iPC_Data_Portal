import React from 'react';
import DetailsModal from '../Navigation/Modal/Details';
//import classes2 from '../../App.module.css';

const Cards = (props) => {

    const { 
        selections,
        removeFromAnalysis,
        sendToAnalysis,      
        getDetails,
        handleRequest,
        stateDetails, 
        stateIdx, 
        stateSwitch,
        currentSwitch } = props

    return (
        <>
            <div class="mt-5">
                {selections.map((item, idx) => {
                    return (
                        <div class="card mt-3 mb-2" key={idx}>
                            <div class="card-body">
                                <h4 class="card-title"> fileID : {item.file_ID} </h4>
                                <p class="card-text"> <i> file_locator : {item.file_external_ID} </i> </p>
                                <p class="card-text"> <i> es_host : {item.es_index} </i> </p>
                                {
                                    (currentSwitch === "vre" || currentSwitch === "cavatica") ? (
                                        <>
                                            <button onClick={(e) => removeFromAnalysis(e, item, currentSwitch)} class="btn btn-danger" style={{ 'margin-right': "5px" }}> Unload data </button>
                                        </>) :
                                    currentSwitch === "allowedItems" ? (
                                        <>
                                            <button onClick={(e) => sendToAnalysis(e, item, "vre")} class="btn btn-success" style={{ 'margin-right': "5px" }}> Load to VRE </button>
                                            <button onClick={(e) => sendToAnalysis(e, item, "cavatica")} class="btn btn-success" style={{ 'margin-right': "5px" }}> Load to Cavatica </button>
                                        </>) :
                                    currentSwitch === "restrictedItems" ? (
                                         <>
                                            {
                                                item.DAC_ID === undefined ?
                                                    <button class="btn btn-warning" style={{ "margin-right": "5px" }} disabled> Request Access </button> :
                                                    <button class="btn btn-warning" style={{ "margin-right": "5px" }} onClick={(e) => handleRequest(e, item, idx)}> Request Access </button>
                                            }      
                                        </>) : 
                                    null
                                }

                                <button onClick={(e) => getDetails(e, idx, currentSwitch, item)} class="ipc-button" style={{ 'margin-right': "5px" }}> Get Details </button>

                                <DetailsModal stateIdx={stateIdx} currentIdx={idx} stateSwitch={stateSwitch} currentSwitch={currentSwitch}>
                                    <div>
                                        <table class="table table-hover table-bordered">
                                            <tbody>
                                                {Object.entries(stateDetails).map(([key, value]) => {
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
