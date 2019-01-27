import React, { Component } from 'react';
import { SvgLoader } from 'react-svgmt';
import army from './../../../../img/army.svg';
import fleet from './../../../../img/fleet.svg';

class Armies extends Component {
    constructor(props){
        super(props);

        this.state = {
            x: 0,
            y: 0,
        }
    }
    componentDidMount(){
        const {x,y} = this.props;
        this.setState({x,y});
    }
    armyDroped = (event) =>{
        event.preventDefault();
        const position = document.getElementById("main-map").getBoundingClientRect();
        event.pageX!==0 && this.setState({x:(event.pageX-position.x)/1.333,y:(event.pageY-position.y)/1.333})
    }
    render() {
        const {color, id, type, } = this.props;
        const {x, y} = this.state;
        return (
            <SvgLoader fill={color} ref={type} className={type} id={id} path={type==='army'?army:fleet} onDrag={(event)=>this.armyDroped(event)}  draggable style={{top:`${y}pt`,left:`${x}pt`}}/>
        );
    }
}

export default Armies;