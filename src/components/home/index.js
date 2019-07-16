import React from 'react';
import { connect } from 'react-redux';
import { FirebaseContext } from '../firebase';
import SignOut from '../signOut';
import Admin from '../admin';
import Account from '../account';


class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            userSignedIn: false,
            user: "",
            userName: "",
            isAdmin: false
        };
    }
    signOutUser(){
        this.props.userSignOut();
    }
    render(){
        var adminPage = ""
        var accountPage = ""
        if(this.props.user.userSignedIn)
        {
            accountPage = <Account userName = {this.props.user.userName} userEmail={this.props.user.email}></Account>
        }
        if(this.props.user.isAdmin)
        {
            adminPage = <Admin />
        }
        return (
            <div>
                {accountPage}
                {adminPage}
            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
	//return object with key value pairs that this component can use
	// localPropName: globalStateNameFromRedux
	return {
        user: state.userAuthReducer
	};
};
const mapDispatchToProps = (dispatch) => {
	//return object with key value pairs that this component can use
	// localPropName: function that will call redux store dispatch
	return {
            userSignOut: () => {dispatch({
                type: "SIGNOUT"
            });
        }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);