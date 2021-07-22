import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './Layout/hoc/Layout';
import './styles/sass/App.scss';
import { connect } from 'react-redux';
import Authorization from './Layout/Authorization/Authorization';

const Dashboard  = React.lazy( () => import ('./containers/Dashboard/Dashboard'));
const Explore  = React.lazy( () => import ('./containers/Explore/Explore'));
const FileRepository = React.lazy( () => import ('./containers/FileRepository/FileRepository'));
const Members  = React.lazy( () => import ('./containers/Members/Members'));
const Resources  = React.lazy( () => import ('./containers/Resources/Resources'));
//const MyRequests  = React.lazy( () => import ('./containers/MyRequests/MyRequests'));
const AdminPanel  = React.lazy( () => import ('./containers/Admin/AdminPanel'));

// Protect routes with a HOC AuthZ Class.

const Admin = Authorization(['admin'])
const AdminDashboard = Admin(AdminPanel)

class App extends Component {
  constructor(props){
    super(props)
    this.state = { init: false };
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
	    {/*
            <Route path="/myrequests" exact
              render={() => (<Suspense fallback={<div> Loading Request Access page... </div>} >
                <MyRequests />
              </Suspense>
              )} /> */}

            {/* Protect routes with a HOC AuthZ method. */}

            <Route path="/adminpanel" exact 
                   render={() => (<Suspense fallback={<div> Loading Admin panel page... </div>} >
                   <AdminDashboard />
                   </Suspense>
            )} /> 

          </Switch>

      </Layout>

    );
  }
}

export default App;




 

 




