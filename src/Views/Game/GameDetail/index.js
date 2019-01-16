import React from 'react';
import { withRouter } from 'react-router';

const GameDetail = (props) => {
    const {game} = props
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
                {game.players.map(player => <p key={player.id}>{player.name}: {player.house===''?'Not Assigned':player.house.charAt(0).toUpperCase() + player.house.slice(1)}</p>)}
            </div>
            <button onClick={props.history.goBack}>Back</button>
        </div>
    );
};

export default withRouter(GameDetail);