import React, { Component } from 'react';
import classes from './Explore.module.css';
import classes2 from '../../App.module.css';
import Modal from '../../components/Navigation/Modal/Modal';
import * as _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { addItem, removeItem } from '../../Redux/cart/cart.actions';
import { updateUserSelections } from '../../Redux/userSelections/userSelections.actions';
import { CSVLink } from "react-csv";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class Explore extends Component {
  state = {
    access_token :  "",
    session_url : "https://dev-catalogue.ipc-project.bsc.es/catalogue_outbox/api/v1/metadata",
    changed : false,
    details : [],
    index: "",
    switch: "",
    option: "preselected",
    selectedTab: 0,
    dataToExport: [],
    allowedItems: [],
    restrictedItems: []
  }

  componentDidMount() {
    var access_token = localStorage.getItem("react-token");

    if(this.props.cartItems){
      let publicDS = this.props.cartItems.filter(item => item.access == "public")

      axios({
        method: 'get',
        url: "https://dev-catalogue.ipc-project.bsc.es/permissions/api/user/documents",
        headers: {
          Authorization: "Bearer " + access_token
        }
      }).then(response => {
        let allowedIds = response.data[0].permissions.map(item => item.fileId);
        let allowedItems = this.props.cartItems.filter((item) => allowedIds.includes(item["file_ID"]));
        let restrictedItems = this.props.cartItems.filter((item) => !allowedIds.includes(item["file_ID"]) && item["access"] != "public");
        allowedItems.push(publicDS)
        allowedItems = allowedItems.reduce((a, b) => a.concat(b), []);

        this.setState({
          access_token: access_token,
          allowedItems: allowedItems,
          restrictedItems: restrictedItems
        });
      })
      .catch(error => {
        throw error;
      }); 
    }
  }

  selectionHandler = (option) => {
    let name = ""
    console.log(option)
    switch (option) {
      case 0:
        name = "preselected";
        break;
      case 1:
        name = "vre";
        break;
      case 2:
        name = "cavatica";
        break;
    }
    this.setState({
      option: name,
      selectedTab: option })
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
        var updated = [[...this.props.selections[0], d], this.props.selections[1]]
        this.props.updateUserSelections(updated) 
      }
      if(data.metadata["analysis"] === "cavatica") {
        var updated = [this.props.selections[0], [...this.props.selections[1], d]]
        this.props.updateUserSelections(updated) 
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
        newdb = this.props.selections[0].filter(el => el["file_ID"] !== d.file_ID)
        var updated = [newdb, this.props.selections[1]]
        this.props.updateUserSelections(updated)
      }
      if(analysis === "cavatica") {
        newdb = this.props.selections[1].filter(el => el["file_ID"] !== d.file_ID)
        var updated = [this.props.selections[0], newdb]
        this.props.updateUserSelections(updated)
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

    console.log(this.state.allowedItems)
    
    if(this.state.option === "vre") {
      if(this.props.selections[0].length != 0){
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
            <CSVLink data={this.props.selections[0]} class="btn btn-primary" style={{"margin-right": "5px"}}>
              Export CSV
            </CSVLink>
          </div>
        )
      } else {
        header = (
          <div class="mt-5 text-center">
            <p> <strong> No datasets have been imported to the Virtual Research Environment. </strong> </p>
          </div>
        )
      }

      body = (
        <div class="mt-5">
          {this.props.selections[0].map((d, idx)=>{
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
      if(this.props.selections[1].length != 0){
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
            <CSVLink data={this.props.selections[1]} class="btn btn-primary" style={{"margin-right": "5px"}}>
              Export CSV
            </CSVLink>
          </div>
        )
      } else {
        header = (
          <div class="mt-5 text-center">
            <p> <strong> No datasets have been imported to Cavatica. </strong> </p>
          </div>
        )
      }

      body = (
        <div class="mt-5">
          {this.props.selections[1].map((d, idx)=>{
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

      if(this.props.cartItems.length == 0) {
        header = (
          <div class="mt-5 text-center">
            <p> <strong> The cart items list is empty. Please go first to the <a href="/filerepository"> File Repository </a> section and select data you might be interested in. </strong> </p>
          </div>
        )
      } else {
        header = (
          <div class="mt-5">
            <h5> Preselected data sets from catalogue: </h5>
            <p> Inspect, load data sets for their analysis, or make access requests. </p>
            <CSVLink data={this.props.cartItems} class="btn btn-primary" style={{"margin-right": "5px"}}>
              Export CSV
            </CSVLink>
          </div>
        )
      }


      body = (
        <div class="mt-5">
        {/*{this.props.cartItems.map((d, idx)=>{ */}
        {this.state.allowedItems.map((d, idx)=>{
          return (
            <div class="card mb-2" key={idx}>
              <div class="card-body"> 
                <h4 class="card-title"> fileID : {d.file_ID} </h4>
                <p class="card-text"> <i> file_locator : {d.file_external_ID} </i> </p>
                <p class="card-text"> <i> es_host : {d.es_index} </i> </p>
                <button onClick={(e) => this.postToVRE(e, d, "vre")} class="btn btn-success" style={{"margin-right": "5px"}}> Load to VRE </button>
                <button onClick={(e) => this.postToVRE(e, d, "cavatica")} class="btn btn-success" style={{"margin-right": "5px"}}> Load to Cavatica </button>
                <button onClick={(e) => this.getDetails(e, idx, "allowedItems", d)} className={classes2.ipcButton} style={{"margin-right": "5px"}}> Get Details </button>
                <Modal stateIdx={this.state.index} currentIdx={idx} stateSwitch={this.state.switch} currentSwitch="allowedItems">
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
        {this.state.restrictedItems.map((d, idx)=>{
          return (
            <div class="card mb-2" key={idx}>
              <div class="card-body"> 
                <h4 class="card-title"> fileID : {d.file_ID} </h4>
                <p class="card-text"> <i> file_locator : {d.file_external_ID} </i> </p>
                <p class="card-text"> <i> es_host : {d.es_index} </i> </p>
                <button onClick={(e) => this.getDetails(e, idx, "restrictedItems", d)} className={classes2.ipcButton} style={{"margin-right": "5px"}}> Get Details </button>
                <Modal stateIdx={this.state.index} currentIdx={idx} stateSwitch={this.state.switch} currentSwitch="restrictedItems">
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
                <button class="btn btn-warning" style={{"margin-right": "5px"}}> Request Access </button>
              </div>
            </div>)
          })}
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
                {/*<Tabs defaultIndex={0} onSelect={(e, index) => this.selectionHandler(e, index)}>*/}
                <Tabs selectedIndex={this.state.selectedTab} onSelect={(index) => this.selectionHandler(index)}>
                  <TabList>
                    <Tab> Preselected from catalogue </Tab>
                    <Tab> Virtual Research Environment </Tab>
                    <Tab> Cavatica </Tab>
                    </TabList>
                  <TabPanel>
                    {header}
                    {body}
                  </TabPanel>
                  <TabPanel>
                    {header}
                    {body}
                  </TabPanel>
                  <TabPanel>
                    {header}
                    {body}
                  </TabPanel>
                </Tabs>
                  {/*
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
                  */}
              </section>
              {/*<section>
                {header}
                {body}
              </section> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ cart: { cartItems }, selections: { selections } }) => ({
  cartItems,
  selections
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item)),
  updateUserSelections: list => dispatch(updateUserSelections(list))
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);