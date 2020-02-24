import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout/hoc/Layout';

const Home  = React.lazy( () => import ('./containers/Home/Home'));
const Search  = React.lazy( () => import ('./containers/Search/Search'));
//const Admin  = React.lazy( () => import ('./containers/Admin/Admin'));
//const Aggs = React.lazy( () => import ('./containers/Aggs/Aggs'));
const Tables = React.lazy( () => import ('./containers/Tables/Tables'));
const FileRepository = React.lazy( () => import ('./containers/FileRepository/FileRepository'));

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

          <Route path="/search" exact
            render={() => (<Suspense fallback={<div> Loading search... </div>} >
              <Search />
            </Suspense>
            )} />


{/*
          <Route path="/aggs" exact
            render={() => (<Suspense fallback={<div> Loading search... </div>} >
              <Aggs />
            </Suspense>
            )} />
*/}

          <Route path="/tables" exact
            render={() => (<Suspense fallback={<div> Loading search... </div>} >
              <Tables />
            </Suspense>
            )} />

          <Route path="/filerepository" exact
            render={() => (<Suspense fallback={<div> Loading search... </div>} >
              <FileRepository />
            </Suspense>
            )} />
          
          {/*
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
