import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import './Layout.css';

class Layout extends Component {

    render () {

        return (
            <React.Fragment>
                <Toolbar/>
                {this.props.children}
            </ React.Fragment>
        )
    }
}

export default Layout;