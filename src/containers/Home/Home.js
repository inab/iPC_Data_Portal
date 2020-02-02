import React, { Component } from 'react';
import DropDown from '../../components/DropDown/index';

class Home extends Component {

  state = {
    items : [
      {value: 'Genomics'},
      {value: 'Imaging'},
      {value: 'Cancer'},
      {value: 'Cohorts'},
      {value: 'Biology'},
    ],
    selection : null,
  }

  selectionHandler = (selection) => {
    alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
    this.setState( {
      selection : selection.value
  })
  }

  render() {

    let message = null;

    if(this.state.selection !== null) {
      message = (
        <div>
          <p> You have selected: {this.state.selection} </p>
        </div>
      )
    }

    return (
      <React.Fragment>
        <section>
          <div>
            <h1>
              <strong> ARRANGER TESTING ZONE </strong>
            </h1>
          </div>
          <div>
            <DropDown
              items={this.state.items}
              onChange={(event) => this.selectionHandler(event)}
              itemToString={item => (item ? item.value : '')}
              children={this.state.children}
            > Select an option: </DropDown>
          </div>
        </section>
        <section>
          {message}
        </section>
      </React.Fragment>
    )
  }
}

export default Home;