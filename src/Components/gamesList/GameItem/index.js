import React from 'react';
import frontimage from '../../../img/gamesFront.jpg'
import { Link } from "react-router-dom";

const GameItem = (props) => {
    const {id, name, open, cooperative, countryAssign, user, players, started} = props.game
    const {userid, addPlayer} = props;
    return (
        <div className="gameCard">
            <div className="cardImage"><img src={frontimage} alt={name} /></div>
            <div className="cardHeader">
                <Link to={`/games/${id}`}><h3>{name}</h3></Link>
            </div>
            <div className="cardBody">
                <p>Open Game {open?<i className="far fa-thumbs-up"></i>:<i className="far fa-thumbs-down"></i>}</p>
                <p>Cooperative Game {cooperative?<i className="far fa-thumbs-up"></i>:<i className="far fa-thumbs-down"></i>}</p>
                <p>country Assign {countryAssign?<i className="far fa-thumbs-up"></i>:<i className="far fa-thumbs-down"></i>}</p>
                <p>Players Enrolled {players.length}</p>
                <p className="started">{started?'Game Started':'Waiting to Start'}</p>
            </div>
            <div className="cardFooter">
                <Link to={`/games/${id}`}>{started?'Play Game':'More info'}</Link>
                {userid && (user===userid.id || userid.rol === 5) && <Link to={`/games/${id}/edit`}>Edit Game</Link>}
                {userid && players.length<7 && players.filter(player => player.id === userid.id).length===0 && <button onClick={()=>addPlayer(props.game)}>Enroll Me</button>}
            </div>
        </div>
    );
};

export default GameItem;