import React, { Component } from 'react';
import datamap from '../../../data/map';
import countries from '../../../data/country';

class UnitStatus extends Component {
    constructor(props){
        super(props)

        this.state={
            type: 'Create',
            unitsState: [],
            numunits: 0,
            finished: false,
            prturn: {},
            territories:[]
        }
    }
    componentWillMount(){
        const {turn, player}= this.props
        let {type, finished, unitsState} = this.state
        const index = turn.userturn.findIndex(userturn => userturn.player===player)
        const prturn = turn.userturn[index]
        const numunits = prturn.controlledSC-prturn.armies.length
        type = numunits>= 0 ?'Create':'Destroy';
        finished = numunits===0;
        unitsState = prturn.unitsStatus?prturn.unitsStatus:[]
        let territories = []
        turn.userturn.forEach(turnuser=>{
            turnuser.armies.forEach(army => territories.push(army.territory))
        })
        this.setState({type,numunits,finished,prturn,unitsState,territories})
    }
    isAllPlayerFinish = () =>{
        const {turn} = this.props;
        const FinishedPlayers = turn.userturn.filter(userturn => userturn.finishedUnitStatus)
        return FinishedPlayers.length === turn.userturn.length
    }
    setDestroyUnit = (event) =>{
        const {unitsState, prturn} = this.state;
        let unitState = {
            id: event.target.value,
            type: 'destroy',
            country: prturn.country
        }
        const index = unitsState.findIndex(unit => unit.id===event.target.value);
        index===-1?unitsState.push(unitState):unitsState[index]=unitState;
        this.setState({unitsState});
    }
    destroyUnits = () =>{
        let destroyUnits=[];
        const{numunits, prturn, unitsState} = this.state;
        let index=0;
        for(let i=numunits;i<0;i++){
            destroyUnits.push(<div className="orderItem" key={i}>Destroy: <select name={prturn.country+index} id={prturn.country+index} value={unitsState.length>0?unitsState[index].id:''} onChange={(event)=>{this.setDestroyUnit(event)}}>
                    <option value=''>Not Defined</option>
                    {prturn.armies.map(army => <option key={army.id} value={army.id}>{this.capitalize(army.type)} on {datamap[army.territory].name}</option>)}
                </select>
            </div>)
            index++;
        }
        return destroyUnits;
    }
    isOccupied=(site)=>{
        const {territories} = this.state
        return territories.includes(site)
    }
    createUnits = () =>{
        let createUnits=[];
        const {numunits, prturn,unitsState} = this.state;
        const origins = countries[prturn.country].originalsites.filter(site => prturn.territories.includes(site) && !this.isOccupied(site));
        const newUnits = origins.length>numunits?numunits:origins.length;
        for(let i=0; i<newUnits; i++){
            createUnits.push(<div className="orderItem" key={i}>
                Create Unit on: <select name={i+prturn.country} id={prturn.country+i} value={unitsState[i]!==undefined?unitsState[i].territory:''} onChange={this.setNewTerritory}>
                    <option value=''>Not Defined</option>
                    {origins.map(coun => <option key={coun} value={coun}>{datamap[coun].name}</option>)}
                </select>
                of type:
                {unitsState[i]!==undefined && datamap[unitsState[i].territory] ?
                    datamap[unitsState[i].territory].coast?<select name={unitsState[i].id} id={unitsState[i].id} value={unitsState[i].type?unitsState[i].type:''} onChange={this.setType}>
                            <option value=''>Not Defined</option>
                            <option value='army'>Army</option>
                            <option value='fleet'>Fleet</option>
                        </select>:' Army':' Select the country to create the unit'}
            </div>)
        }

        return createUnits;
    }
    setNewTerritory=(event)=>{
        const {unitsState, prturn} = this.state;
        const {turn} = this.props
        let year = parseInt(turn.year)+1;
        let newUnit = {};
        if(!datamap[event.target.value].coast){
            newUnit = {
                id:year+event.target.value,
                territory:event.target.value,
                country:prturn.country,
                type: 'army'
            }
        }else{
            newUnit = {
                id:year+event.target.value,
                territory:event.target.value,
                country:prturn.country
            }
        }
        unitsState[parseInt(event.target.name.slice(0,1))]=newUnit;
        this.setState({unitsState})
    }
    setType = (event) =>{
        const {unitsState} = this.state;
        const index = unitsState.findIndex(unit => unit.id === event.target.name);
        unitsState[index].type = event.target.value;
        this.setState({unitsState});
    }
    saveUnitStatus=(e)=>{
        e.preventDefault();
        const {unitsState} = this.state
        const {saveUnitStatus}= this.props
        saveUnitStatus(unitsState);
    }
    capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
    render() {
        const {type, finished, numunits} = this.state
        const {processStatus}=this.props
        return (
            <div className='Orders'>
                <div className='OrdersHeader'>
                    <h3>{type} Units</h3>
                </div>
                {finished?<div>You don't have any army to create or destroy</div>:<form className='OrdersBody' onSubmit={this.saveUnitStatus}>
                    {numunits>0?this.createUnits():this.destroyUnits()}
                    <button type="Submit">Save Orders</button>
                </form>}
                {this.isAllPlayerFinish() && <button type="button" onClick={processStatus}>Process Turn</button>}
            </div>
        );
    }
}

export default UnitStatus;