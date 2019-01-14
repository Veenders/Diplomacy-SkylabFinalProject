import React, { Component } from 'react';

import logo from '../../img/Logo.png';

class Games extends Component {
    render() {
        return (
            <main>
                <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                <h1>Games</h1>
            </main>
        );
    }
}

export default Games;