import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem, removeItem } from '../../Redux/cart/cart.actions';
import { updateUserSelections } from '../../Redux/userSelections/userSelections.actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TabCard from "../../components/TabPanelContent/Cards";
import RequestModal from "../../components/Navigation/Modal/Requests";
import { CSVLink } from "react-csv";
import { addItemForAnalysis, addItemToAnalysisStore, removeItemFromAnalysisStore, removeItemFromAnalysis } from "../../Services/ManageSelections";
import { getDataPolicies, submitDataRequest } from "../../Services/ManageRequests";
import classes from './Explore.module.css';
import classes2 from '../../App.module.css';
import 'react-tabs/style/react-tabs.scss';

class Explore extends Component {
  state = {
    details: [],
    index: "",
    switch: "",
    selectedTab: 0,
    request: false,
    requestData: { comments: "", policy: "", dataset: "" }
  }

  handleTab = (tab) => {
    this.setState({ selectedTab: tab })
  }

  sendToAnalysis = async (e, d, analysis) => {
    e.preventDefault();
    const object = { ...d, analysis }
    const addedItemForAnalysis = await addItemForAnalysis(object)
    // Redux: Add this item to the proper analysis item list
    let updatedAnalysisStore = addItemToAnalysisStore(object, d, this.props.selections)
    this.props.updateUserSelections(updatedAnalysisStore)
    // Redux: Remove item from cart
    this.props.removeItem(addedItemForAnalysis)
  }

  removeFromAnalysis = async (e, d, analysis) => {
    e.preventDefault();
    const object = { ...d, analysis }
    const deletedItemFromAnalysis = await removeItemFromAnalysis(object);
    // Redux: Remove this item to the proper analysis item list
    let updatedAnalysisStore = removeItemFromAnalysisStore(object, d, this.props.selections)
    this.props.updateUserSelections(updatedAnalysisStore)
    // Redux: Add item from cart
    this.props.addItem(deletedItemFromAnalysis)
  }

  getDetails = async (e, idx, loc, d) => {
    e.preventDefault();

    if (this.state.index === idx && this.state.switch === loc) idx = ""

    this.setState({ details: d, index: idx, switch: loc })
  }

  handleRequest = async (e, d) => {
    e.preventDefault();
    const itemPolicy = await getDataPolicies(d);
    const setPolicy = { ...this.state.requestData, 'policy': itemPolicy.policy, 'dataset': itemPolicy.dataset }
    this.setState({ request: true, requestData: setPolicy });
  }

  closeRequest = () => {
    this.setState({ request: false });
  }

  changeInput = (e) => {
    e.preventDefault();
    let input = { ...this.state.requestData, [e.target.getAttribute('name')]: e.target.value }
    this.setState({ requestData: input });
  }

  submitRequest = async (e) => {
    e.preventDefault();
    const object = { ...this.state.requestData }
    await submitDataRequest(object)
    alert("Submitted")
    this.setState({ request: false });
  }

