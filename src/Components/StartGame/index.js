import React, { Component } from 'react';

class StartGame extends Component {
    constructor(props){
        super(props)

        this.state = {
            errormess: ''
        }
    }
    CheckPlayers = (players) =>{
        console.log('CheckPlayers',players)
    }
    SetPlayers = (players) =>{
        console.log('SetPlayers',players)
    }
    StartGame = (e) =>{
        e.preventDefault();
        const {game} = this.props;
        const players = game.houseAssign? this.CheckPlayers(game.players):this.SetPlayers(game.players)
    }
    render() {
        const {errormess} = this.state;
        return (
            <React.Fragment>
                <button onClick={this.StartGame}>Start Game</button>
                {errormess && <p className="error">{errormess}</p>}
            </React.Fragment>
        );
    }
}

export default StartGame;