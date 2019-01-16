import React from 'react';
import GameItem from './GameItem';

const index = (props) => {
    const {games} = props
    return (
        <div className="gameList">
            {games.length>0?games.map(game => <GameItem key={game.id} game={game} />):<div className="nogames">Any Games to Play</div>}
        </div>
    );
};

export default index;