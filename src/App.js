import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout/hoc/Layout';

const Home  = React.lazy( () => import ('./containers/Home/Home'));

class App extends Component {
  constructor(props){
    super(props)

    this.state = { 
      whatever: null
    }
  }

  render() {

    return (

      <Layout>
      
        <Switch>

          <Route path="/" active exact
            render={() => (<Suspense fallback={<div> Loading home... </div>} >
              <Home />
            </Suspense>
            )} />

          {/*}
          <Route path="/search" exact
            render={() => (<Suspense fallback={<div> Loading tutorial... </div>} >
              <Tutorial />
            </Suspense>
            )} />
            */}
        </Switch>
      </Layout>
    );
  }
}

export default App;
