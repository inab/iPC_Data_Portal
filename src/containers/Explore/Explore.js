import React, { Component } from 'react';
import classes from './Explore.module.css';
import classes2 from '../../App.module.css';
import Modal from '../../components/Navigation/Modal/Modal';
import * as _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { addItem, removeItem } from '../../Redux/cart/cart.actions';

class Explore extends Component {

  state = {
    vreData : [],
    cavaticaData: [],
    cartData : [],
    access_token :  "",
    session_url : "https://catalogue.ipc-project.bsc.es/catalogue_outbox/api/v1/metadata",
    changed : false,
    details : [],
    index: "",
    switch: "",
    option: "",
  }

  componentDidMount() {

    var access_token = localStorage.getItem("react-token");

    var merged = ""
    
    axios({
        method: 'get',
        url: this.state.session_url,
        headers: {
          Authorization: access_token
        }
      }).then(response => {
        merged = Array.prototype.concat.apply([], response.data)
        var es_url = ""
        var url_list = []
        var analysis = []
        for (var i = 0; i < merged.length; i++) {
          es_url = "https://catalogue.ipc-project.bsc.es/es_host/" + merged[i].metadata.es_index + "/_search?pretty=true&size=10000&q=file_ID:" + merged[i]._id
          url_list.push(es_url)
          analysis.push(merged[i].metadata.analysis)
        }

        /*
        axios.all(url_list.map(l => axios.get(l)))
          .then(axios.spread(function (...res) {
            // all requests are now complete
            // console.log(res[1].data.hits.hits[0]._source);
            // }
        */

        let promiseArr = url_list.map(l => fetch(l).then(res => res.json()));
        Promise.all(promiseArr).then(res => {
          var vreArr = []
          var cavaticaArr = []
          for (var j = 0; j < res.length; j++) {
              if(analysis[j] === "vre") {
                vreArr.push(res[j].hits.hits[0]._source) 
              } 
              if(analysis[j] === "cavatica") {
                cavaticaArr.push(res[j].hits.hits[0]._source) 
              }  
          }

          this.setState({
            vreData: vreArr,
            cavaticaData: cavaticaArr,
            access_token: access_token
            })
          })
          .catch(error => {
            throw error;
        });
        }).catch(error => {
        throw error;
    });
  }

  selectionHandler = (e, option) => {
    this.setState({option: option})
  }

