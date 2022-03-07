import React, { Component } from 'react';
import { Container, Col, Row, Card } from "react-bootstrap";
import * as _ from 'lodash';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="jumbotron jumbotron-fluid d-flex align-items-center">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="float-right">
                  <h2> <strong> individualizedPaediatricCure </strong> </h2>
                  <h2 class="text-center"> <strong> Data Catalogue </strong> </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="container-fluid">
            <div class="h4 text-center mx-auto mt-4 mb-4 w-70">
              We facilitate data discoverability in paediatric cancer research with a data catalogue that includes data from multiple tumor types.
            </div>
            <div class="row">
              <div class="col-sm-6 card-cols pl-1 pr-1 mb-1">
                <div class="card card-style card-cols">
                  <div class="card-body card-style__content">
                    <h5 class="card-title card-style__content--title"> Search Area </h5>
                    <p class="card-text card-style__content--para">
                      Search files by filtering from stored metadata in an user friendly interface.
                    </p>
                    <a href="/filerepository" class="card-style__content--btn card-style__content--btn-blue card-style__content--btn-animated"> Search </a>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 card-cols pl-1 pr-1 mb-1">
                <div class="card card-style">
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
        </div>
        <footer className="footer d-flex align-items-end">
          <div class="container-fluid text-center">
            <nav>
              <ul>
                <li>
                  <a href="https://ipc-project.eu">
                    Project page
                  </a>
                </li>
                <li>
                  <a href="https://dac.ipc-project.bsc.es">
                    DAC portal
                  </a>
                </li>
                <li>
                  <a href="https://vre.ipc-project.bsc.es">
                    Virtual Research Environment
                  </a>
                </li>
              </ul>
              <p class="float-right">
                iPC project {new Date().getFullYear()}
              </p>
            </nav>
          </div>
        </footer>
      </React.Fragment >
    )
  }
}

export default Home;
