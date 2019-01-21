import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AuthService from '../../Services/AuthService';
import './index.scss';

class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            active:false
        }
    }
    openMenu = () => {
        this.setState({active: !this.state.active});
    }
    logout = () =>{
        const error = AuthService.logout();
        if(!error){
            this.props.history.push('/')
        }
    }
    render() {
        const {openMenu, user} = this.props;
        const {active} = this.state
        const pathname = this.props.location.pathname
        return (
            <React.Fragment>
                <div className={`Background ${active? 'toggled':''}`} onClick={openMenu}>
                </div>
                <button type="button" className={`hamburger ${active?'is-open':'is-closed'}`} /*data-toggle="offcanvas"*/ onClick={this.openMenu}>
                    <span className="hamb-top"></span>
                    <span className="hamb-middle"></span>
                    <span className="hamb-bottom"></span>
                </button>
                <nav className={`sideBar ${active? 'active':''}`}>
                    <ul onClick={this.openMenu}>
                        <li className="sidebarBrand headtype">
                            <Link to="/">
                            Diplomacy
                            </Link>
                        </li>
                        <li className={`homeLink ${pathname==='/'?'active':''}`}>
                            <Link to="/" onClick={this.OpenMenu}><i className="fas fa-home"></i> Home</Link>
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
                        {user && <li className={`forumLink ${/\/forum\/*/.test(pathname)?'active':''}`}>
                            <Link to="/forum/"><i className="fab fa-forumbee"></i> Forum</Link>
                        </li>}
                        {user && <li className={`profileLink ${/\/profile\/*/.test(pathname)?'active':''}`}>
                            <Link to={`/profile/${user.id}`}><i className="fas fa-user"></i> {user.name}'s Profile</Link>
                        </li>}
                        {user && user.rol === 5 && <li className={`adminLink ${/\/admin\/*/.test(pathname)?'active':''}`}>
                            <Link to="/admin/"><i className="fas fa-lock"></i> Admin</Link>
                        </li>}
                        <li className='login'>
                            {!user?<Link to="/login/"><i className="fas fa-sign-in-alt"></i>Login</Link>:<span onClick={this.logout}><Link to="/"><i className="fas fa-sign-out-alt"></i> Logout </Link></span>}
                        </li>
                    </ul>
                </nav>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.userReducer.user
    }
}

export default withRouter(connect(mapStateToProps)(Header));