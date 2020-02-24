import React, { Component } from 'react';
import Aggs from '../Aggs/Aggs';
import Search from '../Search/Search';
import classes from './FileRepository.css';

class FileRepository extends Component {

  render() {

    //let width = "580px";

    return (

      <React.Fragment>
        
        <div>
          <h3> 
            <strong> FILE REPOSITORY </strong>
          </h3>
        </div>

        <div class="row">
            <div class="col-2">
                <Aggs/>
            </div>
            <div class="col-10">
                <Search/>
            </div>
        </div>
        
      </React.Fragment>

    )
  }
}

export default FileRepository;









