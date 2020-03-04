import React, { Component } from 'react';
import classes from './Explore.module.css';
import * as _ from 'lodash';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Explore extends Component {

    state = {
      username: cookies.getAll()
  }
  render() {
/*
    for(let i=0; i<localStorage.length; i++) {
      let key = localStorage.key(i);
      console.log(`${key}: ${localStorage.getItem(key)}`);
    }*/

//    console.log(this.state.username);
    return (

      <React.Fragment>

        <br/>

        <div class="container-fluid">

          <div class="row">
            <div class="col-lg-12 text-left mt-5 mb-5 pl-5">
              <h1> Explore data section </h1>
              <p> Under construction </p>
            </div>
          </div>


          {/*{this.state.username} */}

        </div>

      </React.Fragment>

    )
  }
}

export default Explore;




