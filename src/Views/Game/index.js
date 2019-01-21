import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import DBService from '../../Services/DBService';
import Loading from '../../Components/Loading';
import GameDetail from './GameDetail';
import Diplomacy from '../../Components/diplomacy';
import logo from '../../img/Logo.png';
import './index.scss';

class Game extends Component {
    constructor(props){
        super(props);

        this.state={
            game: {},
            loading: true
        }
    }
    componentDidMount(){
        this.LoadData();
    }
    async LoadData (){
        this.setState({loading: true});
        const game = await DBService.getDocumentById("diplomacy", this.props.match.params.idgame);
        this.setState({game,loading:false});
    }
    addPlayer = async() =>{
        const {game} = this.state;
        const {user} = this.props;
        game.players.push({id: user.id, name: user.name, house: ''})
        const success = await DBService.setDocumentWithId('diplomacy',game,game.id);
        success && this.setState({successmessage:'You are added correctly to this game'});
    }
    render() {
        const {game,loading} = this.state;
        const {user} = this.props;
        return (
            <main>
                <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                {loading?<Loading />:game.started?<Diplomacy game={game} />:<GameDetail game={game} addPlayer={this.addPlayer} userid={user?user.id:''}/>}
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.userReducer.user
    }
}

export default withRouter(connect(mapStateToProps)(Game));