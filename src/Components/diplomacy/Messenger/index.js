import React, { Component } from 'react';
import DBService from '../../../Services/DBService';
import AuthService from '../../../Services/AuthService';
import countries from '../../../data/country';

class Messenger extends Component {
    constructor(props){
        super(props);

        this.state = {
            messages:{
                diplomacy_id:'',
                chat:[]
            },
            to: 0,
            message: '',
            filter: 0,
            online: false,
            playersStatus:{}
        }
        this.conexion = null;
    }
    async componentDidMount(){
        const {idgame, players} = this.props
        this.conexion = await DBService.getRealtimeDocument('messages','diplomacy_id', idgame ,(messages) => {
            messages!==null && this.setState({messages});
        });
        players.forEach(player => AuthService.userStatusObserver(player.id,(status)=>{
            const {playersStatus} = this.state
            const prplayer=player.id
            playersStatus[prplayer]=status;
            this.setState({playersStatus});
        }))
    }
    setFilter = (filter) => {
        this.setState({filter,to:filter});
    }
    setField = (field) => {
        this.setState({[field.name]:field.value})
    }
    drawMessage = (mess,i) =>{
        const {players, from} = this.props;
        const [player] = players.filter(item => item.id === mess.from);
        if(player.id===from){
            return <p key={i} className="self">{mess.message}</p>
        }else{
            return (<p key={i}>{player.name}: {mess.message}</p>)
        }
    } 
    sendMessage = async(e) =>{
        e.preventDefault();
        const {from, idgame} = this.props;
        const{to,message} = this.state
        let {messages} =this.state;
        messages.diplomacy_id=idgame;
        messages.chat.push({to,from,message})
        const success = DBService.setDocumentWithId('messages', messages, idgame);
        success && this.setState({message:''});
    }
    componentWillUnmount(){
        this.conexion();
    }
    capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
    render() {
        const { messages, message, to, filter, online, playersStatus} = this.state;
        const {players,from} = this.props;
        return (
            <div className="Messenger">
                <h3>Messages</h3>{online&&<p>user online</p>}
                <div className="HeaderMessage">
                <button onClick={()=>this.setFilter(0)} className={filter===0?'activeTab':''}>All Players</button>
                    {
                        players.filter(player=>player.id!==from)
                        .map(player=><button onClick={()=>this.setFilter(player.id)} key={player.id} className={filter===player.id?'activeTab':''}>
                                <i className={`fas fa-circle ${playersStatus[player.id]?playersStatus[player.id]:'offline'}`}></i> 
                                {player.name} 
                                <br/>
                                <i className={`fas fa-circle`} style={{color:countries[player.country].armycol}}></i>{this.capitalize(player.country)}
                            </button>)}
                </div>
                <div className="MessageView">
                    {messages.chat.length>0 ?
                        // eslint-disable-next-line 
                        messages.chat.filter(mess=>(filter===0&&mess.to===0||mess.to===filter&&mess.from===from)||(mess.from===filter&&mess.to===from))
                        .map((mess,i)=>this.drawMessage(mess,i)):<p>No messages in this game</p>
                    }
                </div>
                <form id="MessengerForm" onSubmit={this.sendMessage}>
                    <div className="to">
                        Send To:
                        <select name="to" id="to" value={to} onChange={(event)=>this.setField(event.target)}>
                            <option value="0">All players</option>
                            {players.filter(player=>player.id!==from).map(player=><option value={player.id} key={player.id}>{player.name}</option>)}
                        </select>
                    </div>
                    <div className="MessageBox">
                        <input type="text" name="message" id="message" value={message} placeholder="Write your Message" onChange={(event)=>this.setField(event.target)}/>
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Messenger;