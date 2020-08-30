import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout/hoc/Layout';

const Dashboard  = React.lazy( () => import ('./containers/Dashboard/Dashboard'));
const Explore  = React.lazy( () => import ('./containers/Explore/Explore'));
const FileRepository = React.lazy( () => import ('./containers/FileRepository/FileRepository'));
const Members  = React.lazy( () => import ('./containers/Members/Members'));
const Resources  = React.lazy( () => import ('./containers/Resources/Resources'));


class App extends Component {
  constructor(props){
    super(props)

  }

  render() {

    return (
      
      <Layout>

          <Switch>

            <Route path="/" active exact
              render={() => (<Suspense fallback={<div> Loading My dashboard page... </div>} >
                <Dashboard />
              </Suspense>
              )} />

            <Route path="/explore" exact
              render={() => (<Suspense fallback={<div> Loading Explore Data page... </div>} >
                <Explore />
              </Suspense>
              )} />

            <Route path="/filerepository" exact
              render={() => (<Suspense fallback={<div> Loading File Repository page... </div>} >
                <FileRepository />
              </Suspense>
              )} />

          </Switch>

      </Layout>

    );
  }
}

export default App;




 

 




