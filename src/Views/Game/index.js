import React, { Component } from 'react';
import { withRouter } from 'react-router';

import DBService from '../../Services/DBService';
import Loading from '../../Components/Loading';
import GameDetail from './GameDetail';
import Diplomacy from '../../Components/diplomacy';
import logo from '../../img/Logo.png';
import './index.scss';

class Game extends Component {
    constructor(props){
        super(props);

        this.state={
            game: {},
            loading: true
        }
    }
    componentDidMount(){
        this.LoadData();
    }
    async LoadData (){
        this.setState({loading: true});
        const game = await DBService.getDocumentById("diplomacy", this.props.match.params.id);
        this.setState({game,loading:false});
    }
    render() {
        const {game,loading} = this.state;
        return (
            <main>
                <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                {loading?<Loading />:game.started?<Diplomacy game={game} />:<GameDetail game={game} />}
            </main>
        );
    }
}

export default withRouter(Game);