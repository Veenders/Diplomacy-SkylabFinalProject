import React, { Component } from 'react';

import './index.scss';
import logo from '../../img/Logo.png';

class NewGame extends Component {
    sendForm = () =>{
        console.log('Form Sended')
    }
    render() {
        return (
            <main>
                <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                <h1>Start a New Game</h1>
                <form onSubmit={this.sendForm}>
                    <label htmlFor="name">
                        <span className="label">Game Name:</span>
                        <input type="text" name="name" />
                    </label>
                    <label htmlFor="open">
                        <span className="label">Open:</span> <input type="checkbox" name="open" id="open"/>
                        <span className="checkBox"></span>
                    </label>
                    <label htmlFor="copperative">
                    <span className="label">Copperative:</span> <input type="checkbox" name="copperative" id="copperative" />
                        <span className="checkBox"></span>
                    </label>
                    <label htmlFor="houseAssign">
                    <span className="label">House Assign:</span> <input type="checkbox" name="houseAssign" id="houseAssign"/>
                        <span className="checkBox"></span>
                    </label>
                    <label htmlFor="code">
                    <span className="label">Invite Code:</span> <input type="text" name="code" />
                    </label>
                    <button type="submit">Create</button>
                    <button type="reset">Cancel</button>
                </form>
            </main>
        );
    }
}

export default NewGame;