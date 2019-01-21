import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Loading from '../../Loading';
import AuthService from '../../../Services/AuthService';
import './index.scss';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
            loading: true,
        }
    }
    componentDidUpdate(){
        this.props.user && this.props.history.push('/');
    }
    login = async (e) => {
        e.preventDefault();
        this.setState({error: ''});
    
        const { email, password } = this.state;
        const result = await AuthService.login(email, password);

        result===''? this.props.match.path==='/login/' && this.props.history.push('/'):this.setState({error: result})
    
        /*switch(result) {
            case 'auth/wrong-password':
                this.setState({error: 'Usuario y/o contraseña no válidos'})
                break;
            default:
                this.props.history.push('home');
        }*/
    }
    render() {
        const { email, password, error } = this.state;
        if(this.props.login) return <Loading />;
        return (
            <div className="login">
                <div className="modal">
                    <h2>Login</h2>
                    <form className="login" onSubmit={this.login}>
                        <input type="email"    value={email} onChange={(e)=>{this.setState({email: e.target.value}) }} placeholder="Email"/>
                        <input type="password" value={password} onChange={(e)=>{this.setState({password: e.target.value}) }} placeholder="Password"/>
                        <button type="submit">Login</button>
                    </form>
                    {error && <div className="error">{error}</div>}
                    <p>Do you have an account? <Link to='/register/'>Create Account</Link></p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.userReducer.user,
      login: state.userReducer.login
    }
}

export default withRouter(connect(mapStateToProps)(Login));