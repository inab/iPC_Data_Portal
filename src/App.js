import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout/hoc/Layout';
/*import Authenticate from 'react-openidconnect';
import OidcSettings from './oidcsettings';*/

const Dashboard  = React.lazy( () => import ('./containers/Dashboard/Dashboard'));
const Explore  = React.lazy( () => import ('./containers/Explore/Explore'));
const FileRepository = React.lazy( () => import ('./containers/FileRepository/FileRepository'));
const Members  = React.lazy( () => import ('./containers/Members/Members'));
const Resources  = React.lazy( () => import ('./containers/Resources/Resources'));


class App extends Component {
  constructor(props){
    super(props)
      //this.userLoaded = this.userLoaded; 
      //this.userUnLoaded = this.userUnLoaded;
      //this.state = { user: undefined };
  }

  /*
  userLoaded(user) {
    if (user)
      this.setState({ "user": user });
  } 
  
  userUnLoaded() {
    this.setState({ "user": undefined });
  } 
 
  NotAuthenticated() {
    return <div>You are not authenticated, please click here to authenticate.</div>;
  }
  */

  render() {

    return (
      
      <Layout>

        {/*<Authenticate OidcSettings={OidcSettings} userLoaded={this.userLoaded} userunLoaded={this.userUnLoaded} renderNotAuthenticated={this.NotAuthenticated}>*/}

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

          </Switch>

        {/*</Authenticate>*/}

      </Layout>

    );
  }
}

export default App;




 

 




