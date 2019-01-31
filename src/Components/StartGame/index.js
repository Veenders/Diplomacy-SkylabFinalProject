import React, { Component } from 'react';
import { withRouter } from 'react-router';

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
        const turns = [{id: idgame+1, year: 1901, season: 'spring', phase:1, userturn:[]}]
        const [austria] = players.filter(player => player.country === 'austria')
        turns[0].userturn.push({
            country:'austria',
            player: austria.id,
            territories: ['Bud','Gal','Tri','Vie','Boh','Tyr'],
            armies:[
                {id:turns[0].year+'Vie', type: 'army', territory:'Vie', country:'austria'},
                {id:turns[0].year+'Bud', type: 'army', territory:'Bud', country:'austria'},
                {id:turns[0].year+'Tri', type: 'fleet', territory:'Tri', country:'austria'},
            ]
        })
        const [england] = players.filter(player => player.country === 'england')
        turns[0].userturn.push({
            country:'england',
            player: england.id,
            territories: ['Lon','Wal','Yor','Lvp','Edi','Cly'],
            armies:[
                {id:turns[0].year+'Lon', type: 'fleet', territory:'Lon', country:'england'},
                {id:turns[0].year+'Lvp', type: 'army', territory:'Lvp', country:'england'},
                {id:turns[0].year+'Edi', type: 'fleet', territory:'Edi', country:'england'},
            ]
        })
        const [france] = players.filter(player => player.country === 'france')
        turns[0].userturn.push({
            country:'france',
            player: france.id,
            territories: ['Mar','Gas','Bur','Par','Bre','Pic'],
            armies:[
                {id:turns[0].year+'Par', type: 'army', territory:'Par', country:'france'},
                {id:turns[0].year+'Mar', type: 'army', territory:'Mar', country:'france'},
                {id:turns[0].year+'Bre', type: 'fleet', territory:'Bre', country:'france'},
            ]
        })
        const [germany] = players.filter(player => player.country === 'germany')
        turns[0].userturn.push({
            country:'germany',
            player: germany.id,
            territories: ['Ber','Ruh','Kie','Pru','Sil','Mun'],
            armies:[
                {id:turns[0].year+'Ber', type: 'army', territory:'Ber', country:'germany'},
                {id:turns[0].year+'Mun', type: 'army', territory:'Mun', country:'germany'},
                {id:turns[0].year+'Kie', type: 'fleet', territory:'Kie', country:'germany'},
            ]
        })
        const [italy] = players.filter(player => player.country === 'italy')
        turns[0].userturn.push({
            country:'italy',
            player: italy.id,
            territories: ['Nap','Apu','Rom','Tus','Ven','Pie'],
            armies:[
                {id:turns[0].year+'Rom', type: 'army', territory:'Rom', country:'italy'},
                {id:turns[0].year+'Ven', type: 'army', territory:'Ven', country:'italy'},
                {id:turns[0].year+'Nap', type: 'fleet', territory:'Nap', country:'italy'},
            ]
        })
        const [rusia] = players.filter(player => player.country === 'rusia')
        turns[0].userturn.push({
            country:'rusia',
            player: rusia.id,
            territories: ['Sev','Ukr','War','Mos','Lvn','Stp'],
            armies:[
                {id:turns[0].year+'Mos', type: 'army', territory:'Mos', country:'rusia'},
                {id:turns[0].year+'War', type: 'army', territory:'War', country:'rusia'},
                {id:turns[0].year+'Stp', type: 'fleet', territory:'Stp', country:'rusia'},
                {id:turns[0].year+'Sev', type: 'fleet', territory:'Sev', country:'rusia'},
            ]
        })
        const [turkey] = players.filter(player => player.country === 'turkey')
        turns[0].userturn.push({
            country:'turkey',
            player: turkey.id,
            territories: ['Syr','Arm','Smy','Ank','Con'],
            armies:[
                {id:turns[0].year+'Con', type: 'army', territory:'Con', country:'turkey'},
                {id:turns[0].year+'Smy', type: 'army', territory:'Smy', country:'turkey'},
                {id:turns[0].year+'Ank', type: 'fleet', territory:'Ank', country:'turkey'},
            ]
        })
        game.players = players;
        game.turns = turns;
        game.started = true;
        const success= await DBService.setDocumentWithId('diplomacy', game, idgame);
        if(success){
            this.props.history.push('/games/'+idgame);
        }
    }
    render() {
        const {errormess} = this.state;
        console.log(this.props);
        return (
            <React.Fragment>
                <button onClick={this.StartGame}>Start Game</button>
                {errormess && <p className="error">{errormess}</p>}
            </React.Fragment>
        );
    }
}

export default withRouter(StartGame);