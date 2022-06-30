import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {

    render() {
        return (
            <React.Fragment>
                <Toolbar />
                <div className="site">
                    {this.props.children}
                </div>
            </ React.Fragment>
        )
    }
}

export default Layout;
