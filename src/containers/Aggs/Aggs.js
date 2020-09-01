import React from 'react';

import {
  DatesAgg,
  BooleanAgg,
  TermAgg,
  RangeAgg,
  AggsPanel,
} from '@arranger/components/dist/Aggs';

//import { action } from '@storybook/addon-actions';

import { inCurrentSQON, currentFieldValue } from '@arranger/components/dist/SQONView/utils';

import Component from 'react-component-component';

import State from '@arranger/components/dist/State';

import './Aggs.css';

class Aggs extends Component {

  render() {

    const bolleanAggs = [
      {
        field: 'participants__is_proband',
        displayName: 'Participants is proband',
        active: false,
        type: 'Aggregations',
        allowedValues: [],
        restricted: false,
        buckets: [
          {
            key: '0',
            doc_count: 2580,
            key_as_string: 'false',
          },
          {
            key: '1',
            doc_count: 961,
            key_as_string: 'true',
          },
        ],
      },
      {
        field: 'sequencing_experiments__is_paired_end',
        displayName: 'Is Paired Ende',
        active: false,
        type: 'Aggregations',
        allowedValues: [],
        restricted: false,
        buckets: [
          {
            key: '0',
            doc_count: 2580,
            key_as_string: 'false',
          },
          {
            key: '1',
            doc_count: 961,
            key_as_string: 'true',
          },
        ],
      },
      {
        field: 'sequencing_experiments__is_paired_end_0',
        displayName: 'Is Paired Ende',
        active: false,
        type: 'Aggregations',
        allowedValues: [],
        restricted: false,
        buckets: [
          {
            key: '0',
            doc_count: 0,
            key_as_string: 'false',
          },
          {
            key: '1',
            doc_count: 961,
            key_as_string: 'true',
          },
        ],
      },
      {
        field: 'sequencing_experiments__is_paired_end_1',
        displayName: 'Is Paired Ende',
        active: false,
        type: 'Aggregations',
        allowedValues: [],
        restricted: false,
        buckets: [
          {
            key: '0',
            doc_count: 2312,
            key_as_string: 'false',
          },
          {
            key: '1',
            doc_count: 0,
            key_as_string: 'true',
          },
        ],
      },
    ];

    let aggs = [
      {
        field: 'color',
        displayName: 'Color',
        active: false,
        type: 'Aggregations',
        allowedValues: [],
        restricted: false,
        buckets: [
          {
            doc_count: 1,
            key: 'green',
          },
          {
            doc_count: 5,
            key: 'yellow',
          },
          {
            doc_count: 12,
            key: 'blue',
          },
        ],
      },
      {
        field: 'taste',
        displayName: 'Taste',
        active: false,
        type: 'Aggregations',
        allowedValues: [],
        restricted: false,
        buckets: [
          {
            doc_count: 1,
            key: 'spicy',
          },
          {
            doc_count: 5,
            key: 'sweet',
          },
          {
            doc_count: 12,
            key: 'sour',
          },
          {
            doc_count: 5,
            key: 'salty',
          },
          {
            doc_count: 12,
            key: 'umami',
          },
          {
            doc_count: 12,
            key: 'bland',
          },
        ],
      },
    ];

    return (

      <React.Fragment>

        <div className="term-agg-wrapper">
          <TermAgg
            field="disease_type"
            displayName="Disease Type"
            buckets={[
              {
                doc_count: 2,
                key: 'Acute Myeloid Leukemia',
              },
              {
                doc_count: 10,
                key: 'Acinar cell neoplasms',
              },
            ]}
          //handleValueClick={action('Term Agg Selection')}
          />

          <TermAgg
            field="disease_type"
            displayName="Disease Type"
            buckets={[
              {
                doc_count: 2,
                key: 'Acute Myeloid Leukemia',
              },
              {
                doc_count: 10,
                key: 'Acinar cell neoplasms',
              },
            ]}
            headerTitle="# files"
          />

          <State
            initial={{ sqon: null }}
            render={({ sqon, update }) => (
              <div>
                <div>SQON: {JSON.stringify(sqon)}</div>
                <div>
                  {aggs.map(agg => (
                    // TODO: switch on agg type
                    <TermAgg
                      key={agg.field}
                      {...agg}
                      handleValueClick={({ generateNextSQON }) =>
                        update({ sqon: generateNextSQON(sqon) })
                      }
                      isActive={d =>
                        inCurrentSQON({
                          value: d.value,
                          dotField: d.field,
                          currentSQON: sqon,
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          />

          <DatesAgg
            field="disease_type"
            displayName="Disease Type"
            stats={{
              // expects linux timestamp
              min: 1529539200125,
              max: 1529539259913,
            }}
          //handleValueClick={action('Term Agg Selection')}
          />

          <Component initialState={{ sqon: null }}>
            {({ state: { sqon }, setState }) => (
              <div>
                <div>SQON: {JSON.stringify(sqon)}</div>
                <div>
                  <DatesAgg
                    field="disease_type"
                    displayName="Disease Type"
                    stats={{
                      min: 1529539200125,
                      max: 1529539259913,
                    }}
                    handleDateChange={({ generateNextSQON = () => { } } = {}) =>
                      setState({ sqon: generateNextSQON(sqon) })
                    }
                    getActiveValue={({ op, field }) =>
                      currentFieldValue({
                        op,
                        dotField: field,
                        sqon,
                      })
                    }
                  />
                </div>
              </div>
            )}
          </Component>

          <RangeAgg
            field="cases__diagnoses__days_to_death"
            displayName="Diagnoses Days To Death"
            stats={{
              min: 15,
              max: 820,
              count: 1000,
              avg: 70,
              sum: 15000,
            }}
          //handleChange={action(`Range Change`)}
          />

          <State
            initial={{ sqon: null }}
            render={({ sqon, update }) => (
              <div className="range with sqon">
                <div>SQON: {JSON.stringify(sqon)}</div>
                <RangeAgg
                  field="cases__diagnoses__days_to_death"
                  displayName="Diagnoses Days To Death"
                  unit={'d'}
                  stats={{
                    min: 15,
                    max: 820,
                    count: 1000,
                    avg: 70,
                    sum: 15000,
                  }}
                  handleChange={({ generateNextSQON }) =>
                    update({ sqon: generateNextSQON(sqon) })
                  }
                />
              </div>
            )}
          />

          <BooleanAgg
            field="cases__diagnoses__days_to_death"
            displayName="Diagnoses Days To Death"
            buckets={[
              {
                key: '0',
                doc_count: 2580,
                key_as_string: 'false',
              },
              {
                key: '1',
                doc_count: 961,
                key_as_string: 'true',
              },
            ]}
          //handleChange={action(`Range Change`)}
          />

          <State
            initial={{ sqon: null }}
            render={({ sqon, update }) => (
              <div>
                <div>SQON: {JSON.stringify(sqon)}</div>
                <div>
                  {bolleanAggs.map(agg => (
                    <BooleanAgg
                      key={agg.field}
                      {...agg}
                      handleValueClick={({ generateNextSQON }) =>
                        update({ sqon: generateNextSQON(sqon) })
                      }
                      isActive={d =>
                        inCurrentSQON({
                          value: d.value,
                          dotField: d.field,
                          currentSQON: sqon,
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          />

          <State
            initial={{ index: '', sqon: {} }}
            render={({ index, update }) => (
              <div>
                <label>index: </label>
                <input // <-- could be a dropdown of available indices
                  value={index}
                  onChange={e => update({ index: e.target.value })}
                />
                {index && (
                  <div>
                    <AggsPanel aggs={aggs} index={index} debounceTime={200} />
                  </div>
                )}
              </div>
            )}
          />

        </div>

      </React.Fragment>

    )
  }
}

export default Aggs;








