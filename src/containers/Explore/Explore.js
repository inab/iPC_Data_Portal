import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem, removeItem } from '../../Redux/cart/cart.actions';
import { updateUserSelections } from '../../Redux/userSelections/userSelections.actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TabCard from "../../components/TabPanelContent/Cards";
import RequestModal from "../../components/Navigation/Modal/Requests";
import DownloadCSV from "../../components/TabPanelContent/DownloadCSV";
import { addItemForAnalysis, addItemToAnalysisStore, removeItemFromAnalysisStore, removeItemFromAnalysis } from "../../Services/ManageSelections";
import { getDataPolicies, submitDataRequest } from "../../Services/ManageRequests";
import 'react-tabs/style/react-tabs.scss';

const DOWNLOAD_LABELS = { 
  vre: "Virtual research environment", 
  cavatica: "Cavatica", 
  preselectedWithAccess: "Preselected with access (cart)", 
  preselectedWithoutAccess: "Preselected without access (cart)"
};

const TAB_LABELS = {
  vre: "Virtual research environment", 
  cavatica: "Cavatica", 
  preselected: "Preselected from catalogue", 
  export: "Export metadata"
};

const DESCRIPTIONS_LABELS = {
  general: "Here iPC users can expose data to the different analysis platforms, inspect their associated metadata, and request for data access if needed.",
  preselectedEmpty: "The cart items list is empty. Please go first to the Search section and select data you might be interested in.", 
  preselectedExists: "Inspect, load data sets for their analysis, or make access requests.", 
  analysisEmpty: "No datasets have been imported.", 
  analysisExists: "Inspect and/or remove already loaded data sets.",
  export: "Here you can download metadata associated to the catalogue selections."
};

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
    this.setState({ request: false });
  }

  render() {

    let { comments, policy, dataset } = this.state.requestData

    return (
      <>
        <br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 text-left mt-5 mb-5 pl-5 pr-5">
              <h1> Data Management </h1>
              <p style={{ "color": "#A9A9A9" }}> <strong> {DESCRIPTIONS_LABELS["general"]} </strong> </p>
              <section>
                <Tabs selectedIndex={this.state.selectedTab} onSelect={(index) => this.handleTab(index)}>
                  <TabList>
                    <Tab> {TAB_LABELS["preselected"]} </Tab>
                    <Tab> {TAB_LABELS["vre"]} </Tab>
                    <Tab> {TAB_LABELS["cavatica"]} </Tab>
                    <Tab> {TAB_LABELS["export"]}</Tab>
                  </TabList>
                  <TabPanel>
                    {this.props.cartWhitelist.length !== 0 || this.props.cartBlacklist.length !== 0 ?
                      <>
                        <div className="mt-5">
                          <p> {DESCRIPTIONS_LABELS["preselectedExists"]} </p>
                        </div>
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
                        <div className="mt-5 text-center">
                          <p> <strong> {DESCRIPTIONS_LABELS["preselectedEmpty"]} </strong> </p>
                        </div>
                      )
                    }
                  </TabPanel>
                  <TabPanel>
                    {this.props.selections.length !== 0 && this.props.selections[0].length !== 0 ?
                      <>
                        <div className="row mt-5">
                          <div className="col-9">
                            <p> {DESCRIPTIONS_LABELS["analysisExists"]} </p>
                          </div>
                          <div className="col-3">
                            <a href="https://vre.ipc-project.bsc.es/openvre/login.php?redirect=https%3A%2F%2Fhttps://vre.ipc-project.bsc.es/openvre/getdata/ipc/ipc_datasets.php" target="_blank" class="ipc-button"> Go to iPC VRE </a>
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
                        <div className="mt-5 text-center">
                          <p> <strong> {DESCRIPTIONS_LABELS["analysisEmpty"]} </strong> </p>
                        </div>
                      )
                    }
                  </TabPanel>
                  <TabPanel>
                    {this.props.selections.length !== 0 && this.props.selections[1].length !== 0 ?
                      <>
                        <div className="row mt-5">
                          <div className="col-9">
                            <p> {DESCRIPTIONS_LABELS["analysisExists"]} </p>
                          </div>
                          <div className="col-3">
                            <a href="https://pgc-accounts.sbgenomics.com/auth/login" target="_blank" className="ipc-button"> Go to Cavatica </a>
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
                        <div className="mt-5 text-center">
                          <p> <strong> {DESCRIPTIONS_LABELS["analysisEmpty"]} </strong> </p>
                        </div>
                      )
                    }
                  </TabPanel>
                  <TabPanel>
                    <div className="mt-5 text-center">
                      <p> <strong> {DESCRIPTIONS_LABELS["export"]} </strong> </p>
                    </div>
                    <DownloadCSV collections={[ { items: this.props.selections[0], label: DOWNLOAD_LABELS["vre"] }, 
                                                { items: this.props.selections[1], label: DOWNLOAD_LABELS["cavatica"] }, 
                                                { items: this.props.cartWhitelist, label: DOWNLOAD_LABELS["preselectedWithAccess"] },
                                                { items: this.props.cartBlacklist, label: DOWNLOAD_LABELS["preselectedWithoutAccess"] } ]} />                      
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

