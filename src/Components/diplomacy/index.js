import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Map from './Map';
import Messenger from './Messenger';

class Diplomacy extends Component {
    constructor(props){
        super(props);
        this.state={
            idgame:'YsvX5L96JnHofnU0MSZM',
            activeplayer: 1,
            players:[{id: 1, name: 'Carles', house: ''},
            {id: 2, name: 'Player 2', house:''},
            {id: 3, name: 'Player 3', house:''},
            {id: 4, name: 'Player 4', house:''},
            {id: 5, name: 'Player 5', house:''},
            {id: 6, name: 'Player 6', house:''},
            {id: 7, name: 'Player 7', house:''},
        ],
        }
    }
    render() {
        const {players,idgame,activeplayer} = this.state
        return (
            <div className="GameBoard">
                <h1>Game Started</h1>
                <div className="Board">
                    <Map />
                    <div className="Complements">
                        <Messenger players={players} idgame={idgame} from={activeplayer}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Diplomacy);