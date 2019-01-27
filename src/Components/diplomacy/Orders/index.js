import React, { Component } from 'react';
import datamap from './../../../data/map';
//import countries from './../../../data/country';

class Orders extends Component {
    constructor(props){
        super(props)

        this.state = {
            orders:[],
        }
    }
    setField = (event) =>{
        const {orders} = this.state;
        const ids = orders.map(order => order.id);
        const index = ids.indexOf(event.name);
        let order = {}
        if(index !==-1){
            [order] = orders.splice(index,1);
            order.order = event.value;
        } else{
            order = {id:event.name,order:event.value}
        }
        orders.push(order);
        this.setState({orders})
    }
    setTerritory = (event) =>{
        const {orders} = this.state;
        const ids = orders.map(order => order.id);
        const index = ids.indexOf(event.name);
        let order = {}
        if(index !==-1){
            [order] = orders.splice(index,1);
            order.destination = event.value;
        } else{
            order = {id:event.name,destination:event.value}
        }
        orders.push(order);
        this.setState({orders})
    }
    getSelectedOptions = (order,army) =>{
        if(order){
            switch(order.order){
                case 'move':
                    return (<React.Fragment>
                                to: <select name={army.id} id={army.id} value={order.destination} onChange={(event)=>this.setTerritory(event.target)}>
                                    {datamap[army.territory].neighbors
                                        .filter(neigh=>datamap[neigh].coast || (army.type==="fleet" &&  datamap[neigh].kind==='sea')|| (army.type==="army" &&  datamap[neigh].kind==='land'))
                                        .map(neigh => <option key={neigh} value={neigh}>{datamap[neigh].name}</option>)}
                                </select>
                       </React.Fragment> 
                    )
                case 'support':
                    return ' doing suport';
                case 'transport':
                    return ' doing transport'
                default:
                        return <React.Fragment> in {datamap[army.territory].name}</React.Fragment>
            }
        }else{
            return <React.Fragment> in {datamap[army.territory].name}</React.Fragment>
        }
    }
    render() {
        const {orders} = this.state;
        const {turn, player}=this.props
        const [playerturn] = turn.userturn.filter(userturn => userturn.player===player)
        return (
            <div className='Orders'>
                <div className='OrdersHeader'>
                    <h3>Orders</h3>
                </div>
                <div className='OrdersBody'>
                    {playerturn.armies.map(army => {
                        const [order] = orders?orders.filter(prorder=> prorder.id===army.id):{};
                        return (<div key={army.id}>
                                {army.type} on {datamap[army.territory].name}: 
                                <select name={army.id} id={army.id} value={order?order.order:'hold'} onChange={(event)=>this.setField(event.target)}>
                                    <option value="hold">Hold</option>
                                    <option value="move">Move</option>
                                    <option value="support">Support</option>
                                    {army.type==='fleet'&&<option value="transport">transport</option>}
                                </select>
                                {this.getSelectedOptions(order,army)}
                            </div>)
                    })}
                </div>
            </div>
        );
    }
}

export default Orders;