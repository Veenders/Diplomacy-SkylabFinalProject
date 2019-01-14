import React, { Component } from 'react';
import './styles.scss';

class Loading extends Component {
    render() {
        return (
            <svg className="spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
        );
    }
}

export default Loading;