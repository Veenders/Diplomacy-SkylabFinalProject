import React, { Component } from 'react';

import DBService from '../../Services/DBService';

class StartGame extends Component {
    constructor(props){
        super(props)

        this.state = {
            errormess: ''
        }
    }
    CheckPlayers = (players) =>{
        console.log('checkPlayers')
        let repeatcountry = false;
        let countryNA = false;
        let errormessage = '';
        players.forEach(player=>{
            let count = 0;
            players.forEach(item=>player.country===item.country && player.country!==''?count++:count)
            repeatcountry=count > 1?true:repeatcountry;
            countryNA = player.country===''?true:countryNA;
        })
        if(repeatcountry) {errormessage = 'Some player have the same country. ';}
        if(countryNA){errormessage +='Some player don\'t have assigned any country';}
        return errormessage===''?players:errormessage;
    }
    SetPlayers = (players) =>{
        console.log('SetPlayers')
        let countries = ['austria', 'england', 'france', 'germany', 'italy', 'rusia', 'turkey']
        players.forEach(player=>{
            [player.country] = countries.splice(parseInt(Math.random()*countries.length),1)
        })
        return players;
    }
    StartGame = async(e) =>{
        e.preventDefault();
        const {game,idgame} = this.props;
        await DBService.setDocumentWithId('diplomacy', game, idgame);
        const players = game.countryAssign? this.CheckPlayers(game.players):this.SetPlayers(game.players)
        if(typeof players==='string'){
            this.setState({errormess:players});
            return;
        }
        this.setState({errormess:''});
        const turns = [{id: idgame+1, }]
        console.log(typeof players, players);


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