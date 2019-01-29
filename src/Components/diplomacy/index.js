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
    solveOrder = (order) =>{
        const {game, turn} = this.state
        const prturn = game.turns[turn]
        const indexuserturn = prturn.userturn.findIndex(userturn => userturn.country === order.country);
        const indexarmy = prturn.userturn[indexuserturn].armies.findIndex(army => army.id === order.id);
        prturn.userturn[indexuserturn].armies[indexarmy].territory = order.destination;
    }
    solveCombat(orders, order, samedestination){
        let result='tie'
        const combat = [{...order, strength: 1}];
        samedestination.forEach(element => {
            const index = orders.findIndex(prorder => prorder.id===element.id)
            orders.splice(index,1);
            combat.push({...element, strength: 1})
        })
        const presupportorders = orders.filter(prorder=>prorder.destination===order.destination&&prorder.order==='support')
        if(presupportorders>0){
            const supportorders = []
            presupportorders.forEach(support => {
                let result = '';
                const samedestin = orders.filter(prorder => prorder.destination===support.origin);
                samedestin.length===0?supportorders.push(support):[orders,result]=this.solveCombat(orders,support,samedestin)
                result ==='win' && supportorders.push(support)
            })
            supportorders.forEach(support=>{
                const index = combat.findIndex(combatarmy=>combatarmy.origin===support.support);
                combat[index].strength++;
            })
        }
        combat.sort(function (combat1,combat2) {
            if (combat1.strength > combat2.strength) { //comparación lexicogŕafica
              return 1;
            } else if (combat1.strength < combat2.strength) {
              return -1;
            } 
            return 0;
          });
        console.log(combat)
        return [orders,result];
    }
    solveMovement=(orders,order)=>{
        let solved = true;
        const emptydestination = orders.findIndex(prOrder => prOrder.origin === order.destination)
        if(emptydestination === -1){
            const samedestination = orders.filter(prorder => prorder.destination===order.destination);
            samedestination.length===0?this.solveOrder(order):[orders] = this.solveCombat(orders, order, samedestination);
        }else{
            const destinationOrder = orders[emptydestination]
            if(destinationOrder.order==='move'){
                if(destinationOrder.destination===order.origin){
                    [orders] = this.solveCombat(orders, order, [destinationOrder]);
                }else{
                    let [destinOrder] = orders.splice(emptydestination,1);
                    [orders, solved]=this.solveMovement(orders,destinationOrder)
                    solved && this.solveOrder(order);
                    !solved && orders.push(destinOrder) && ([orders] = this.solveCombat(orders, order, [destinationOrder]));
                }
            }else{
                [orders] = this.solveCombat(orders, order, [destinationOrder]);
            }
        }
        return [orders,solved];
    }
    processTurn = () =>{
        const {game, turn} = this.state
        const prturn = game.turns[turn]
        let orders = []
        prturn.userturn.map(userturn=>userturn.orders.map(order => orders.push({country: userturn.country, ...order})))
        let moveIndex = orders.findIndex(order=> order.order === 'move');
        while(moveIndex !== -1){
            const [order]= orders.splice(moveIndex,1);
            [orders] = this.solveMovement(orders,order);
            moveIndex = orders.findIndex(order=> order.order === 'move');
        }
        
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

/*
let preSupportOrders = orders.filter(order=> order.order === 'support');
        let supportOrders = []
        let combatorders = {}
        while(preSupportOrders>0){
            const order = preSupportOrders.shift()
            const index = orders.findIndex(prorder => prorder.id === order.id);
            orders.splice(index,1);
            if(orders.findIndex(prOrder => prOrder.destination === order.origin && prOrder.order ==='move')){
                combatorders[order.origin] = [order];
                const samedestination = orders.filter(prorder => prorder.destination===order.origin)
                for(let i = 0; i<samedestination.length;i++){
                    const index = orders.findIndex(prorder => prorder.destination === order.origin);
                    const combatorder = orders.splice(index,1);
                    combatorders[order.origin].push(combatorder);
                }
            }else{
                supportOrders.push(order);
            }
        }
        let preresolvedorders = []
        while(orders.length > 0){
            const order = orders.shift()
            if(orders.findIndex(prorder=>prorder.destination === order.destination || (prorder.origin === order.destination && prorder.destination===order.origin))===-1){
                preresolvedorders.push(order);
            }else{
                combatorders[order.destination] = [order];
                const samedestination = orders.filter(prorder => prorder.destination===order.destination || (prorder.origin === order.destination && prorder.destination===order.origin));
                for(let i = 0; i<samedestination.length;i++){
                    const index = orders.findIndex(prorder => prorder.destination === order.destination || (prorder.origin === order.destination && prorder.destination===order.origin));
                    const combatorder = orders.splice(index,1);
                    combatorders[order.destination].push(combatorder);
                }
            }
        }
        for(const territory in combatorders){
            const suporting = supportOrders.filter(order => order.support === territory);
            if(suporting.length>0){

            }
        }
        console.log('Processed Turn',prturn)
        console.log('Final elements',preresolvedorders,combatorders);
*/