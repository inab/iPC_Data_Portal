import React, { Component } from 'react';

class Modal extends Component {

    render() {

        if( this.props.stateIdx !== this.props.currentIdx || 
            this.props.stateSwitch !== this.props.currentSwitch ) {
            return <React.Fragment/>
        }

        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }

}

export default Modal;