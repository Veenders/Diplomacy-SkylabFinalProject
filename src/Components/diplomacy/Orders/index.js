import React, { Component } from 'react';
import datamap from './../../../data/map';
//import countries from './../../../data/country';

class Orders extends Component {
    constructor(props){
        super(props)

        this.state = {
            orders:[],
            error: ''
        }
    }
    componentDidMount(){
        const {turn, player}=this.props
        const [playerturn] = turn.userturn.filter(userturn => userturn.player===player)
        playerturn.orders && this.setState({orders: playerturn.orders})
    }
    saveOrders = (event) =>{
        event.preventDefault();
        const {orders} = this.state;
        const {turn, player, saveOrders} = this.props;
        const [playerturn] = turn.userturn.filter(userturn => userturn.player===player)
        let error = '';
        orders.forEach(order => {
            if(order.order==='move'){
                error = order.destination?'Some armies don\'t define his destination':error;
            }
        })
        error = playerturn.armies.length===orders.length? 'You need to define some orders':error;
        error && saveOrders(orders);
        //this.setState(error)
    }
    setOrders = (id,value,option) =>{
        const {orders} = this.state;
        const ids = orders.map(order => order.id);
        const index = ids.indexOf(id);
        let order = {}
        if(index !==-1){
            [order] = orders.splice(index,1);
            order[option] = value;
        } else{
            order = {id:id};
            order[option] = value;
        }
        orders.push(order);
        this.setState({orders})
    }
    setOrder = (event, origin) =>{
        this.setOrders(event.name,event.value,'order');
        this.setOrders(event.name,origin,'origin');
    }
    setTerritory = (event) =>{
        this.setOrders(event.name.slice(0,-2),event.value,'destination')
    }
    setSupport = (event) =>{
        this.setOrders(event.name.slice(0,-2),event.value,'support')
    }
    setOrigin = (event) =>{
        this.setOrders(event.name.slice(0,-2),event.value,'from')
    }
    setTransport = (event) =>{
        this.setOrders(event.name.slice(0,-2),event.value,'to')
    }
    territoriesToTransport(territoryWithArmies,army){
        let nextround = true;
        const startingterritory=army.territory;
        const territoriesWithFleets = [...datamap[startingterritory].neighbors.filter(neigh=>datamap[neigh].kind==="sea"&&territoryWithArmies.includes(neigh))]
        while(nextround){
            const prevlength = territoriesWithFleets.length;
            territoriesWithFleets.forEach(element => {
                territoriesWithFleets.push(...datamap[element].neighbors.filter(neigh=>!territoriesWithFleets.includes(neigh)&&datamap[neigh].kind==="sea"&&territoryWithArmies.includes(neigh)))
            })
            nextround = prevlength !== territoriesWithFleets.length;
        }
        const result = [];
        result.push(...datamap[startingterritory].neighbors.filter(neigh=>datamap[neigh].coast))
        territoriesWithFleets.forEach(terr => result.push(...datamap[terr].neighbors.filter(neigh=>datamap[neigh].coast)))
        return result
    }
    getSelectedOptions = (order,army) =>{
        const {turn} = this.props
        const deployedArmies = {};
        turn.userturn.forEach(usturn => usturn.armies.forEach(prarmy => {
            if(prarmy.id!==army.id){
                deployedArmies[prarmy.territory]={country: prarmy.country, type: prarmy.type};
            }
        }))
        const territoryWithArmies = Object.keys(deployedArmies);
        const territoriesToTransport = this.territoriesToTransport(territoryWithArmies,army)
        if(order){
            switch(order.order){
                case 'move':
                    const destination = army.type==="army"? [...new Set([...datamap[army.territory].neighbors,...territoriesToTransport])]:datamap[army.territory].neighbors
                    return (<React.Fragment>
                                to: <select name={army.id+'mv'} id={army.id+'mv'} value={order.destination} onChange={(event)=>this.setTerritory(event.target)}>
                                    <option value="">Not Defined</option>
                                    {destination
                                        .filter(neigh=>datamap[neigh].coast || (army.type==="fleet" &&  datamap[neigh].kind==='sea')|| (army.type==="army" &&  datamap[neigh].kind==='land'))
                                        .map(neigh => <option key={neigh} value={neigh}>{datamap[neigh].name}</option>)}
                                </select>
                       </React.Fragment> 
                    )
                case 'support':
                    return (<React.Fragment>
                            to: 
                            <select name={army.id+'sp'} id={army.id+'sp'} value={order.destination} onChange={(event)=>this.setTerritory(event.target)}>
                                <option value="">Not Defined</option>
                                {datamap[army.territory].neighbors
                                    .filter(neigh=>datamap[neigh].coast || (army.type==="fleet" &&  datamap[neigh].kind==='sea')|| (army.type==="army" &&  datamap[neigh].kind==='land'))
                                    .map(neigh => <option key={neigh} value={neigh}>{datamap[neigh].name}</option>)}
                            </select>
                            from: 
                            {
                                order.destination!==undefined?<select name={army.id+'fr'} id={army.id+'fr'} value={order.support} onChange={(event)=>this.setSupport(event.target)}>
                                    <option value="">Not Defined</option>
                                    {territoryWithArmies.includes(order.destination) && <option key={order.destination} value={order.destination}>{deployedArmies[order.destination].country!==army.country?this.capitalize(deployedArmies[order.destination].country)+' - ':''}{datamap[order.destination].name}</option>}
                                    {datamap[order.destination].neighbors
                                        .filter(neigh=>territoryWithArmies.includes(neigh))
                                        .map(neigh => <option key={neigh} value={neigh}>{deployedArmies[neigh].country!==army.country?this.capitalize(deployedArmies[neigh].country)+' - ':''}{datamap[neigh].name}
                                        </option>)}
                                </select>:'Select Support Destination'

                            }
                        </React.Fragment> 
                    )
                case 'transport':
                    const destinationtransport = [...new Set([...datamap[army.territory].neighbors,...territoriesToTransport])];
                    
                    return (<React.Fragment>
                        from: <select name={army.id+'tp'} id={army.id+'tp'} value={order.destination} onChange={(event)=>this.setTerritory(event.target)}>
                            <option value="">Not Defined</option>
                            {destinationtransport
                                .filter(neigh=> territoryWithArmies.includes(neigh) && deployedArmies[neigh].type==='army')
                                .map(neigh => <option key={neigh} value={neigh}>{deployedArmies[neigh].country!==army.country?this.capitalize(deployedArmies[neigh].country)+' - ':''}{datamap[neigh].name}</option>)}
                        </select>
                        to: 
                        {
                            order.destination!==undefined?<select name={army.id+'to'} id={army.id+'to'} value={order.to} onChange={(event)=>this.setTransport(event.target)}>
                                <option value="">Not Defined</option>
                                {destinationtransport
                                    .filter(neigh=>datamap[neigh].coast)
                                    .map(neigh => <option key={neigh} value={neigh}>{datamap[neigh].name}</option>)}
                            </select>:'Select Transport Origin'
                        }
               </React.Fragment> 
            )
                default:
                        return <React.Fragment> in {datamap[army.territory].name}</React.Fragment>
            }
        }else{
            return ''
        }
    }
    isAllPlayerFinish = () =>{
        const {turn} = this.props;
        const FinishedPlayers = turn.userturn.filter(userturn => userturn.finishedOrders)
        return FinishedPlayers.length === turn.userturn.length
    }
    capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
    render() {
        const {orders, error} = this.state;
        const {turn, player, processTurn}=this.props
        const [playerturn] = turn.userturn.filter(userturn => userturn.player===player)
        return (
            <div className='Orders'>
                <div className='OrdersHeader'>
                    <h3>Orders</h3>
                </div>
                <form className='OrdersBody' onSubmit={this.saveOrders}>
                    {playerturn.armies.map(army => {
                        const [order] = orders?orders.filter(prorder=> prorder.id===army.id):{};
                        return (<div className="orderItem" key={army.id}>
                                {this.capitalize(army.type)} on {datamap[army.territory].name}: 
                                <select name={army.id} id={army.id} value={order?order.order:''} onChange={(event)=>this.setOrder(event.target, army.territory)}>
                                    <option value="">Select one Order</option>
                                    <option value="hold">Hold</option>
                                    <option value="move">Move</option>
                                    <option value="support">Support</option>
                                    {army.type==='fleet' && datamap[army.territory].kind==='sea' && <option value="transport">Transport</option>}
                                </select>
                                {this.getSelectedOptions(order,army)}
                            </div>)
                    })}
                    {error && <p className="error">{error}</p>}
                    <button type="Submit">Save Orders</button>
                </form>
                {this.isAllPlayerFinish() && <button type="button" onClick={processTurn}>Process Turn</button>}
            </div>
        );
    }
}

export default Orders;