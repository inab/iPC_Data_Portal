import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class AdminPanel extends Component {
  state = {
    test :  "test"
  }

  render() {
    return (
      <React.Fragment>
        <div class="container-fluid">
          <div class="row">
            <p> {this.state.test} </p>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ cart: { cartItems }, selections: { selections } }) => ({
  cartItems,
  selections
});

export default connect(mapStateToProps, null)(AdminPanel);