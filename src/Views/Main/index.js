import React, {Component} from 'react';
import { Link } from "react-router-dom";

import './index.scss';
import logo from '../../img/Logo.png';

class Main extends Component {
  render() {
    return(
      <main>
        <div className="mainLogo"><img src={logo} alt="Atomic Diplomacy"/></div>
        <h1 className="mainTitle">Atomic Diplomacy</h1>
        <section>
          <Link to="/games/" className="callToAction">View Games</Link>
          <Link to="/games/game/" className="callToAction">Start a New Game</Link>
        </section>
      </main>
    )
  }
}

export default Main

