import React, { Component } from 'react';
import DBService from '../../Services/DBService';

class Veenders extends Component {
    constructor(props){
        super(props)

        this.state={
            content:[],
        }
    }
    componentDidMount(){
        this.LoadData();
    }
    async LoadData (){
        const content = await DBService.getDocument("content","title",'Hola Mundo');
        console.log(content);
        this.setState({content});
    }
    render() {
        const {title, text} = this.state.content
        return (
            <div>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        );
    }
}

export default Veenders;