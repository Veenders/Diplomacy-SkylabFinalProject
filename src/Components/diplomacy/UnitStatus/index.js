import React, { Component } from 'react';
import datamap from '../../../data/map';

class UnitStatus extends Component {
    constructor(props){
        super(props)

        this.state={
            type: 'Create',
            units: [],
            numunits: 0,
            finished: false,
            prturn: {}
        }
    }
    componentWillMount(){
        const {turn, player}= this.props
        let {type, finished} = this.state
        const index = turn.userturn.findIndex(userturn => userturn.player===player)
        const prturn = turn.userturn[index]
        const numunits = prturn.controlledSC-prturn.armies.length
        type = numunits>= 0 ?'Create':'Destroy';
        finished = numunits===0;
        console.log(prturn)
        this.setState({type,numunits,finished,prturn})
    }
    isAllPlayerFinish = () =>{
        const {turn} = this.props;
        const FinishedPlayers = turn.userturn.filter(userturn => userturn.finishedUnitStatus)
        return FinishedPlayers.length === turn.userturn.length
    }
    setDestroyOrder = (event) =>{
        console.log(event.target)
    }
    destroyUnits = () =>{
        let destroyUnits=[];
        const{numunits, prturn} = this.state;
        for(let i=numunits;i<0;i++){
            destroyUnits.push(<React.Fragment key={i}>Destroy: <select name={prturn.country+i} id={prturn.country+i} value={prturn.UnitStatus?prturn.UnitStatus[i].id:''} onChange={this.setDestroyOrder}>
                    <option value=''>Not Defined</option>
                    {prturn.armies.map(army => <option key={army.id} value={army.id}>{this.capitalize(army.type)} on {datamap[army.territory].name}</option>)}
                </select>
            </React.Fragment>)
        }
        return destroyUnits;
    }
    createUnits = () =>{
        return(<React.Fragment>
            
        </React.Fragment>)
    }
    saveUnitStatus=(e)=>{
        e.preventDefault();
        
        console.log('Save Units')
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