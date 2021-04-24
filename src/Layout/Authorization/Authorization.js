import React, { Component } from 'react';

const Authorization = (allowedRoles) => (CurrentComponent) => {
    return class AuthZ extends Component {
        state = {
            userRole :  ""
        }

        componentDidMount() {
            var role = localStorage.getItem("role");

            this.setState({
              userRole: role
            });
        }

        render() {
            if (allowedRoles.includes(this.state.userRole)) {
              return <CurrentComponent {...this.props} />
            } else {
              return <h1> Access denied </h1>
            }
        }
    }
};

export default Authorization;