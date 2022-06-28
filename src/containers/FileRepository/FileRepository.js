import React, { Component } from 'react';
import Search from '../Search/Search';

class FileRepository extends Component {

  render() {

    return (

      <React.Fragment>
        
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
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









