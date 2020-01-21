import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout/hoc/Layout';
import ArrangerAdmin from '@arranger/admin-ui/dist';

const Home  = React.lazy( () => import ('./containers/Home/Home'));

class App extends Component {
  constructor(props){
    super(props)

    this.state = { 
      whatever: null
    }
  }

  render() {

    /*const ArrangerAdminPage = () => (
      <ArrangerAdmin basename="/" apiRoot="http://localhost:5050"/>
    )*/

    console.log(ArrangerAdmin);

    return (

      <Layout>
      
        <Switch>

          <Route path="/" active exact
            render={() => (<Suspense fallback={<div> Loading home... </div>} >
              <Home />
            </Suspense>
            )} />

          {/*}
          <Route path="/tutorial" exact
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
