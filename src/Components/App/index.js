import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import AuthService from '../../Services/AuthService';
import DBService from '../../Services/DBService';
import { setUserInfo } from '../../Redux/actions/userActions';

import Main from '../../Views/Main';
import Games from '../../Views/Games';
import Game from '../../Views/Game';
import NewGame from '../../Views/NewGame';
import Posts from '../../Views/Posts';
import Header from '../Header';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Component404 from '../../Views/Component404';

import './styles.scss';

class App extends Component {
  componentDidMount(){
    AuthService.registerAuthObserver(async (user) => {
      let userData = null;
      if (user) {
        userData = await DBService.getDocumentById('users', user.uid);
        AuthService.registerUserStatus();
      } 
      this.props.setUser(userData);
    });
  }
  render() {
    return (
      <Router>
          <div className='App'>
              <Header/>
              <Switch>
                  <Route exact path="/" component={()=><Main />} />
                  <Route exact path="/games/" component={()=><Games />} />
                  <Route exact path="/newgame/" component={()=><NewGame />} />
                  <Route exact path="/games/:idgame" component={()=><Game />} />
                  <Route exact path="/games/:idgame/edit" component={()=><NewGame />} />
                  <Route exact path="/blog/" component={()=><Posts category="blog"/>} />
                  <Route exact path="/rules/" component={()=><Posts category="rules" />} />
                  <Route exact path="/forum/" component={()=><Main />} />
                  <Route exact path="/profile/" component={()=><Main />} />
                  <Route exact path="/admin/" component={()=><Main />} />
                  <Route exact path="/login/" component={()=><Login />} />
                  <Route exact path="/register/" component={()=><Register />} />
                  <Route component={()=><Component404 />} />
              </Switch>
              <footer>Designed by Veenders</footer>
          </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) }
  }
}

export default connect(null, mapDispatchToProps )(App);
