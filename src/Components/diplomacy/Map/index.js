import React, { Component } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import MapSVG from './../../../img/DiplomacyMaptry.svg';
import army from './../../../img/army.svg';
import flet from './../../../img/flet.svg'

class Map extends Component {
    componentDidMount (){
        //const canvas = this.refs.canvas;
        //const ctx = canvas.getContext("2d");
        //const img = this.refs.map;

        //img.onload = () => {
          //  ctx.drawImage(img,0,0);
        //}
    }
    TerritoryClicked = (event) =>{
        console.log(event.target)
    }
    render() {
        return (
            <div className="Map">
                {/*<canvas ref="canvas" id="tauler" width={837} height={768} />
                <img ref="map" src={MapSVG} alt="Map" id="mapsvg"/>*/}
                <SvgLoader path={MapSVG} onClick={this.TerritoryClicked}>
                    <SvgProxy selector=".l" fill="#FFFFDD" stroke="black" />
                    <SvgProxy selector=".w" fill="##99CCFF" stroke="black" />
                    <SvgProxy selector="#Ank" fill="red" />
                    <SvgProxy selector="#NTH" fill="red" />
                    <SvgProxy selector="#NWG" fill="red" ></SvgProxy>
                </SvgLoader>
                <div>
                    <SvgLoader path={army} fill="red" stroke="red">
                        <SvgProxy selector="path" fill="red" stroke="red" />
                    </SvgLoader>
                </div>

            </div>
        );
    }
}

export default Map;