import React, { Component } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import MapSVG from './../../../img/DiplomacyMap.svg';
import army from './../../../img/army.svg';
import fleet from './../../../img/fleet.svg'
import datamap from './../../../data/map';

class Map extends Component {
    componentDidMount (){
        
    }
    loadArmy = () => {
        var armys = []
        for(const mapid in datamap){
            const country = datamap[mapid];
            if(country.kind==='land'){
                armys.push(<SvgLoader key={'army'+country.id} ref="army" className="army" id={'army'+country.id} path={army} onClick={()=>this.ArmyDroped('army'+country.id)} style={{top:`${country.y}pt`,left:`${country.x}pt`}}/>)
            }
            else{
                armys.push(<SvgLoader key={'fleet'+country.id} ref="fleet" className="fleet" id={'fleet'+country.id} path={fleet} onClick={()=>this.ArmyDroped('fleet'+country.id)} style={{top:`${country.y}pt`,left:`${country.x}pt`}}/>)
            }
        }
        return armys;
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
                {this.loadArmy()}
            </div>
        );
    }
}

export default Map;