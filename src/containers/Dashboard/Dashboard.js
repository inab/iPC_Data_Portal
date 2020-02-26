import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import * as _ from 'lodash';

class Home extends Component {

  render() {

    return (
      <React.Fragment>
        <div class="container-fluid">
          {/*
          <div class="row text-center">
            <div class="col-12">
              <img alt="overlay" src="../../../img/favicon/iPC_4c.png" />
            </div>
          </div>
          */}

          <div class="row">
            <div class="col-lg-12 text-left mt-5 mb-5 pl-5">
              <h1> How does the catalogue work?</h1>
            </div>

            <div class="col-lg-6 pl-5">
              <p> Data catalogue leverages the power of Overture data management stack.</p>
              <p> The portal engine allows to find data using metadata as a filter. </p>
              <p> It will also have direct access to Virtual Research Environment and Cavatica for data analysis. </p>
              <p> Users will have granted access to different datasets depending on their privileges. </p>
            </div>

            <div class="col-lg-6 text-center">
              <h1> Hi there!</h1>
            </div>

          </div>

          <div class="row mt-3 pl-5">
            <div className={classes.boxes}>
              <p> Search files by filtering from stored metadata in an user friendly interface. </p>
              <a href="/filerepository" exact className={classes.linkStyle}> Take me there! </a>
            </div>
          </div>

          <div class="row mt-3 pl-5">
            <div className={classes.boxes}>
              <p> Login first to get granted privileges and accessing your selected files. </p>
              <a href="https://inb.bsc.es/auth/realms/IPC/protocol/openid-connect/auth?state=5484f2ae69fa95f00286affff7c7514c&response_type=code&approval_prompt=auto&redirect_uri=http%3A%2F%2Fvre.ipc-project.bsc.es%2Fopenvre%2Fapplib%2FloginToken.php&client_id=Ipc-vre"
                 target="_blank"
                 className={classes.linkStyle}> Login
              </a>
            </div>
          </div>

          <div class="row mt-3 pl-5">
            <div className={classes.boxes}>
              <p> Or directly visualize statistics in an interactive way. </p>
              <a href="/explore" exact className={classes.linkStyle}> Go and explore your data </a>
            </div>
          </div>

        </div>

      </React.Fragment>
    )
  }
}

export default Home;




