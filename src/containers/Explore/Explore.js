import React, { Component } from 'react';
import classes from './Explore.module.css';
import classes2 from '../../App.module.css';
import * as _ from 'lodash';
import axios from 'axios';

class Explore extends Component {

  state = {
    dbData : [],
    cartData : [],
    access_token :  "",
    session_url : "https://catalogue.ipc-project.bsc.es/catalogue_outbox/api/v1/metadata",
    changed : false
  }

  componentDidMount() {

    var access_token = localStorage.getItem("react-token");

    var cartData = []

    if(localStorage.getItem('cart')) {
      cartData = JSON.parse(localStorage.getItem('cart'));
    }

    var merged = ""
    
    axios({
        method: 'get',
        url: this.state.session_url,
        headers: {
          Authorization: access_token
        }
      }).then(response => {
        merged = Array.prototype.concat.apply([], response.data)

        this.setState({
          cartData : cartData,
          dbData: merged,
          access_token: access_token
        })
      }).catch(error => {
        throw error;
    });
  }

  postToVRE = async (e, d) => {
    e.preventDefault();
    var res = ""
    var newCart = ""
    var oldCart = ""
    axios({
      method: 'post',
      url: this.state.session_url,
      headers: {
        Authorization: this.state.access_token
      },
      data:
      { _id : d.file_ID, metadata : { file_locator: d.file_external_ID, es_index: "pbta_histologies_filecentric" } }
    }).then(response => {
      newCart = this.state.cartData.filter(el => el["file_ID"] !== response.data[0]["_id"])
      localStorage.setItem("cart", JSON.stringify(newCart))
      this.setState({
        cartData: newCart,
        dbData: [...this.state.dbData, response.data[0]]
      })
    })
    .catch(error => {
      throw error;
    }); 

  }

  removeFromVRE = async (e, d) => {
    e.preventDefault();
    console.log("d.file_ID")
    console.log(d._id)
    axios({
      method: 'delete',
      url: this.state.session_url,
      headers: {
        Authorization: this.state.access_token
      },
      data:
      { _id : d._id }
    }).then(response => {
      var newdb = this.state.dbData.filter(el => el["_id"] !== d._id)
      this.setState({
        dbData: newdb
      })
    })
    .catch(error => {
      throw error;
    }); 
  }

  render() {
    return (
      <React.Fragment>
        <br/>
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 text-left mt-5 mb-5 pl-5">
              <h1> Explore data section </h1>
              <br/>
              <h5> Stored datasets: </h5>
              <br/>
              <p> Inspect and/or remove already loaded datasets into VRE. </p>
                  {this.state.dbData.map((d, idx)=>{
                    return (
                      <div class="card mb-2" key={idx}>
                        <div class="card-body"> 
                          <h4 class="card-title"> fileID : {d._id} </h4>
                          <p class="card-text"> <i> file_locator : {d.metadata.file_locator} </i> </p>
                          <p class="card-text"> <i> es_host : {d.metadata.es_index} </i> </p>
                          <button onClick={(e) => this.removeFromVRE(e, d)} class="stretched-link btn btn-danger"> Remove data </button>
                        </div>
                      </div>)
                  })}
              <br/>
              <br/>
              <h5> Cart datasets: </h5>
              <br/>
              <p> Inspect and/or load datasets into VRE for their analysis. </p>
                {this.state.cartData.map((d, idx)=>{
                  return (
                    <div class="card mb-2" key={idx}>
                      <div class="card-body"> 
                        <h4 class="card-title"> fileID : {d.file_ID} </h4>
                        <p class="card-text"> <i> file_locator : {d.file_external_ID} </i> </p>
                        <p class="card-text"> <i> es_host : pbta_histologies_filecentric </i> </p>
                        <button onClick={(e) => this.postToVRE(e, d)} class="stretched-link" className={classes2.ipcButton}> Load into VRE </button>
              
                      </div>
                    </div>)
                  })}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Explore;