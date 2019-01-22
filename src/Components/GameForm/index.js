import React, { Component } from 'react';

import DBService from '../../Services/DBService';
import logo from '../../img/Logo.png';
import StartGame from '../StartGame';

class GameForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            open: false,
            cooperative: false,
            houseAssign: false,
            code: '',
            started: false,
            players: [],
            error: [false,false],
            user:'',
            countries: ['austria', 'england', 'france', 'germany', 'italy', 'rusia', 'turkey']
        }
    }
    componentDidMount(){
        const {idgame, user} = this.props
        if(idgame){
            this.loadData()
        }else{
            this.setState({user:user.id,players:[{id: user.id, name: user.name, house:''}]});
        }
    }
    loadData = async() => {
        const {idgame} = this.props
        const {name, open, cooperative, houseAssign, code, players, started, user} = await DBService.getDocumentById("diplomacy", idgame);
        this.setState({name, open, cooperative, houseAssign, code, players, started, user});
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
                <select name={player.id} id={player.id} value={player.house} onChange={this.setPlayer}>
                    <option value="">Not Assigned</option>
                    {player.house!=='' && <option value={player.house}>{this.capitalize(player.house)}</option>}
                    {countries.length>0 && countries.map((country,i) => <option key={country+i} value={country}>{this.capitalize(country)}</option>)}
                </select>
        )

    }
    sendForm = async (event) =>{
        event.preventDefault();
        const {name, open, cooperative, houseAssign, code, players, user, started} = this.state;
        const {idgame} = this.props;
        let errorname = name ===''?true:false;
        let errorplayers = false;
        players.forEach(player=>{
            let count = 0;
            players.forEach(item=>player.house===item.house && player.house!==''?count++:count)
            errorplayers=count > 1?true:errorplayers;
        })
        if(!errorname && !errorplayers){
            let result = false
            if(idgame){
                result = await DBService.setDocumentWithId('diplomacy',{name, open, cooperative, houseAssign, code, players, user, started},idgame);
            }else{
                result = await DBService.addDocument('diplomacy',{name, open, cooperative, houseAssign, code, user, players, started});
            }
            if(result){
                this.setState({name:'', open:false, cooperative:false, houseAssign:false, code:'',error:[errorname,errorplayers]},this.props.goBack)
            }
        }else{
            this.setState({error:[errorname,errorplayers]});
        }
      
    }
    render() {
        const {name , open, cooperative, houseAssign, code, error, players, started, user} = this.state;
        const {goBack, idgame} = this.props;
        return (
            <main>
                <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                <form className="newGameForm" onSubmit={this.sendForm}>
                    {idgame?<h1>Edit {name}</h1>:<h1>Start a New Game</h1>}
                    <label htmlFor="name">
                        <div className="label">Game Name:</div>
                        <input type="text" name="name" value={name} placeholder="Put the name of the Game" onChange={(event)=>this.setField(event.target)}/>
                    </label>
                    {error[0]&&<div className="error">You need a Game Name</div>}
                    <label htmlFor="open">
                        <div className="label">Open:</div> <input type="checkbox" name="open" id="open" checked={ open } onChange={this.setCheckbox}/>
                        <span className="checkBox"></span>
                    </label>
                    <label htmlFor="cooperative">
                        <div className="label">Cooperative:</div> <input type="checkbox" name="cooperative" id="cooperative" checked={cooperative} onChange={this.setCheckbox}/>
                        <span className="checkBox"></span>
                    </label>
                    <label htmlFor="houseAssign">
                        <div className="label">House Assign Manually:</div> <input type="checkbox" name="houseAssign" id="houseAssign" checked={houseAssign} onChange={this.setCheckbox}/>
                        <span className="checkBox"></span>
                    </label>
                    <label htmlFor="code">
                        <div className="label">Invite Code:</div> <input type="text" name="code" value={code} onChange={(event)=>this.setField(event.target)}/>
                    </label>
                    <div className="players">
                        {players.length>0 && players.map(player=>{
                            return (<label key={player.id} htmlFor={player.id}>
                                <div className="label">{player.name}:</div> 
                                {houseAssign?this.playerOptions(player.id):<div>Automatic Assign</div>}
                            </label>)})
                        }
                    </div>
                    {error[1] && <div className="error">You can't repeat countries</div>}
                    <div className="formFooter">
                        <button type="submit">{idgame?'Save':'Create'}</button>
                        <button type="reset" onClick={goBack}>Cancel</button>
                        {players.length===7 && <StartGame type="click" onClick={this.StartGame} game={{name, open, cooperative, houseAssign, code, started, user, players}} idgame={idgame} />}
                    </div>
                </form>
            </main>
        );
    }
}

export default GameForm;