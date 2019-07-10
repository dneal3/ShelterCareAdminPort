import React from 'react';

class SignOut extends React.Component{
    render(){
        return(
            <button id="signOutButton" onClick={()=>{this.props.firebase.doSignOut(this.props.signOutBind)}}>Sign Out</button>
        );
    }
}
export default SignOut;