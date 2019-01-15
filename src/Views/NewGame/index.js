import React, { Component } from 'react';

import './index.scss';
import logo from '../../img/Logo.png';

class NewGame extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            open: false,
            cooperative: false,
            houseAssign: false,
            code: '',
            error: false,
        }
    }
    setField = (field) => {
        this.setState({[field.name]:field.value})
    }
    setCheckbox = (event) => {
        const state = !this.state[event.target.name];
        this.setState({[event.target.name]:state});
        
    }
    sendForm = () =>{
        console.log('Form Sended')
    }
    render() {
        const {name , open, cooperative, houseAssign, code, error} = this.state; 
        return (
            <main>
                <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                <form className="newGameForm" onSubmit={this.sendForm}>
                    <h1>Start a New Game</h1>
                    <label htmlFor="name">
                        <div className="label">Game Name:</div>
                        <input type="text" name="name" value={name} placeholder="Put the name of the Game" onChange={(event)=>this.setField(event.target)}/>
                        {error&&<span className="error">You need a Game Name</span>}
                    </label>
                    <label htmlFor="open">
                        <div className="label">Open:</div> <input type="checkbox" name="open" id="open" defaultChecked={ open } onChange={this.setCheckbox}/>
                        <span className="checkBox"></span>
                    </label>
                    <label htmlFor="copperative">
                        <div className="label">Copperative:</div> <input type="checkbox" name="copperative" id="copperative" defaultChecked={cooperative} onChange={this.setCheckbox}/>
                        <span className="checkBox"></span>
                    </label>
                    <label htmlFor="houseAssign">
                        <div className="label">House Assign:</div> <input type="checkbox" name="houseAssign" id="houseAssign" defaultChecked={houseAssign} onChange={this.setCheckbox}/>
                        <span className="checkBox"></span>
                    </label>
                    <label htmlFor="code">
                        <div className="label">Invite Code:</div> <input type="text" name="code" value={code} onChange={(event)=>this.setField(event.target)}/>
                    </label>
                    <div className="formFooter">
                        <button type="submit">Create</button>
                        <button type="reset">Cancel</button>
                    </div>
                </form>
            </main>
        );
    }
}

export default NewGame;