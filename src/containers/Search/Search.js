import React, { Component } from 'react';
import classes from './Search.module.css';
import classes2 from '../../App.module.css';
import {isEqual} from 'lodash';

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
  
  shouldComponentUpdate () {
    return false // this will lead to never re-render the component
  }

  state = { 
    allRows: [],
    selectedRows: [],
    cart: [],
    rendered: false,
    refresh: false
  }
  
  allRowsHandler = (arrangerData) => { 
    console.log("arranger Data")
    console.log(arrangerData)
    this.setState({
       allRows: arrangerData,
       rendered: true
      })
  }

  selectedRowsHandler = (tableCheckboxes) => {
    console.log(tableCheckboxes)
    this.setState({selectedRows: tableCheckboxes})
  }

  cartHandler = (e) => {
    e.preventDefault();
    console.log(e)
    var indexes = [...new Set(this.state.selectedRows)]
    var elements = this.state.allRows.filter((el) => indexes.includes(el["id"]));
    localStorage.setItem("cart", JSON.stringify(elements));
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

    var button = (<button className={classes2.ipcButton} onClick={this.cartHandler}>
                    Add to cart
                  </button>)

    var buttonRefresh = (<button className={classes2.ipcButton} onClick={this.refreshProject}>
                          Change Project 
                         </button>)

    const ChooseProject = ({ index, projectId, update, projects }) => {
      return (
        <div
          css={`
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            justify-content: center;
          `}
        >
          <h2
            css={`
              margin-top: 0;
            `}
          >
            {PORTAL_NAME}
          </h2>
          <select
            value={projectId}
            onChange={e => {
              setValue('PROJECT_ID', e.target.value);
              update({
                projectId: e.target.value,
              });
            }}
          >
            <option id="version">Select a version</option>
            {projects.map(x => (
              <option key={x.id} value={x.id}>
                {x.id}
              </option>
            ))}
          </select>
          <select
            value={index}
            onChange={e => {
              setValue('ACTIVE_INDEX', e.target.value);

              let graphqlField = projects
                .find(x => x.id === projectId)
                ?.types ?.types.find(x => x.index === e.target.value).name;

              setValue('ACTIVE_INDEX_NAME', graphqlField);
              update({
                index: e.target.value,
                graphqlField,
              });
            }}
          >
            <option id="version">Select an index</option>
            {projects
              .find(x => x.id === projectId)
              ?.types ?.types ?.map(x => (
                <option key={x.index} value={x.index}>
                  {x.index}
                </option>
              ))}
          </select>
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

    console.log("allRows:")
    console.log(this.state.allRows)
    console.log("selectedRows:")
    console.log(this.state.selectedRows)

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

export default Search;

