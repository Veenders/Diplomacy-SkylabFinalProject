import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import DBService from '../../Services/DBService';
import LoginView from '../../Components/auth/Login';
import GameForm from '../../Components/GameForm';
import Loading from '../../Components/Loading';
import NotAuthorized from '../NotAuthorized';
import './index.scss';

class NewGame extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: true,
            started: false,
            userid:'',
        }
    }
    async componentDidMount(){
        const {idgame} = this.props.match.params
        if(idgame){
            const game = await DBService.getDocumentById("diplomacy", idgame);
            this.setState({loading: false, started: game.started, userid:game.user});
        }else{
            this.setState({loading:false});
        }
    }
    render() {
        const {started, loading, userid} = this.state;
        const {user} = this.props
        if(loading){
            return <Loading />
        }
        if(!user){
            return <LoginView />
        }
        if(user && user.rol===5){
            return (
                <GameForm idgame={this.props.match.params.idgame} user={user} goBack={this.props.history.goBack}/>
            );
        }
        if(started){
            return <NotAuthorized>Game Started, You aren't allowed to modify</NotAuthorized>
        }
        if(userid!=='' && userid!==user.id){
            return <NotAuthorized>You don't create this game, You aren't allowed to modify</NotAuthorized>
        }
        return (
            <GameForm idgame={this.props.match.params.idgame} user={user} goBack={this.props.history.goBack}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.userReducer.user
    }
}

export default withRouter(connect(mapStateToProps)(NewGame));