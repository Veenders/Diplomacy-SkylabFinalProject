import React, { Component } from 'react';
import { withRouter } from 'react-router';

import DBService from '../../Services/DBService';
import Loading from '../../Components/Loading';
import logo from '../../img/Logo.png';
import './index.scss';

class UserView extends Component {
    constructor(props){
        super(props);

        this.state={
            profile: {},
            mygames: [],
            loading: true,
        }
    }
    componentDidMount(){
        this.LoadData();
    }
    async LoadData (){
        this.setState({loading: true});
        const profile = await DBService.getDocumentById("users", this.props.match.params.id);
        const games = await DBService.getContent("diplomacy");
        const mygames = games.filter(game => {
            return game.user === profile.id || game.players.map(el => el.id ).indexOf(profile.id)!==-1;
        })
        this.setState({profile,loading:false,mygames});
    }
    componentDidUpdate(prevprops){
        prevprops.match.params.id!==this.props.match.params.id && this.LoadData();
    }
    render() {
        const{loading,profile,mygames} = this.state;
        return (
            <main>
                <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                <div className="profileView">
                    {loading?<Loading />:<div className="profileCard">
                        {profile && profile.image ?<img className="profileimg" src={profile.image} alt={profile.name} />:<i className="fas fa-user"></i>}
                        <div>
                            <h2>{profile.name} {profile.lastName}</h2>
                            <h4>My Games</h4>
                            {mygames.map(game => <div key={game.id}>
                                {game.name} - Started: {game.started?<i className="far fa-thumbs-up"></i>:<i className="far fa-thumbs-down"></i>}
                            </div>)}
                        </div>
                    </div>}
                </div>
            </main>
        );
    }
}

export default withRouter(UserView);