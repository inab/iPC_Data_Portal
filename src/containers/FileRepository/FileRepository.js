import React, { Component } from 'react';
import Aggs from '../Aggs/Aggs';
import Search from '../Search/Search';
import classes from './FileRepository.module.css';

class FileRepository extends Component {
    constructor(props){
      super(props)

      this.state = {
        token : null,
        refresh : null 
      }
  
    }

  componentDidMount () {
    const token = localStorage.getItem("react-token");
    const refresh = localStorage.getItem("react-refresh-token");  
    this.setState({
      token: token,
      refresh: refresh
    })
  }

  render() {

    console.log("Token: ", this.state.token);
    console.log("Refresh token: ", this.state.refresh);

    return (

      <React.Fragment>
        
        <br/>
        
        <div class="container-fluid">
            <div class="row">
                {/*<div class="col-2">
                    <Aggs />
                </div>*/}
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









