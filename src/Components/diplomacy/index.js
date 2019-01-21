import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Login from '../auth/Login';
import Map from './Map';
import Messenger from './Messenger';

class Diplomacy extends Component {
    constructor(props){
        super(props);
        this.state={
            idgame:'YsvX5L96JnHofnU0MSZM',
            players:[{id: '80y6ERh0ljUKR3oBVoSkuQNhmWh1', name: 'Carles', house: ''},
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
        const {players,idgame} = this.state
        const {user} = this.props
        if(!user){
            return <Login />
        }
        return (
            <div className="GameBoard">
                <h1>Game Started</h1>
                <div className="Board">
                    <Map />
                    <div className="Complements">
                        <Messenger players={players} idgame={idgame} from={user.id}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.userReducer.user
    }
}

export default withRouter(connect(mapStateToProps)(Diplomacy));