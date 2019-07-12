import React from "react";
import {connect } from 'react-redux';
import Home from '../home';
import SignIn from '../signIn';
import { FirebaseContext } from '../firebase';

class App extends React.Component
{
	constructor()
	{
		super();
		this.signInComponent = <FirebaseContext.Consumer>
		{
			firebase => 
				<SignIn firebase = {firebase} />
		
		}
	</FirebaseContext.Consumer>;
		this.toRender = this.signInComponent;
	}
	render(){
		//console.log(this.props);

		if (this.props.auth.userSignedIn){this.toRender = <Home />;}
		else {this.toRender = this.signInComponent;}
		return(
			<div>
				{this.toRender}
			</div>
		);
	}
	
}

const mapStateToProps = (state) => {
    return {
        auth: state.userAuthReducer 
    }
};
const mapDispatcherToProps = (dispatch) => {
    return {
        userSignIn: (userObj) => {dispatch({
			type: "SIGNIN",
			payload: userObj})},
    }
};
export default connect(mapStateToProps, mapDispatcherToProps)(App);
