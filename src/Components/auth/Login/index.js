import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

import AuthService from '../../../Services/AuthService';
import './index.scss';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '' 
        }
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
        return (
            <div className="login">
                <div className="modal">
                    <h2>Login</h2>
                    <form className="login" onSubmit={this.login}>
                        <input type="email"    value={email} onChange={(e)=>{this.setState({email: e.target.value}) }} placeholder="Email"/>
                        <input type="password" value={password} onChange={(e)=>{this.setState({password: e.target.value}) }} placeholder="Password"/>
                        <button type="submit">Login</button>
                    </form>
                    <div className="error">
                        {error && <p>{error}</p>}
                    </div>
                    <p>No tienes cuenta? <Link to='/SignUp/'>Crear cuenta</Link></p>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);