import React, { Component } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import MapSVG from './../../../img/DiplomacyMap.svg';
import army from './../../../img/army.svg';
import fleet from './../../../img/fleet.svg'

class Map extends Component {
    componentDidMount (){

    }
    TerritoryClicked = (event) =>{
        console.log(event.target.id);
    }
    ArmyDroped = (army) =>{
        console.log(army);
    }
    render() {
        return (
            <div className="Map">
                <SvgLoader id="map" ref="map" path={MapSVG} onClick={this.TerritoryClicked} width={837} height={768}>
                    <SvgProxy selector=".l" fill="#FFFFDD" stroke="black" />
                    <SvgProxy selector=".w" fill="#99CCFF" stroke="black" />
                    <SvgProxy selector=".s" fill="#DDDDDD" stroke="black" />
                </SvgLoader>
                <SvgLoader ref="army" className="army" id="army" path={army} onClick={()=>this.ArmyDroped('army')} style={{top:'460pt',left:'500pt'}}/>
                <SvgLoader ref="fleet" className="fleet" id="fleet" path={fleet} onClick={()=>this.ArmyDroped('fleet')} style={{top: '250pt',left:'308pt', fill: 'blue'}}/>
            </div>
        );
    }
}

export default Map;