  postToVRE = async (e, d, analysis) => {
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
      { _id : d.file_ID, metadata : { file_locator: d.file_external_ID, es_index: d.es_index, analysis: analysis } }
    }).then(response => {
      var data = JSON.parse(response.config.data)
      
      // Update global cart state (Redux)
      this.props.removeItem(data)

      if(data.metadata["analysis"] === "vre") {
        this.setState({
          vreData: [...this.state.vreData, d]
        })
      }
      if(data.metadata["analysis"] === "cavatica") {
        this.setState({
          cavaticaData: [...this.state.cavaticaData, d]
        })
      }
    })
    .catch(error => {
      throw error;
    }); 

  }

  removeFromVRE = async (e, d, analysis) => {
    e.preventDefault();
    
    axios({
      method: 'delete',
      url: this.state.session_url,
      headers: {
        Authorization: this.state.access_token
      },
      data:
      { _id : d.file_ID }
    }).then(response => {
      var newdb = ""

      // Update global cart state (Redux)
      this.props.addItem([d])

      if(analysis === "vre"){
        newdb = this.state.vreData.filter(el => el["file_ID"] !== d.file_ID)
        this.setState({
          vreData: newdb
        })
      }
      if(analysis === "cavatica") {
        newdb = this.state.cavaticaData.filter(el => el["file_ID"] !== d.file_ID)
        this.setState({
          cavaticaData: newdb
        })
      }
    })
    .catch(error => {
      throw error;
    }); 
  }

  getDetails = async (e, idx, loc, d) => {
    e.preventDefault();

    if(this.state.index === idx && this.state.switch === loc) {
      idx = ""
    }
    
    this.setState({
      details: d,
      index: idx,
      switch: loc
    })
  }

  render() {

    let header = ""
    let body = ""
    
    if(this.state.option === "vre") {
      header = (
        <div class="mt-5">
          <h5> Data sets available to the iPC VRE: </h5>
          <div class="mb-5"> 
            <div className={classes.leftbox}>
              <p> Inspect and/or remove already loaded data sets into VRE. </p>
            </div>
            <div className={classes.rightbox}>
              <a href="https://vre.ipc-project.bsc.es/openvre/login.php?redirect=https%3A%2F%2Fhttps://vre.ipc-project.bsc.es/openvre/getdata/ipc/ipc_datasets.php" target="_blank" className={classes2.ipcButton}> Go to iPC VRE </a>
            </div>
          </div>
        </div>
      )

      body = (
        <div class="mt-5">
          {this.state.vreData.map((d, idx)=>{
          return (
            <div class="card mb-2" key={idx}>
              <div class="card-body"> 
                <h4 class="card-title"> fileID : {d.file_ID} </h4>
                <p class="card-text"> <i> file_locator : {d.file_external_ID} </i> </p>
                <p class="card-text"> <i> es_host : {d.es_index} </i> </p>
                <button onClick={(e) => this.removeFromVRE(e, d, "vre")} class="btn btn-danger" style={{'margin-right' : "5px"}}> Unload data </button>
                <button onClick={(e) => this.getDetails(e, idx, "vre", d)} className={classes2.ipcButton} style={{'margin-right': "5px"}}> Get Details </button>
                <Modal stateIdx={this.state.index} currentIdx={idx} stateSwitch={this.state.switch} currentSwitch="vre">
                <div>
                  <table class="table table-hover table-bordered">
                    <tbody>
                      {Object.entries(this.state.details).map(([key,value])=>{
                      return (    
                        <tr>
                          <th scope="row" style={{"color": "#75B9BE"}}> {key} </th>
                            <td> {value.toString()} </td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>  
                </Modal> 
              </div>
            </div>)
          })} 
        </div>
      )
    } 
    
    else if (this.state.option === "cavatica") {
      header = (
        <div class="mt-5">
          <h5> Data sets available to Cavatica: </h5>
          <div class="mb-5"> 
            <div className={classes.leftbox}>
              <p> Inspect and/or remove already loaded data sets into Cavatica. </p>
            </div>
            <div className={classes.rightbox}>
              <a href="https://pgc-accounts.sbgenomics.com/auth/login" target="_blank" className={classes2.ipcButton}> Go to Cavatica </a>
            </div>
          </div>
        </div>
      )

      body = (
        <div class="mt-5">
          {this.state.cavaticaData.map((d, idx)=>{
          return (
            <div class="card mb-2" key={idx}>
              <div class="card-body"> 
                <h4 class="card-title"> fileID : {d.file_ID} </h4>
                <p class="card-text"> <i> file_locator : {d.file_external_ID} </i> </p>
                <p class="card-text"> <i> es_host : {d.es_index} </i> </p>
                <button onClick={(e) => this.removeFromVRE(e, d, "cavatica")} class="btn btn-danger" style={{"margin-right": "5px"}}> Unload data </button>
                <button onClick={(e) => this.getDetails(e, idx, "cavatica", d)} className={classes2.ipcButton} style={{"margin-right": "5px"}}> Get Details </button>
                <Modal stateIdx={this.state.index} currentIdx={idx} stateSwitch={this.state.switch} currentSwitch="cavatica">
                <div>
                  <table class="table table-hover table-bordered">
                    <tbody>
                      {Object.entries(this.state.details).map(([key,value])=>{
                        return (    
                          <tr>
                            <th scope="row" style={{"color": "#75B9BE"}}> {key} </th>
                              <td> {value.toString()} </td>
                          </tr>
                          );
                      })}
                    </tbody>
                  </table>
                </div> 
                </Modal> 
              </div>
            </div>)
          })} 
        </div>        
      )
    }

    else if (this.state.option === "preselected") {
      header = (
        <div class="mt-5">
          <h5> Preselected data sets from catalogue: </h5>
          <p> Inspect and/or load data sets for their analysis. </p>
        </div>
      )

      body = (
        <div class="mt-5">
        {this.props.cartItems.map((d, idx)=>{
          return (
            <div class="card mb-2" key={idx}>
              <div class="card-body"> 
                <h4 class="card-title"> fileID : {d.file_ID} </h4>
                <p class="card-text"> <i> file_locator : {d.file_external_ID} </i> </p>
                <p class="card-text"> <i> es_host : {d.es_index} </i> </p>
                <button onClick={(e) => this.postToVRE(e, d, "vre")} class="btn btn-success" style={{"margin-right": "5px"}}> Load to VRE </button>
                <button onClick={(e) => this.postToVRE(e, d, "cavatica")} class="btn btn-success" style={{"margin-right": "5px"}}> Load to Cavatica </button>
                <button onClick={(e) => this.getDetails(e, idx, "cart", d)} className={classes2.ipcButton} style={{"margin-right": "5px"}}> Get Details </button>
                <Modal stateIdx={this.state.index} currentIdx={idx} stateSwitch={this.state.switch} currentSwitch="cart">
                <div>
                    <table class="table table-hover table-bordered">
                      <tbody>
                        {Object.entries(this.state.details).map(([key,value])=>{
                          return (    
                            <tr>
                              <th scope="row" style={{"color": "#75B9BE"}}> {key} </th>
                                <td> {value.toString()} </td>
                            </tr>
                            );
                        })}
                      </tbody>
                    </table>
                  </div> 
                </Modal> 
              </div>
            </div>)
          })}
          <div class="card mb-2">
                <div class="card-body"> 
                  <h4 class="card-title"> fileID : REQUEST_DEMO_ID </h4>
                  <p class="card-text"> <i> file_locator : REQUEST_DEMO_LOCATOR </i> </p>
                  <p class="card-text"> <i> es_host : pbta_histologies_filecentric </i> </p>
                  <button disabled class="btn btn-secondary" style={{"margin-right": "5px"}}> Load to VRE </button>
                  <button disabled class="btn btn-secondary" style={{"margin-right": "5px"}}> Load to Cavatica </button>
                  <button class="btn btn-warning" style={{"margin-right": "5px"}}> Request Access </button>                                
                </div>
          </div>
          </div>    
      )
    }
    
    return (
      <React.Fragment>
        <br/>
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 text-left mt-5 mb-5 pl-5 pr-5">
              <h1> Data Management </h1>
              <br/>
              <br/>
              <p style={{ "color" : "#A9A9A9" }}> <strong> Here iPC users can expose data to the different analysis platforms, inspect their associated metadata, and request for data access if needed. </strong> </p>
              <br/>  
              <section> 
                <table class="table table-bordered table-sm text-center">
                  <tbody>
                    <tr>
                      <th scope="row"> Available datasets </th>
                        <td className={classes.listItem} onClick={(e) => this.selectionHandler(e, "vre")}> Virtual Research Environment </td>
                        <td className={classes.listItem} onClick={(e) => this.selectionHandler(e, "cavatica")}> Cavatica </td>
                        <td className={classes.listItem} onClick={(e) => this.selectionHandler(e, "preselected")}> Preselected from catalogue </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section>
                {header}
                {body}
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);