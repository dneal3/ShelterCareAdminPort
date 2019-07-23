import React from 'react';
import { connect } from 'react-redux';
import Logs from '../logs';
import Fields from '../fieldBar';
import { FirebaseContext } from '../firebase';


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
        var dbtables  = undefined;
        var logs = undefined;

        
        
        if(this.props.user.isAdmin)
        {
            dbtables = 
                (<FirebaseContext.Consumer>
                    {
                        firebaseIn => 
                        <Fields firebase = {firebaseIn}/>
                    }
                </FirebaseContext.Consumer> );
            logs = <Logs user={this.props.user} />

        }
        
        return (
            <div>
                {logs}
                {dbtables}
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