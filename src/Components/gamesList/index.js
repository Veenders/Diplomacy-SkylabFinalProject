import React from 'react';
import GameItem from './GameItem';

const index = (props) => {
    const {games,user, addPlayer} = props
    return (
        <div className="gameList">
            {games.length>0?games.map(game => <GameItem key={game.id} game={game} userid={user} addPlayer={addPlayer}/>):<div className="nogames">Any Games to Play</div>}
        </div>
    );
};

export default index;