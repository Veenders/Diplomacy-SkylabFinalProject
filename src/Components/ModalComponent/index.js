import React, { Component } from 'react';
import './index.scss'

class ModalComponent extends Component {
    render() {
        const {title,children, close} = this.props;
        return (
            <div className="ModalBackground">
                <div className="ModalWindow">
                    <div className="ModalHeader">
                        <h2>{title}</h2>
                        <button onClick={close}><i className="fa fa-window-close" aria-hidden="true"></i></button>
                    </div>
                    <div className="ModalBody">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalComponent;