/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import MapSVG from './../../../img/DiplomacyMap.svg';
import Armies from './armies';
import datamap from './../../../data/map';
import countries from './../../../data/country';

const _MAPWIDTH = 837;
const _MAPHEIGHT = 768;
class Map extends Component {
    constructor(props){
        super(props);

        this.state = {
            scale: 1,
        }
        this.aspectRatio = _MAPWIDTH/_MAPHEIGHT
    }
    componentDidMount (){
        window.addEventListener("resize",this.setScale);
        this.setScale();
    }
    setScale = () => {
        const prWidth = window.innerWidth;
        if(prWidth > _MAPWIDTH){
            this.setState({scale:1});
        }else{
            this.setState({scale:prWidth/_MAPWIDTH})
        }

    }
    loadArmy = () => {
        let armys = []
        const {turn} = this.props;
        turn.userturn.map(usturn=>{
            usturn.armies.map(army=>armys.push(<Armies father={this} key={army.id+turn.year+turn.season} id={army.id} color={countries[army.country].armycol} type={army.type} x={datamap[army.territory].x} y={datamap[army.territory].y} armyDroped={this.ArmyDroped}/> ))
        })
        return armys;
    }
    drawTerritory = () => {
        let territories = []
        const {turn} = this.props;
        turn.userturn.map(usturn=>{
            usturn.territories.map(territory => territories.push(<SvgProxy key={territory} selector={'#'+territory} fill={countries[usturn.country].countrycol} stroke="black" />))
            
        })
        return territories;
    }
    drawLines=()=>{
        let lines = []
        let linesresult =[];
        const {turn, player} = this.props;
        if(turn.phase===1){
            lines = turn.userturn.filter(usturn=>usturn.player===player).orders.map(order=> order)
        }else{
            turn.userturn.forEach(usturn=>usturn.orders.forEach(order=>lines.push(order)))
        }
        if(lines.length>0){
            linesresult = lines.map(line => <svg key={line.id}><line  x1={datamap[line.origin].x} y1={datamap[line.origin].y} x2={datamap[line.destination?line.destination:line.origin].x} y2={datamap[line.destination?line.destination:line.origin].x} style={{stroke:'red',strokeWidth:2,zIndex:10}} /></svg>)
        }
        return linesresult;
    }
    TerritoryClicked = (event) =>{
        console.log(event.target.id);
    }
    componentWillUnmount(){
        window.removeEventListener("resize",this.setScale);
    }

    render() {
        return (
            <div id="main-map" className="Map" style={{transform:`scale(${this.state.scale})`}}>
                <SvgLoader id="map" ref="map" path={MapSVG} width={_MAPWIDTH} height={_MAPHEIGHT}>
                    <SvgProxy selector=".l" fill="#FFFFDD" stroke="black" />
                    <SvgProxy selector=".w" fill="#99CCFF" stroke="black" />
                    <SvgProxy selector=".s" fill="#DDDDDD" stroke="black" />
                    {this.drawTerritory()}
                </SvgLoader>
                {this.loadArmy()}
            </div>
        );
    }
}

export default Map;