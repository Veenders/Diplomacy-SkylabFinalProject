import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import DBService from '../../Services/DBService';
import datamap from './../../data/map';

import Login from '../auth/Login';
import Map from './Map';
import Messenger from './Messenger';
import Orders from './Orders';
import Loading from '../Loading';
import Retreats from './Retreats';
import UnitStatus from './UnitStatus';
import HeadGame from './HeadGame';


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
    isTransport=(order)=>{
        let result=false;
        const {game, turn} = this.state
        const prturn = game.turns[turn]
        let transportorders = [];
        prturn.userturn.forEach(turnuser =>{
            transportorders.push(...turnuser.orders.filter(ord => ord.order==="transport"))
        })
        let nextround = true;
        const startingterritory=order.origin;
        const territoriesWithTransport = transportorders.filter(trans => datamap[startingterritory].neighbors.includes(trans.origin))
        if(territoriesWithTransport.length>0){
            while(nextround){
                const prevlength = territoriesWithTransport.length;
                // eslint-disable-next-line no-loop-func
                territoriesWithTransport.forEach(transport =>{
                    if(datamap[transport.origin].neighbors.includes(order.destination) && (transport.destination===order.origin && transport.to===order.destination)){
                        result = true;
                        nextround = false;
                        return result;
                    }else{
                        territoriesWithTransport.push(...transportorders.filter(trans => datamap[transport].neighbors.includes(trans.origin)))
                    }
                })
                nextround = prevlength !== territoriesWithTransport.length;
            }
        }
        return result
    }
    solveOrder = (order) =>{
        let correct = true
        if(!datamap[order.origin].neighbors.includes(order.destination)){
            correct = this.isTransport(order);
        }
        if(correct){
            const {game, turn} = this.state
            const prturn = game.turns[turn]
            const indexuserturn = prturn.userturn.findIndex(userturn => userturn.country === order.country);
            const indexarmy = prturn.userturn[indexuserturn].armies.findIndex(army => army.id === order.id);
            prturn.userturn[indexuserturn].armies[indexarmy].territory = order.destination;
        }
    }
    solveCrossCombat(orders, order, crossorder){
        let result='tie';
        let retired = []
        let retir=[]
        const combat = [{...order, strength: 1},{...crossorder, strength: 1}];
        const presupportorders = orders.filter(prorder=>(prorder.destination===order.destination||prorder.destination===crossorder.destination)&&prorder.order==='support')
        if(presupportorders.length>0){
            const supportorders = []
            presupportorders.forEach(support => {
                let result = '';
                const samedestin = orders.filter(prorder => prorder.destination===support.origin && prorder.order==='move');
                if(samedestin.length===0){
                    supportorders.push(support)
                }else{
                    [orders,result,retired]=this.solveCombat(orders,support,samedestin,'origin')
                    retired.push(retir);
                    result ==='win' && supportorders.push(support)
                }
            })
            supportorders.forEach(support=>{
                combat.forEach(combatarmy=>{
                    if(combatarmy.origin===support.support){
                        combatarmy.strength = combatarmy.strength+1;
                    }
                });
            })
        }
        combat.sort(function (combat1,combat2) {
            if (combat1.strength < combat2.strength) {
              return 1;
            } else if (combat1.strength > combat2.strength) {
              return -1;
            } 
            return 0;
        });
        if(combat[0].strength>combat[1].strength){
            if(combat[0].id === order.id){
                result='win'
            }
            if(combat[0].order === 'move'){
                this.solveOrder(combat[0]);
            }
            for(let i = 1; i<combat.length; i++ ){
                combat[i].origin === combat[0].destination && combat[0].order === 'move' && retired.push({...combat[i], attack:combat[0].origin})
            }
        }
        return [orders,result,retired];
    }
    solveCombat(orders, order, samedestination, key='destination'){
        let result='tie'
        let retired = []
        let retir=[]
        const combat = [{...order, strength: 1}];
        samedestination.forEach(element => {
            const index = orders.findIndex(prorder => prorder.id===element.id)
            orders.splice(index,1);
            combat.push({...element, strength: 1})
        })
        const presupportorders = orders.filter(prorder=>prorder.destination===order[key]&&prorder.order==='support')
        if(presupportorders.length>0){
            const supportorders = []
            presupportorders.forEach(support => {
                let result = '';
                const samedestin = orders.filter(prorder => prorder.destination===support.origin && prorder.order==='move');
                if(samedestin.length===0){
                    supportorders.push(support)
                }else{
                    [orders,result,retired]=this.solveCombat(orders,support,samedestin,'origin')
                    retired.push(retir);
                    result ==='win' && supportorders.push(support)
                }
            })
            supportorders.forEach(support=>{
                combat.forEach(combatarmy=>{
                    if(combatarmy.origin===support.support){
                        combatarmy.strength = combatarmy.strength+1;
                    }
                });
            })
        }
        combat.sort(function (combat1,combat2) {
            if (combat1.strength < combat2.strength) {
              return 1;
            } else if (combat1.strength > combat2.strength) {
              return -1;
            } 
            return 0;
        });
        if(combat[0].strength>combat[1].strength){
            if(combat[0].id === order.id){
                result='win'
            }
            if(combat[0].order === 'move'){
                this.solveOrder(combat[0]);
            }
            for(let i = 1; i<combat.length; i++ ){
                combat[i].origin === combat[0].destination && combat[0].order === 'move' && retired.push({...combat[i], attack:combat[0].origin})
            }
        }
        return [orders,result,retired];
    }
    solveMovement=(orders,order)=>{
        let solved = 'tie';
        let retired = []
        let retir=[]
        const emptydestination = orders.findIndex(prOrder => prOrder.origin === order.destination)
        if(emptydestination === -1){
            const samedestination = orders.filter(prorder => prorder.destination===order.destination && prorder.order==='move');
            if(samedestination.length===0){
                this.solveOrder(order);
                (solved='win')
            }else{
                [orders,solved,retir] = this.solveCombat(orders, order, samedestination);
                retired.push(...retir);
            }
        }else{
            const destinationOrder = orders[emptydestination]
            if(destinationOrder.order==='move'){
                if(destinationOrder.destination===order.origin){
                    [orders,solved,retir] = this.solveCrossCombat(orders, order, destinationOrder);
                    retired.push(...retir);
                }else{
                    let [destinOrder] = orders.splice(emptydestination,1);
                    [orders, solved, retir]=this.solveMovement(orders,destinationOrder)
                    retired.push(...retir);
                    if(solved==='win'){
                        const samedestination = orders.filter(prorder => prorder.destination===order.destination && prorder.order==='move');
                        if(samedestination.length===0){
                            this.solveOrder(order);
                            (solved='win')
                        }else{
                            [orders,solved,retir] = this.solveCombat(orders, order, samedestination);
                            retired.push(...retir);
                        }
                    }else{
                        const samedestination = orders.filter(prorder => prorder.destination===order.destination && prorder.order==='move');
                        orders.push(destinOrder);
                        [orders,solved,retir] = this.solveCombat(orders, order, [destinationOrder, ...samedestination]);
                        retired.push(...retir);
                    }
                }
            }else{
                [orders,solved,retir] = this.solveCombat(orders, order, [destinationOrder]);
                retired.push(...retir);
            }
        }
        return [orders,solved,retired];
    }
    processTurn = async() =>{
        const {game, turn} = this.state
        const prturn = game.turns[turn]
        let orders = []
        let retired = []
        prturn.userturn.map(userturn=>userturn.orders.map(order => orders.push({country: userturn.country, ...order})))
        let moveIndex = orders.findIndex(order=> order.order === 'move');
        while(moveIndex !== -1){
            const [order]= orders.splice(moveIndex,1);
            let retir='';
            [orders,,retir] = this.solveMovement(orders,order);
            retired.push(...retir);
            moveIndex = orders.findIndex(order=> order.order === 'move');
        }
        
        
        if(retired>0){
            prturn.phase=2;
            prturn.userturn.forEach(userturn=>{
                const retiredorders = retired.filter(retir => userturn.armies.findIndex(army => retir.id===army.id )!==-1)
                if(retiredorders.length>1){
                    userturn.retiredorders = retiredorders;
                    userturn.completeRetired = false;
                }else{
                    userturn.completeRetired = true;
                }
            })
            const result = await DBService.setDocumentWithId('diplomacy', game, game.id);
            result && this.setState({game,turn,loading:false});
        }else{
            if(prturn.season==='autumn'){
                prturn.phase=3;
                let armies = []
                prturn.userturn.forEach(userturn=> userturn.armies.forEach(army => armies.push(army)))
                armies.forEach(army => {
                    prturn.userturn.forEach(userturn =>{
                        const index = userturn.territories.indexOf(army.territory);
                        index===-1 && userturn.country===army.country && datamap[army.territory].kind!=='sea' &&userturn.territories.push(army.territory)
                        index!==-1 && userturn.country!==army.country && userturn.territories.splice(index,1)
                    })
                })
                prturn.userturn.forEach(userturn => {
                    let sc = 0;
                    userturn.territories.forEach(territory => datamap[territory].sc && sc++)
                    userturn.controlledSC=sc;
                    userturn.finishedUnitStatus = sc === 0?true:false;
                })
                const result = await DBService.setDocumentWithId('diplomacy', game, game.id);
                result && this.setState({game,turn,loading:false});
            }else{
                prturn.phase=4;
                const result = await DBService.setDocumentWithId('diplomacy', game, game.id);
                result && this.setState({game,turn,loading:false},this.newTurn);
            }
        }
    }
    saveRetreats = async(retreats) =>{
        const {game, turn} = this.state;
        this.setState({loading: true})
        const {user} = this.props
        const index = game.turns[turn].userturn.findIndex(userturn => userturn.player===user.id)
        game.turns[turn].userturn[index].retreats = retreats
        game.turns[turn].userturn[index].finishedRetreats = true;
        const result = await DBService.setDocumentWithId('diplomacy', game, game.id);
        result && this.setState({game,turn,loading:false});
    }
    processRetreats = () =>{
        console.log('Processing Retreats')
    }
    saveUnitStatus = async(unitstatus) =>{
        const {game, turn} = this.state;
        this.setState({loading: true})
        const {user} = this.props
        const index = game.turns[turn].userturn.findIndex(userturn => userturn.player===user.id)
        game.turns[turn].userturn[index].unitsStatus = unitstatus
        game.turns[turn].userturn[index].finishedUnitStatus = true;
        const result = await DBService.setDocumentWithId('diplomacy', game, game.id);
        result && this.setState({game,turn,loading:false});
    }
    processStatus = async() =>{
        this.setState({loading: true})
        const {game, turn} = this.state
        const prturn = game.turns[turn]
        let unitsStatus = []
        prturn.userturn.forEach(userturn=>userturn.unitsStatus.forEach(unitStatus => unitsStatus.push(unitStatus)))
        unitsStatus.forEach(unit => {
            const index = prturn.userturn.findIndex(turnuser => turnuser.country === unit.country)
            if(unit.type === "destroy"){
                const indexarmy = prturn.userturn[index].armies.findIndex(army => army.id === unit.id);
                prturn.userturn[index].armies.splice(indexarmy,1)
            }else{
                prturn.userturn[index].armies.push(unit);
            }
        })
        prturn.phase=4;
        const result = await DBService.setDocumentWithId('diplomacy', game, game.id);
        result && this.setState({game,turn,loading:false},this.newTurn);
    }
    newTurn = async() =>{
        this.setState({loading: true});
        const {game, turn} = this.state
        const prturn = game.turns[turn]
        const newturn ={}
        newturn.id = prturn.id;
        newturn.phase = 1;
        if(prturn.season==='autumn'){
            newturn.season = 'spring';
            newturn.year=parseInt(prturn.year)+1;
        }else{
            newturn.season = 'autumn'
            newturn.year=prturn.year
        }
        newturn.userturn =[]; 
        prturn.userturn.forEach(pruserturn =>{
            const {armies, country, player, territories} = pruserturn
            newturn.userturn.push({armies, country, player, territories, finishedOrders: false, orders:[]})
        })
        game.turns.push(newturn);
        const result = await DBService.setDocumentWithId('diplomacy', game, game.id);
        result && this.setState({game,turn:game.turns.length-1,loading:false});
    }
    goToTurn = (turn) =>{
        this.setState({turn});
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
        //console.log(game)
        const prturn = game.turns[turn];
        //console.log(prturn);
        return (
            <div className="GameBoard">
                <HeadGame game={game} turn={turn} goToTurn={this.goToTurn}/>
                <div className="Board">
                    <Map turn={prturn} player={user.id} saveOrders={this.saveOrders} />
                    <div className="Complements">
                        {prturn.phase===1 && <Orders turn={prturn} player={user.id} saveOrders={this.saveOrders} processTurn={this.processTurn}/>}
                        {prturn.phase===2 && <Retreats turn={prturn} player={user.id} saveRetreats={this.saveRetreats} processRetreats={this.processRetreats}/>}
                        {prturn.phase===3 && <UnitStatus turn={prturn} player={user.id} saveUnitStatus={this.saveUnitStatus} processStatus={this.processStatus} />}
                        {prturn.phase===4 && <div className="Orders"><h1>Finished Turn</h1></div>}
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
