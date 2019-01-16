import React, { Component } from 'react';
import MapSVG from './../../../img/DiplomacyMap.svg'

class Map extends Component {
    componentDidMount (){
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const img = this.refs.map;

        img.onload = () => {
            ctx.drawImage(img,0,0);
        }
    }
    render() {
        return (
            <div className="Map">
                <canvas ref="canvas" id="tauler" width={837} height={768} />
                <img ref="map" src={MapSVG} alt="Map" id="mapsvg"/>
            </div>
        );
    }
}

export default Map;