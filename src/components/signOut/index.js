import React from 'react';

class SignOut extends React.Component{
    render(){
        return(
            <button className="btn btn-danger btn-md" id="signOutButton" onClick={()=>{this.props.firebase.doSignOut(this.props.signOutBind)}}>Sign Out</button>
        );
    }
}
export default SignOut;