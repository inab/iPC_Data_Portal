import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../Redux/cart/cart.actions';
import mainClasses from '../../App.module.css';

import {
  PORTAL_NAME,
  ACTIVE_INDEX,
  ACTIVE_INDEX_NAME,
  PROJECT_ID,
  deleteValue,
  setValue,
} from '@arranger/components/dist/utils/config';

import State from '@arranger/components/dist/State';

import {
  Arranger,
  GetProjects,
  Aggregations,
  CurrentSQON,
  Table
} from '@arranger/components/dist/Arranger';

class Search extends Component {

  state = {
    allRows: [],
    selectedRows: [],
    refresh: false
  }

  shouldComponentUpdate() {
    return false // this will lead to never re-render the component
  }

  allRowsHandler = (arrangerData) => {
    this.setState({ allRows: arrangerData })
  }

  selectedRowsHandler = (tableCheckboxes) => {
    this.setState({ selectedRows: tableCheckboxes })
  }

  cartHandler = (e) => {
    e.preventDefault();
    var indexes = [...new Set(this.state.selectedRows)]
    // Here we get complete ES documents from table selections.
    var elements = this.state.allRows.filter((el) => indexes.includes(el["id"]));
    // Trigger cart Redux action.
    this.props.addItem(elements)

    alert("Datasets added to the cart!")
  }

  refreshProject = (e) => {
    e.preventDefault();
    localStorage.removeItem("ACTIVE_INDEX");
    localStorage.removeItem("PROJECT_ID");
    localStorage.removeItem("PROJECT_ID_NAME");
    window.location.reload(false);
  }

  render() {

    var button = (<button className={mainClasses.ipcButton} onClick={this.cartHandler}>
      Add to cart
    </button>)

    var buttonRefresh = (<button className={mainClasses.ipcButton} onClick={this.refreshProject}>
      Change Project
    </button>)

    const ChooseProject = ({ index, projectId, update, projects }) => {

      const setProject = function (el) {
        setValue('PROJECT_ID', el.id);
        setValue('ACTIVE_INDEX', el.types.types[0].index);
        setValue('ACTIVE_INDEX_NAME', el.types.types[0].name);
        update({
          index: el.types.types[0].index,
          graphqlField: el.types.types[0].name,
          projectId: el.id
        });
      }

      return (
        <div className="content-wrapper search-panel">
          <h2> Select a project: </h2>
          <div className="row h-100 text-center justify-content-center">
            <div className="col-12 h-50">
              <div className="row h-100">
                {projects.map((el, idx) => (
                  <div className="col-lg-6 d-flex align-items-stretch px-3 py-1">
                    <div className="card text-white w-100 card-search-style"
                      onClick={e => setProject(el)}>
                      <div className="card-body text-white">
                        <h2 className="card-title"> {el.id} </h2>
                        <div className="card-icon">
                          <i className="fa fa-users"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    };

    const Portal = ({ style, ...props }) => {
      return (
        <div style={{ display: 'flex', ...style }}>
          <Aggregations
            style={{ width: 300 }}
            componentProps={{
              getTermAggProps: () => ({
                maxTerms: 3,
              }),
            }}
            {...props}
          />
          <div
          >
            <CurrentSQON {...props} />
            <Table rows={this.selectedRowsHandler}
              {...props} />
            {button}
            {buttonRefresh}
          </div>
        </div>
      );
    };

    return (

      <React.Fragment>

        <State
          initial={{
            index: ACTIVE_INDEX,
            graphqlField: ACTIVE_INDEX_NAME,
            projectId: PROJECT_ID,
          }}
          render={({ index, graphqlField, projectId, update }) => {
            return index && projectId ? (
              <Arranger
                disableSocket
                index={index}
                graphqlField={graphqlField}
                projectId={projectId}
                arrangerHandler={this.allRowsHandler}
                render={props => {
                  return (
                    <React.Fragment>
                      <Portal {...{ ...props, graphqlField, projectId }} />
                    </React.Fragment>
                  );
                }}
              />) : (
              <GetProjects
                render={props => (
                  <ChooseProject
                    {...props}
                    index={index}
                    projectId={projectId}
                    update={update}
                  />
                )}
              />
            );
          }}
        />

      </React.Fragment>

    )
  }
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(Search);

