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

    this.state = { 
      whatever: null
    }
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

          <Route path="/members" exact
            render={() => (<Suspense fallback={<div> Loading Members page... </div>} >
              <Members />
            </Suspense>
            )} />

          <Route path="/resources" exact
            render={() => (<Suspense fallback={<div> Loading Resources page... </div>} >
              <Resources />
            </Suspense>
            )} />

{/*
          <Route path="/search" exact
            render={() => (<Suspense fallback={<div> Loading search... </div>} >
              <Search />
            </Suspense>
            )} />

          <Route path="/aggs" exact
            render={() => (<Suspense fallback={<div> Loading search... </div>} >
              <Aggs />
            </Suspense>
            )} />

          <Route path="/tables" exact
            render={() => (<Suspense fallback={<div> Loading search... </div>} >
              <Tables />
            </Suspense>
            )} />

          <Route path="/admin" exact
            render={() => (<Suspense fallback={<div> Loading search... </div>} >
              <Admin />
            </Suspense>
            )} />
*/}
          
        </Switch>

      </Layout>
    );
  }
}

export default App;
