import React from 'react';
import { connect } from 'react-redux';
import { fetchUserSelections } from '../../Redux/userSelections/userSelections.actions';

class FetchUserSelections extends React.Component {
  componentDidMount() {
    this.props.fetchUserSelections();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    fetchUserSelections: () => dispatch(fetchUserSelections())
});

export default connect(null, mapDispatchToProps)(FetchUserSelections);