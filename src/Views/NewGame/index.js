import React, { Component } from 'react';
import { withRouter } from 'react-router';

import DBService from '../../Services/DBService';

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
            started: false,
            players: [{id: 1, name: 'Carles', house: ''},
                {id: 2, name: 'Player 2', house:''},
                {id: 3, name: 'Player 3', house:''},
                {id: 4, name: 'Player 4', house:''},
                {id: 5, name: 'Player 5', house:''},
                {id: 6, name: 'Player 6', house:''},
                {id: 7, name: 'Player 7', house:''},
            ],
            error: [false,false],
            countries: ['austria', 'england', 'france', 'germany', 'italy', 'rusia', 'turkey']
        }
    }
    setField = (field) => {
        this.setState({[field.name]:field.value})
    }
    setCheckbox = (event) => {
        const state = !this.state[event.target.name];
        this.setState({[event.target.name]:state});
        
    }
    setPlayer = (event) => {
        let { players, countries } = this.state;
        // eslint-disable-next-line eqeqeq
        const [player] = players.filter(player => player.id == event.target.name);
        player.house!=='' && countries.push(player.house);
        const index = countries.indexOf(event.target.value);
        index !== -1 && countries.splice(index,1);
        player.house = event.target.value;
        players = players.map(item =>item.id===player.id?player:item);
        countries.sort();
        this.setState({players,countries}); 
    }
    capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
    playerOptions = (id) =>{
        const { players, countries } = this.state;
        // eslint-disable-next-line eqeqeq
        const [player] = players.filter(player => player.id == id);
        return (
            <React.Fragment>
                {player.house!=='' && <option value={player.house}>{this.capitalize(player.house)}</option>}
                {countries.length>0 && countries.map((country,i) => <option key={country+i} value={country}>{this.capitalize(country)}</option>)}
            </React.Fragment>
        )

    }
    sendForm = async (event) =>{
        event.preventDefault();
        const {name, open, cooperative, houseAssign, code, players, started} = this.state;
        let errorname = name ===''?true:false;
        let errorplayers = false;
        players.forEach(player=>{
            let count = 0;
            players.forEach(item=>player.house===item.house && player.house!==''?count++:count)
            errorplayers=count > 1?true:errorplayers;
        })
        if(!errorname && !errorplayers){
            const result = await DBService.addDocument('diplomacy',{name, open, cooperative, houseAssign, code, started, players});
            if(result){
                this.setState({name:'', open:false, cooperative:false, houseAssign:false, code:'',error:[errorname,errorplayers]},this.props.history.goBack)
            }
        }else{
            this.setState({error:[errorname,errorplayers]});
        }
      
    }
    render() {
        const {name , open, cooperative, houseAssign, code, error, players} = this.state;
        return (
            <main>
                <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                <form className="newGameForm" onSubmit={this.sendForm}>
                    <h1>Start a New Game</h1>
                    <label htmlFor="name">
                        <div className="label">Game Name:</div>
                        <input type="text" name="name" value={name} placeholder="Put the name of the Game" onChange={(event)=>this.setField(event.target)}/>
                    </label>
                    {error[0]&&<div className="error">You need a Game Name</div>}
                    <label htmlFor="open">
                        <div className="label">Open:</div> <input type="checkbox" name="open" id="open" defaultChecked={ open } onChange={this.setCheckbox}/>
                        <span className="checkBox"></span>
                    </label>
                    <label htmlFor="cooperative">
                        <div className="label">Cooperative:</div> <input type="checkbox" name="cooperative" id="cooperative" defaultChecked={cooperative} onChange={this.setCheckbox}/>
                        <span className="checkBox"></span>
                    </label>
                    <label htmlFor="houseAssign">
                        <div className="label">House Assign:</div> <input type="checkbox" name="houseAssign" id="houseAssign" defaultChecked={houseAssign} onChange={this.setCheckbox}/>
                        <span className="checkBox"></span>
                    </label>
                    <label htmlFor="code">
                        <div className="label">Invite Code:</div> <input type="text" name="code" value={code} onChange={(event)=>this.setField(event.target)}/>
                    </label>
                    <div className="players">
                        {players.length>0 && players.map(player=>{
                            return (<label key={player.id} htmlFor={player.id}>
                                <div className="label">{player.name}:</div> 
                                <select name={player.id} id={player.id} value={player.house} onChange={this.setPlayer}>
                                    <option value="">Not Assigned</option>
                                    {this.playerOptions(player.id)}
                                </select>
                            </label>)})
                        }
                    </div>
                    {error[1] && <div className="error">You can't repeat countries</div>}
                    <div className="formFooter">
                        <button type="submit">Create</button>
                        <button onClick={this.props.history.goBack}>Cancel</button>
                    </div>
                </form>
            </main>
        );
    }
}

export default withRouter(NewGame);