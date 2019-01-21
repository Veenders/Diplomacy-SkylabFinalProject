import React from 'react';
import frontimage from '../../../img/gamesFront.jpg'
import { Link } from "react-router-dom";

const GameItem = (props) => {
    const {id, name, open, cooperative, houseAssign,user, players} = props.game
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
                <p>House Assign {houseAssign?<i className="far fa-thumbs-up"></i>:<i className="far fa-thumbs-down"></i>}</p>
            </div>
            <div className="cardFooter">
                <Link to={`/games/${id}`}>More info</Link>
                {user===userid && <Link to={`/games/${id}/edit`}>Edit Game</Link>}
                {userid && players.length<7 && players.filter(player => player.id === userid).length===0 && <button onClick={()=>addPlayer(props.game)}>Enroll Me</button>}
            </div>
        </div>
    );
};

export default GameItem;