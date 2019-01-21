import React, { Component } from 'react';

class VerifyCode extends Component {
    constructor(props){
        super(props);

        this.state = {
            code: ''
        }
    }
    render() {
        const {verify, error} = this.props;
        const {code} = this.state;
        return (
            <div>
                <form className="verifyCode" onSubmit={(e)=>verify(e,code)}>
                    <input type="text" value={code} onChange={(e)=>{this.setState({code: e.target.value}) }} placeholder="Insert the Code to Enroll"/>
                    <button type="submit">Enroll Me</button>
                </form>
                {error && <div className="error">{error}</div>}
            </div>
        );
    }
}

export default VerifyCode;