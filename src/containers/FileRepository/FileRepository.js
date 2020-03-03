import React, { Component } from 'react';
import Aggs from '../Aggs/Aggs';
import Search from '../Search/Search';
import SQON from '../SQON/SQON';
import classes from './FileRepository.module.css';

class FileRepository extends Component {

  render() {

    //let width = "580px";

    return (

      <React.Fragment>
        
        <br/>
        
        <div class="container-fluid">
            <div class="row">
                <div class="col-2">
                    <Aggs />
                </div>
                <div class="col-10">
                    <div class="row">
                        <SQON />
                    </div>
                    <div class="row">
                        <Search />
                    </div>
                </div>
            </div>
        </div>
        
      </React.Fragment>

    )
  }
}

export default FileRepository;









