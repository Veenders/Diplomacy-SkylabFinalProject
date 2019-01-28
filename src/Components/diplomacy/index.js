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
        const {game, turn} = this.state
        const prturn = game.turns[turn]
        let orders = []
        prturn.userturn.map(userturn=>userturn.orders.map(order => orders.push({country: userturn.country, ...order})))
        let supportorders = orders.filter(order=> order.order === 'support');
        let combatorders = {}
        let resolvedorders = []
        while(orders.length > 0){
            const order = orders.shift()
            if(orders.findIndex(prorder=>prorder.destination === order.destination)===-1){
                const indexuserturn = prturn.userturn.findIndex(userturn => userturn.country === order.country);
                const indexarmy = prturn.userturn[indexuserturn].armies.findIndex(army => army.id === order.id);
                prturn.userturn[indexuserturn].armies[indexarmy].territory = order.destination;
                resolvedorders.push(order);
            }else{
                combatorders[order.destination] = [order];
                const samedestination = orders.filter(prorder => prorder.destination===order.destination);
                for(let i = 0; i<samedestination.length;i++){
                    const index = orders.findIndex(prorder => prorder.destination === order.destination);
                    const combatorder = orders.splice(index,1);
                    combatorders[order.destination].push(combatorder);
                }
            }
        }
        for(const territory in combatorders){
            const suporting = supportorders.filter(order => order.support === territory);
            if(suporting.length>0){

            }
        }
        console.log('Processed Turn',prturn)
        console.log('Final elements',resolvedorders,combatorders);
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