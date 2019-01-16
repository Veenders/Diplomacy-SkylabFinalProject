import React, { Component } from 'react';
import { withRouter } from 'react-router';

import DBService from '../../Services/DBService';

class Game extends Component {
    constructor(props){
        super(props);

        this.state={
            game: {}
        }
    }
    componentDidMount(){
        this.LoadData();
    }
    async LoadData (){
        console.log(this.props.match.params.id)
        const game = await DBService.getDocument("diplomacy","id",this.props.match.params.id);
        this.setState({game});
    }
    render() {
        const {game} = this.state;
        console.log(game);
        return (
            <main>
                Game
            </main>
        );
    }
}

export default withRouter(Game);