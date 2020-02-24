import React, { Component } from 'react';
import classes from './Search.module.css';

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

  render() {

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
          {/*<Aggregations
            style={{ width: 300 }}
            componentProps={{
              getTermAggProps: () => ({
                maxTerms: 3,
              }),
            }}
            {...props}
          />*/}
          <div
          >
            <CurrentSQON {...props} />
            <Table {...props} />
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

