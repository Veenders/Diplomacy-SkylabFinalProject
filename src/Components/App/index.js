import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import video from '../../Img/MainVideo.mp4';

import Main from '../../Views/Main';
import Games from '../../Views/Games';
import Header from '../Header';
import './styles.scss';
import Component404 from '../../Views/Component404';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      active: false,
      logged: false,
    }
  }
  openMenu = () => {
    this.setState({active: !this.state.active});
  }
  Login = () => {
    this.setState({logged: !this.state.logged});
  }
  render() {
    const {active, logged} = this.state
    return (
      <Router>
          <div className={`App ${active?'toggled':''}`}>
              <Header active={active} openMenu={this.openMenu} logged={logged} loginfunct={this.Login}/>
              <Switch>
                  <Route exact path="/" component={()=><Main />} />
                  <Route exact path="/games/" component={()=><Games />} />
                  <Route exact path="/blog/" component={()=><Main />} />
                  <Route exact path="/rules/" component={()=><Main />} />
                  <Route exact path="/forum/" component={()=><Main />} />
                  <Route exact path="/profile/" component={()=><Main />} />
                  <Route exact path="/admin/" component={()=><Main />} />
                  <Route component={()=><Component404 />} />
              </Switch>
              <footer>Designed by Veenders</footer>
          </div>
      </Router>
    );
  }
}

export default App;
