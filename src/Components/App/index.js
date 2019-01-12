import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import video from '../../Img/MainVideo.mp4';

import Veenders from '../Veenders';
import Header from '../Header';
import './styles.scss';

class App extends Component {
  render() {
    return (
      <Router>
          <div className="App">
            <div className="Background">
            </div>
              <Header />
              <Switch>
                  <Route exact path="/" component={()=><Veenders />} />
                  <Route component={()=><Veenders  />} />
              </Switch>
            
          </div>
      </Router>
    );
  }
}

export default App;
