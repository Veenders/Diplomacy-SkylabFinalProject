import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import DBService from '../../Services/DBService';
import Login from '../auth/Login';
import Map from './Map';
import Messenger from './Messenger';
import Orders from './Orders';
import Loading from '../Loading';


class Diplomacy extends Component {
    constructor(props){
        super(props);

        this.state = {
            turn: 0,
            game: {},
            loading: true,
        }
    }
    componentDidMount(){
        this.LoadData();
    }
    async LoadData (){
        this.setState({loading: true});
        const game = await DBService.getDocumentById("diplomacy", this.props.match.params.idgame);
        const turn = game.turns.length-1;
        this.setState({game,turn,loading:false});
    }
    saveOrders = async(orders)=>{
        const {game, turn} = this.state;
        this.setState({loading: true})
        const {user} = this.props
        const index = game.turns[turn].userturn.findIndex(userturn => userturn.player===user.id)
        game.turns[turn].userturn[index].orders = orders
        game.turns[turn].userturn[index].finishedOrders = true;
        const result = await DBService.setDocumentWithId('diplomacy', game, game.id);
        result && this.setState({game,turn,loading:false});
    }
    processTurn = () =>{
        console.log('Process Turn')
    }
    render() {
        const {user} = this.props
        const {turn, game, loading} = this.state;
        if(!user){
            return <Login />
        }
        if(loading){
            return <Loading />
        }
        return (
            <div className="GameBoard">
                <h1>{game.name}</h1>
                <div className="Board">
                    <Map turn={game.turns[turn]} player={user.id} saveOrders={this.saveOrders}/>
                    <div className="Complements">
                        <Orders turn={game.turns[turn]} player={user.id} saveOrders={this.saveOrders} processTurn={this.processTurn}/>
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