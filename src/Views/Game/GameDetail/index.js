import React from 'react';
import { withRouter } from 'react-router';

const GameDetail = (props) => {
    const {game,addPlayer,userid} = props
    return (
        <div className="gameDetail">
           <h1>{game.name}</h1>
            <div className="gameDetailBody">
                <p>Open Game {game.open?<i className="far fa-thumbs-up"></i>:<i className="far fa-thumbs-down"></i>}</p>
                <p>Cooperative Game {game.cooperative?<i className="far fa-thumbs-up"></i>:<i className="far fa-thumbs-down"></i>}</p>
                <p>House Assign {game.houseAssign?<i className="far fa-thumbs-up"></i>:<i className="far fa-thumbs-down"></i>}</p>
            </div>
            <div className="gamePlayers">
                <h3>Players</h3>
                {game.players && game.players.map(player => <p key={player.id}>{player.name}: {player.house===''?'Not Assigned':player.house.charAt(0).toUpperCase() + player.house.slice(1)}</p>)}
            </div>
            {userid && game.players && game.players.length<7 && game.players.filter(player => player.id === userid).length===0 && <button onClick={()=>addPlayer()}>Enroll Me</button>}
            <button onClick={props.history.goBack}>Back</button>
        </div>
    );
};

export default withRouter(GameDetail);