  render() {

    let { comments, policy, dataset } = this.state.requestData

    return (
      <>
        <br />
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 text-left mt-5 mb-5 pl-5 pr-5">
              <h1> Data Management </h1>
              <br />
              <br />
              <p style={{ "color": "#A9A9A9" }}> <strong> Here iPC users can expose data to the different analysis platforms, inspect their associated metadata, and request for data access if needed. </strong> </p>
              <br />
              <section>
                <Tabs selectedIndex={this.state.selectedTab} onSelect={(index) => this.handleTab(index)}>
                  <TabList>
                    <Tab> Preselected from catalogue </Tab>
                    <Tab> Virtual Research Environment </Tab>
                    <Tab> Cavatica </Tab>
                    <Tab> Export metadata </Tab>
                  </TabList>
                  <TabPanel>
                    {this.props.cartWhitelist.length !== 0 || this.props.cartBlacklist.length !== 0 ?
                      <>
                        <div class="mt-5">
                          <p> Inspect, load data sets for their analysis, or make access requests. </p>
                        </div>
                        <br/>
                        <TabCard selections={this.props.cartWhitelist}
                                 sendToAnalysis={this.sendToAnalysis}
                                 getDetails={this.getDetails}
                                 stateDetails={this.state.details}
                                 stateIdx={this.state.index}
                                 stateSwitch={this.state.switch}
                                 currentSwitch="allowedItems" />
                        <TabCard selections={this.props.cartBlacklist}
                                 getDetails={this.getDetails}
                                 handleRequest={this.handleRequest}
                                 stateDetails={this.state.details}
                                 stateIdx={this.state.index}
                                 stateSwitch={this.state.switch}
                                 currentSwitch="restrictedItems" />
                      </> : (
                        <div class="mt-5 text-center">
                          <p> <strong> The cart items list is empty. Please go first to the <a href="/filerepository"> File Repository </a> section and select data you might be interested in. </strong> </p>
                        </div>
                      )
                    }
                  </TabPanel>
                  <TabPanel>
                    {this.props.selections[0].length !== 0 ?
                      <>
                        <div class="mt-5">
                          <div className={classes.leftbox}>
                            <p> Inspect and/or remove already loaded data sets. </p>
                          </div>
                          <div className={classes.rightbox}>
                            <a href="https://vre.ipc-project.bsc.es/openvre/login.php?redirect=https%3A%2F%2Fhttps://vre.ipc-project.bsc.es/openvre/getdata/ipc/ipc_datasets.php" target="_blank" className={classes2.ipcButton}> Go to iPC VRE </a>
                            <br />
                          </div>
                        </div>
                        <br/>
                        <TabCard selections={this.props.selections[0]}
                                 removeFromAnalysis={this.removeFromAnalysis}
                                 getDetails={this.getDetails}
                                 stateDetails={this.state.details}
                                 stateIdx={this.state.index}
                                 stateSwitch={this.state.switch}
                                 currentSwitch="vre" />
                      </> : (
                        <div class="mt-5 text-center">
                          <p> <strong> No datasets have been imported. </strong> </p>
                        </div>
                      )
                    }
                  </TabPanel>
                  <TabPanel>
                    {this.props.selections[1].length !== 0 ?
                      <>
                        <div class="mt-5">
                          <div className={classes.leftbox}>
                            <p> Inspect and/or remove already loaded data sets. </p>
                          </div>
                          <div className={classes.rightbox}>
                            <a href="https://pgc-accounts.sbgenomics.com/auth/login" target="_blank" className={classes2.ipcButton}> Go to Cavatica </a>
                            <br />
                          </div>
                        </div>
                        <br/>
                        <TabCard selections={this.props.selections[1]}
                                 removeFromAnalysis={this.removeFromAnalysis}
                                 getDetails={this.getDetails}
                                 stateDetails={this.state.details}
                                 stateIdx={this.state.index}
                                 stateSwitch={this.state.switch}
                                 currentSwitch="cavatica" />
                      </> : (
                        <div class="mt-5 text-center">
                          <p> <strong> No datasets have been imported. </strong> </p>
                        </div>
                      )
                    }
                  </TabPanel>
                  <TabPanel>
                    <div class="mt-5 text-center">
                      <p> <strong> Here you can download metadata associated to the catalogue selections. </strong> </p>
                    </div>
                    <br/>
                    <div class="container">
                      <div class="row mt-5">
                        <table class="table table-hover">
                          <tbody>
                            <tr>
                              <th scope="row" style={{ "color": "#005076" }}> Virtual research environment </th>
                              <td> <CSVLink data={this.props.selections[0]}> Download </CSVLink> </td>
                            </tr>
                            <tr>
                              <th scope="row" style={{ "color": "#005076" }}> Cavatica </th>
                              <td> <CSVLink data={this.props.selections[1]}> Download </CSVLink> </td>
                            </tr>
                            <tr>
                              <th scope="row" style={{ "color": "#005076" }}> Preselected with access (cart) </th>
                              <td> <CSVLink data={this.props.cartWhitelist}> Download </CSVLink> </td>
                            </tr>
                            <tr>
                              <th scope="row" style={{ "color": "#005076" }}> Preselected without access (cart) </th>
                              <td> <CSVLink data={this.props.cartWhitelist}> Download </CSVLink> </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabPanel>
                </Tabs>
              </section>
            </div>
          </div>
        </div>
        <RequestModal show={this.state.request}
          close={this.closeRequest}
          submit={this.submitRequest}
          input={this.changeInput}
          comments={comments}
          policy={policy}
          dataset={dataset}
        />
      </>
    )
  }
}

const mapStateToProps = ({ cart: { cartWhitelist, cartBlacklist }, selections: { selections } }) => ({
  selections,
  cartWhitelist,
  cartBlacklist
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item)),
  updateUserSelections: list => dispatch(updateUserSelections(list))
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);

