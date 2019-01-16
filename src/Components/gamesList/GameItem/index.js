import React from 'react';
import frontimage from '../../../img/gamesFront.jpg'
import { Link } from "react-router-dom";

const GameItem = (props) => {
    const {id, name, open, cooperative, houseAssign} = props.game
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
            <div className="cardFooter"><Link to={`/games/${id}`}>More info</Link></div>
        </div>
    );
};

export default GameItem;