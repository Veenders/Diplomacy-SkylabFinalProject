import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

import AuthService from '../../../Services/AuthService/index.js';
import DBService from '../../../Services/DBService';
import FileService from '../../../Services/FileService'

import './index.scss';
import logo from '../../../img/Logo.png';

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            repassword: '',
            name: '',
            lastname: '',
            birthdate: '',
            error: '',
            image:'',
            viewpassword: false,
        }
        this.fileInputRef = React.createRef();
        this.AuthObserver = null;
    }
    async componentDidMount(){
        this.AuthObserver = AuthService.registerAuthObserver((user) => {
            if(!user) return; 
            const { uid } = user;
            const { email, name, lastname, birthdate, image } = this.state;
            const newUser = {uid, email, name, lastname, birthdate, image, rol: 1}
            const success = DBService.setDocumentWithId('users', newUser, uid)
            success && this.props.history.push('/')
        })
        
    }
    onFileSelected = (e) => {
        const file = e.target.files[0];
        FileService.uploadFile('images/profiles',file, (imageURL) => {
          this.setState({image: imageURL});
        });
      }
    createAccount = async (e) =>{
        e.preventDefault();
        const {email, password, repassword, name, lastname, birthdate} = this.state;
        let error = '';
        // eslint-disable-next-line no-useless-escape
        const regemail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regemail.test(email)){error = 'Email is not valid '}
        if(password!==repassword){error += 'Password is not equal '}
        if(name === ''){error += 'You must write a name '};
        if(lastname === ''){error += 'You must write a lastname '};
        if(birthdate === ''){error += 'You must write a birthdate '};
        if (error === ''){
            const result = await AuthService.registerUser(email, password);
            this.setState({error:result})
        }
        this.setState({error});
    }
    componentWillUnmount(){
        this.AuthObserver();
    }
    render() {
        const {email, password, repassword, name, lastname, birthdate, error, viewpassword, image} = this.state;
        return (
            <main>
                <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                <div className="register">
                    <div className="modal">
                        <h1>Register</h1>
                        <form className="form" onSubmit={this.createAccount}>
                            <input type="email"    value={email} onChange={(e)=>{this.setState({email: e.target.value}) }} placeholder="Email"/>
                            <div className="field">
                                <input type={!viewpassword?'password':'text'} value={password} onChange={(e)=>{this.setState({password: e.target.value}) }} placeholder="Password"/>
                                <button type="button" onClick={()=>this.setState({viewpassword:!viewpassword})}>{!viewpassword?<i className="far fa-eye"></i>:<i className="far fa-eye-slash"></i>}</button>
                            </div>
                            <input type={!viewpassword?'password':'text'} value={repassword} onChange={(e)=>{this.setState({repassword: e.target.value}) }} placeholder="Repeat Password"/>
                            <input type="text"     value={name} onChange={(e)=>{this.setState({name: e.target.value}) }} placeholder="Name"/>
                            <input type="text"     value={lastname} onChange={(e)=>{this.setState({lastname: e.target.value}) }} placeholder="Lastname"/>
                            <input type="date"     value={birthdate} onChange={(e)=>{this.setState({birthdate: e.target.value}) }} placeholder="Birthdate"/>
                            <div className="field">
                                <input type="file" onChange={(e) => { this.onFileSelected(e) }} ref={(ref) => {this.fileInputRef = ref}}/>
                                {image && <img src={image} alt="Profile" />}
                            </div>
                            <input type="submit" value="Crear cuenta" />
                        </form>
                        <p>{error}</p>
                        <p>Ya tienes cuenta? <Link to='/login/'>Entrar</Link></p>
                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(Register);