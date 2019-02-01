import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ModalComponent from '../../ModalComponent';


class HeadGame extends Component {
    constructor(props){
        super(props);

        this.state={
            showModal: false,
        }
    }
    capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
    render() {
        const {game, turn, goToTurn} = this.props
        const {showModal} = this.state;
        const prturn = game.turns[turn];
        return (
            <div className="GameHeader">
            <h1>{game.name}</h1>
            <div className="Turnnav">
                Year: {prturn.year} - Season: {this.capitalize(prturn.season)}
                <button onClick={()=>this.setState({showModal:true})}><i className="fas fa-info-circle"></i></button>
                {turn!==0 && <button onClick={()=>goToTurn(turn-1)}><i className="fas fa-arrow-circle-left"></i></button>}
                {`${turn+1}/${game.turns.length}`}
                {turn!==game.turns.length-1 && <button onClick={()=>goToTurn(turn+1)}><i className="fas fa-arrow-circle-right"></i></button>}
            </div>
            {showModal && <ModalComponent title="Game Info" close={()=>this.setState({showModal:false})}>
                <div id="PlayersInfo">
                    <div>
                        {game.players.map(player => <p key={player.id}><Link to={`/profile/${player.id}`}>{player.name}</Link>: {this.capitalize(player.country)}</p>)}
                    </div>
                </div>
            </ModalComponent>}
        </div>
        );
    }
}

export default HeadGame;