import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import DBService from '../../Services/DBService';
import GamesList from '../../Components/gamesList';
import logo from '../../img/Logo.png';
import './index.scss';

class Games extends Component {
    constructor(props){
        super(props);

        this.state={
            games:[],
            mygames:null,
            successmessage:''
        }
        this.conexion = null;
    }
    async componentDidMount(){
        this.conexion = await DBService.getRealtimeContent('diplomacy', (games) => {
          this.setState({games});
        });
    }
    componentDidUpdate(){
        const {user} = this.props;
        user && this.state.mygames===null && this.loadData();
    }
    loadData = async() =>{
        const {user} = this.props;
        const mygames = await DBService.getFilteredContent('diplomacy', 'user' , user.id);
        this.setState({mygames});
    }
    componentWillUnmount(){
        this.conexion()
    }
    addPlayer = async(game) =>{
        const {user} = this.props;
        game.players.push({id: user.id, name: user.name, house: ''})
        const success = await DBService.setDocumentWithId('diplomacy',game,game.id);
        success && this.setState({successmessage:'You are added correctly to this game'});
    }
    render() {
        const {games, mygames, successmessage} = this.state;
        const {user} = this.props;
        return (
            <main>
                <div className="gamesHeader">
                    <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                    <Link to="/newgame/"><i className="fas fa-plus"></i>New Game</Link>
                </div>
                {successmessage && <div className="success">{successmessage}</div>}
                {user && mygames!==null && (
                    <React.Fragment>
                        <h1>My Games</h1>
                        <GamesList games={mygames} user={user?user.id:''}/>
                    </React.Fragment>
                )}
                <h1>Games</h1>
                <GamesList games={games} user={user?user.id:''} addPlayer={this.addPlayer}/>
            </main>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(Games);