import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './index.scss';

class Component404 extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="notFound">
                    'Page Not Found' <br />
                    <Link to='/'>'Return to Start'</Link>
                </div>
            </React.Fragment>
        );
    }
}

export default Component404;