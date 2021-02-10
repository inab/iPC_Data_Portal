import React, { Component } from 'react';
import * as _ from 'lodash';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 text-left mt-5 mb-4 pl-5">
              <h1> Data Catalogue </h1>
            </div>
            <div class="col-lg-12 pb-3 pl-5">
              <p> Data catalogue leverages the power of Overture data management stack.</p>
              <p> The portal engine allows to find data using metadata as a filter. </p>
              <p> It will also have direct access to Virtual Research Environment and Cavatica for data analysis. </p>
              <p> Users will have granted access to different datasets depending on their privileges. </p>
            </div>
          </div>
          
          <div class="row card-list">
            <div class="col-sm-6 card-list--item pl-3 pr-3">
              <div class="card card-style card-list--content">
                <div class="card-body card-style__content">
                  <h5 class="card-title card-style__content--title"> Search Area </h5>
                  <p class="card-text card-style__content--para">
                    Search files by filtering from stored metadata in an user friendly interface. 
                  </p>
                  <a href="/filerepository" class="card-style__content--btn card-style__content--btn-blue card-style__content--btn-animated"> Search </a>
                </div>
              </div>
            </div>
            <div class="col-sm-6 card-list--item pl-3 pr-3">
              <div class="card card-style card-list--content">
                <div class="card-body card-style__content">
                  <h5 class="card-title card-style__content--title"> Data Management Area </h5>
                  <p class="card-text card-style__content--para">
                    Inspect your datasets, and expose them to the analysis platforms (VRE, Cavatica)
                  </p>
                  <a href="/explore" class="card-style__content--btn card-style__content--btn-blue card-style__content--btn-animated"> Manage </a>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </React.Fragment>
    )
  }
}

export default Home;
