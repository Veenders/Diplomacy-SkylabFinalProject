import React, { Component } from 'react';
import { Link } from "react-router-dom";

import DBService from '../../Services/DBService';
import GamesList from '../../Components/gamesList';
import logo from '../../img/Logo.png';
import './index.scss';

class Games extends Component {
    constructor(props){
        super(props);

        this.state={
            games:[],
        }
        this.conexion = null;
    }
    async componentDidMount(){
        DBService.getRealtimeContent('diplomacy', (games) => {
          this.setState({games});
        });
    }
    render() {
        const {games} = this.state;
        return (
            <main>
                <div className="gamesHeader">
                    <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                    <Link to="/newgame/"><i className="fas fa-plus"></i>New Game</Link>
                </div>
                <h1>Games</h1>
                <GamesList games={games} />
            </main>
        );
    }
}

export default Games;