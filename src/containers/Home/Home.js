import React, { Component } from 'react';

class Home extends Component {

  render() {

    console.log("Home page");

    let message =

      <React.Fragment>

        <section>
          <div>
            <h1>
              <strong> ARRANGER TESTING ZONE II</strong>
            </h1>
          </div>
        </section>

      </React.Fragment>

    return (
      <div>
        {message}
      </div>
    )
  }
}

export default Home;