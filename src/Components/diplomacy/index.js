import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Login from '../auth/Login';
import Map from './Map';
import Messenger from './Messenger';

class Diplomacy extends Component {
    render() {
        const {user, game} = this.props
        if(!user){
            return <Login />
        }
        return (
            <div className="GameBoard">
                <h1>Game Started</h1>
                <div className="Board">
                    <Map />
                    <div className="Complements">
                        <Messenger players={game.players} idgame={game.id} from={user.id}/>
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