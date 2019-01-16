import React, { Component } from 'react';
import Map from './Map';
import Messenger from './Messenger';

class Diplomacy extends Component {
    render() {
        return (
            <div className="GameBoard">
                <h1>Game Started</h1>
                <div className="Board">
                    <Map />
                    <div className="Complements">
                        <Messenger />
                    </div>
                </div>
            </div>
        );
    }
}

export default Diplomacy;