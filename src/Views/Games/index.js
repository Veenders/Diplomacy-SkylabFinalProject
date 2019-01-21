import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import DBService from '../../Services/DBService';
import GamesList from '../../Components/gamesList';
import ModalComponent from '../../Components/ModalComponent';
import VerifyCode from '../../Components/VerifyCode';
import logo from '../../img/Logo.png';
import './index.scss';

class Games extends Component {
    constructor(props){
        super(props);

        this.state={
            games:[],
            mygames:null,
            successmessage:'',
            showModal: false,
            game: {},
            errorcode: '',
        }
        this.conexion = null;
    }
    async componentDidMount(){
        this.conexion = await DBService.getRealtimeContent('diplomacy', (games) => {
            this.setState({games,mygames:null});
        });
    }
    componentDidUpdate(){
        const {login} = this.props;
        !login && this.state.mygames===null && this.loadData();
    }
    loadData = async() =>{
        const {user} = this.props;
        let {games} = this.state;
        let mygames = []
        if(user){
            mygames = games.filter(game => {
                return game.user === user.id || game.players.map(el => el.id ).indexOf(user.id)!==-1;
            })
            games = games.filter(game => mygames.map(el => el.id).indexOf(game.id)===-1 && game.open === true);
        }else{
            games = games.filter(game => game.open === true);
        }
        //const mygames = await DBService.getFilteredContent('diplomacy', 'user' , user.id);
        this.setState({mygames,games});
    }
    componentWillUnmount(){
        this.conexion()
    }
    verifyCode = (e, code) =>{
        e.preventDefault();
        const {game} = this.state;
        if(game.code === code){
            this.addPlayer(game, true);
            this.setState({showModal: false, errorcode:''});
        }else{
            this.setState({errorcode: 'The code isn\'t correct'})
        }
    }
    addPlayer = async(game, revised=false) =>{
        if(game.code==='' || revised){
            const {user} = this.props;
            game.players.push({id: user.id, name: user.name, house: ''})
            const success = await DBService.setDocumentWithId('diplomacy',game,game.id);
            success && this.setState({successmessage:'You are added correctly to the game'});
        }else{
            this.setState({showModal:true, game});
        }
    }
    render() {
        const {games, mygames, successmessage, showModal, errorcode} = this.state;
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
                        <GamesList games={mygames} user={user?user:''}/>
                    </React.Fragment>
                )}
                <h1>Games</h1>
                <GamesList games={games} user={user?user:''} addPlayer={this.addPlayer}/>
                {showModal && <ModalComponent title="Insert the Enroll Code" close={()=>this.setState({showModal:false,errorcode: ''})}><VerifyCode verify={this.verifyCode} error={errorcode}/></ModalComponent>}
            </main>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      user: state.userReducer.user,
      login: state.userReducer.login
    }
}

export default connect(mapStateToProps)(Games);