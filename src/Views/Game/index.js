import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import DBService from '../../Services/DBService';
import Loading from '../../Components/Loading';
import GameDetail from './GameDetail';
import Diplomacy from '../../Components/diplomacy';
import ModalComponent from '../../Components/ModalComponent';
import VerifyCode from '../../Components/VerifyCode';
import logo from '../../img/Logo.png';
import './index.scss';

class Game extends Component {
    constructor(props){
        super(props);

        this.state={
            game: {},
            loading: true,
            successmessage:'',
            showModal: false,
            errorcode: '',
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
    verifyCode = (e, code) =>{
        e.preventDefault();
        const {game} = this.state;
        if(game.code === code){
            this.addPlayer(true);
            this.setState({showModal: false, errorcode:''});
        }else{
            this.setState({errorcode: 'The code isn\'t correct'})
        }
    }
    addPlayer = async(revised=false) =>{
        const {game} = this.state;
        if(game.code==='' || revised){
            const {user} = this.props;
            game.players.push({id: user.id, name: user.name, country: ''})
            const success = await DBService.setDocumentWithId('diplomacy',game,game.id);
            success && this.setState({successmessage:'You are added correctly to the game'});
        }else{
            this.setState({showModal:true, game});
        }
    }
    render() {
        const {game,loading,showModal,errorcode} = this.state;
        const {user} = this.props;
        return (
            <main>
                <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                {loading?<Loading />:game.started?<Diplomacy />:<GameDetail game={game} addPlayer={this.addPlayer} userid={user?user.id:''}/>}
                {showModal && <ModalComponent title="Insert the Enroll Code" close={()=>this.setState({showModal:false,errorcode: ''})}><VerifyCode verify={this.verifyCode} error={errorcode}/></ModalComponent>}
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