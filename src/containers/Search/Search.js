import React, { Component } from 'react';
import mainClasses from '../../App.module.css';
import classes from './Search.module.css';
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
  
  state = { 
    allRows: [],
    selectedRows: [],
    cart: [],
    rendered: false,
    refresh: false
  }

  componentDidMount() {
    if(localStorage.getItem('cart')) {
      console.log("pre-loaded cart")
      console.log(localStorage.getItem('cart'))
      this.setState({ cart : localStorage.getItem('cart') });
    }
  }

  shouldComponentUpdate () {
    return false // this will lead to never re-render the component
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

    if(localStorage.getItem('cart')) {
      elements = [...elements, ...JSON.parse(localStorage.getItem('cart'))]
    }

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

    var button = (<button className={mainClasses.ipcButton} onClick={this.cartHandler}>
                    Add to cart
                  </button>)

    var buttonRefresh = (<button className={mainClasses.ipcButton} onClick={this.refreshProject}>
                          Change Project 
                         </button>)

    const ChooseProject = ({ index, projectId, update, projects }) => {

      let projectsArr = projects.map(x => (
        <option className={classes.option} key={x.id} value={x.id}>
          {x.id}
        </option>
      ))

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
          <h3 className="ml-2 mt-0">
            Please select project and index of your interest.
          </h3>

          <select
            className="custom-select mt-4 ml-2"
            value={projectId}
            onChange={e => {
              setValue('PROJECT_ID', e.target.value);
              update({
                projectId: e.target.value,
              });
            }}
          >
            <option className={classes.decorated} id="version">Select a project</option>
            {projectsArr}
          </select>

          <select
            className="custom-select mt-4 ml-2"
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
            <option className={classes.option} id="version">Select an index</option>
            {projects
              .find(x => x.id === projectId)
              ?.types ?.types ?.map(x => (
                <option className={classes.option} key={x.index} value={x.index}>
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

