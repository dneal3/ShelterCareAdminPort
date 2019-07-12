import React from 'react';
import {connect} from 'react-redux';
import { timeout } from 'q';

class SignIn extends React.Component{
    constructor()
    {
        super();
        setTimeout(() =>{this.props.firebase.checkStatus(this.props.signInBind)}, 650);
    }
    render(){
        timeout();
        return(
            <div>
                <button className="btn btn-success btn-md"  id="signIn" onClick={() => {this.props.firebase.doSignIn(this.props.signInBind)}}>Sign in!</button>
            </div>
        );
    }
}

export default SignIn;