import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Login from '../auth/Login';
import Map from './Map';
import Messenger from './Messenger';
import Orders from './Orders';

class Diplomacy extends Component {
    constructor(props){
        super(props);

        this.state = {
            turn: 0,
            game: {}
        }
    }
    componentDidMount(){
        const {game} = this.props
        const turn = game.turns.length-1;
        this.setState({game, turn});
    }
    render() {
        const {user} = this.props
        const {turn, game} = this.state;
        if(!user){
            return <Login />
        }
        return (
            <div className="GameBoard">
                <h1>{game.name}</h1>
                <div className="Board">
                    <Map turn={game.turns[turn]} player={user.id}/>
                    <div className="Complements">
                        <Orders turn={game.turns[turn]} player={user.id}/>
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