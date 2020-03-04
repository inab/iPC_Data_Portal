import React, { Component } from 'react';
import { Arranger } from '@arranger/components/dist/Arranger';
import Table from '@arranger/components/dist/Arranger/Table';
import classes from './Search.module.css';

class Search extends Component {

  state = {
    
  }

  async componentDidMount() {

  }

  render() {

    return (

      <React.Fragment>
        
        <div>
          <h3> 
            <strong> ARRANGER SEARCH PAGE </strong>
          </h3>
        </div>

        <div>
          <Arranger graphqlField="fileCentric" projectId="file_centric" component={Table}/>
        </div>

        {message}

      </React.Fragment>
      
    )
  }
}

export default Search;

