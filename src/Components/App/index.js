import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import video from '../../Img/MainVideo.mp4';

import Main from '../../Views/Main';
import Header from '../Header';
import './styles.scss';
import Component404 from '../../Views/Component404';

class App extends Component {
  render() {
    return (
      <Router>
          <div className="App">
            <div className="Background">
            </div>
              <Header />
              <Switch>
                  <Route exact path="/" component={()=><Main />} />
                  <Route component={()=><Component404 />} />
              </Switch>
            
          </div>
      </Router>
    );
  }
}

export default App;
