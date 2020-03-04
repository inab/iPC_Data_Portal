import React, { Component } from 'react';
import ArrangerAdminPage from './AdminArranger';

// Arranger Admin -> Test.
// CORS Errors even after proxy configuration.

class Admin extends Component {

  render() {

    return (
        <React.Fragment>
            <ArrangerAdminPage />
        </React.Fragment>
    )
  }
}

export default Admin;