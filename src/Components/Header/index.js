import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

import './index.scss';

class Header extends Component {
    render() {
        const {active, openMenu, logged, loginfunct} = this.props;
        const pathname = this.props.location.pathname
        return (
            <React.Fragment>
                <div className={`Background ${active? 'toggled':''}`} onClick={openMenu}>
                </div>
                <button type="button" className={`hamburger ${active?'is-open':'is-closed'}`} /*data-toggle="offcanvas"*/ onClick={openMenu}>
                    <span className="hamb-top"></span>
                    <span className="hamb-middle"></span>
                    <span className="hamb-bottom"></span>
                </button>
                <nav className={`sideBar ${active? 'active':''}`}>
                    <ul>
                        <li className="sidebarBrand headtype">
                            <Link to="/">
                            Diplomacy
                            </Link>
                        </li>
                        <li className={`homeLink ${pathname==='/'?'active':''}`}>
                            <Link to="/"><i className="fas fa-home"></i> Home</Link>
                        </li>
                        <li className={`gamesLink ${/\/games\/*/.test(pathname)?'active':''}`}>
                            <Link to="/games/"><i className="fas fa-dice-d20"></i> Games</Link>
                        </li>
                        <li className={`blogLink ${/\/blog\/*/.test(pathname)?'active':''}`}>
                            <Link to="/blog/"><i className="fas fa-dungeon"></i> Blog</Link>
                        </li>
                        <li className={`rulesLink ${/\/rules\/*/.test(pathname)?'active':''}`}>
                            <Link to="/rules/"><i className="fas fa-pencil-ruler"></i> Rules</Link>
                        </li>
                        <li className={`forumLink ${/\/forum\/*/.test(pathname)?'active':''}`}>
                            <Link to="/forum/"><i className="fab fa-forumbee"></i> Forum</Link>
                        </li>
                        <li className={`profileLink ${/\/profile\/*/.test(pathname)?'active':''}`}>
                            <Link to="/profile/"><i className="fas fa-user"></i> My Profile</Link>
                        </li>
                        <li className={`adminLink ${/\/admin\/*/.test(pathname)?'active':''}`}>
                            <Link to="/admin/"><i className="fas fa-lock"></i> Admin</Link>
                        </li>
                        <li className='login'>
                            <Link to="/" onClick={loginfunct}>{!logged?<React.Fragment><i className="fas fa-sign-in-alt"></i> Login </React.Fragment>: <React.Fragment><i className="fas fa-sign-out-alt"></i> Logout </React.Fragment>}</Link>
                        </li>
                    </ul>
                </nav>
            </React.Fragment>
        );
    }
}

export default withRouter(Header);