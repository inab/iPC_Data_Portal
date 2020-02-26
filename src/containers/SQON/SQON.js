import React, { Component } from 'react';
//$FlowIgnore
import SQONView from '@arranger/components/dist/SQONView';
//import { themeDecorator } from './decorators';

class SQON extends Component {

  render() {

    return (

      <React.Fragment>

        {/*
        <SQONView
          sqon={{
            op: 'and',
            content: [
              {
                op: 'in',
                content: {
                  field: 'primary_site',
                  value: ['lung'],
                },
              },
            ],
          }}
        />

        <SQONView
          sqon={{
            op: 'and',
            content: [
              {
                op: 'in',
                content: {
                  field: 'primary_site',
                  value: ['lung', 'heart'],
                },
              },
            ],
          }}
        />
        
        <SQONView
          sqon={{
            op: 'and',
            content: [
              {
                op: 'in',
                content: {
                  field: 'primary_site',
                  value: ['lung', 'heart', 'brain', 'blood', 'kidney'],
                },
              },
            ],
          }}
        />

        <SQONView
          sqon={{
            op: 'and',
            content: [
              {
                op: 'in',
                content: {
                  field: 'primary_site',
                  value: [
                    'lung',
                    'heart',
                    'brain',
                    'blood',
                    'kidney',
                    'lung1',
                    'heart1',
                    'brain1',
                    'blood1',
                    'kidney1',
                    'lung2',
                    'heart2',
                    'brain2',
                    'blood2',
                    'kidney2',
                    'lung3',
                    'heart3',
                    'brain3',
                    'blood3',
                    'kidney3',
                  ],
                },
              },
            ],
          }}
        />

        <SQONView
          sqon={{
            op: 'and',
            content: [
              {
                op: 'in',
                content: {
                  field: 'primary_site',
                  value: ['lung', 'heart', 'brain'],
                },
              },
              {
                op: 'in',
                content: {
                  field: 'gender',
                  value: ['female', 'male', 'unknown'],
                },
              },
            ],
          }}
        />

        <SQONView
          sqon={{
            op: 'and',
            content: [
              {
                op: '>=',
                content: {
                  field: 'cases.exposures.cigarettes_per_day',
                  value: ['1'],
                },
              },
              {
                op: '<=',
                content: {
                  field: 'cases.exposures.cigarettes_per_day',
                  value: ['5'],
                },
              },
            ],
          }}
        />

        <SQONView
          sqon={{
            op: 'and',
            content: [
              {
                op: '>=',
                content: {
                  field: 'cases.exposures.cigarettes_per_day',
                  value: ['1'],
                },
              },
              {
                op: '<=',
                content: {
                  field: 'cases.exposures.cigarettes_per_day',
                  value: ['5'],
                },
              },
              {
                op: 'in',
                content: {
                  field: 'primary_site',
                  value: ['heart', 'lung', 'bone', 'blood', 'liver'],
                },
              },
            ],
          }}
        />
*/}
        <SQONView
          sqon={{
            op: 'and',
            content: [
              {
                op: 'is',
                content: {
                  field: 'gender',
                  value: 'female',
                },
              },
              {
                op: 'is',
                content: {
                  field: 'cases.exposures.cigarettes_per_day',
                  value: 5,
                },
              },
            ],
          }}
        />

        <SQONView
          sqon={{
            op: 'and',
            content: [
              {
                op: 'filter',
                content: {
                  fields: ['gender', 'state', 'country'],
                  value: 'fema',
                },
              },
            ],
          }}
        />

      </React.Fragment>
    )
  }
}

export default SQON;