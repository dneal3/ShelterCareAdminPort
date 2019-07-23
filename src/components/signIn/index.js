import React from 'react';
import {connect} from 'react-redux';
import "../../index.css";

class SignIn extends React.Component{
    constructor()
    {
        super();
        setTimeout(() =>{this.props.firebase.checkStatus(this.props.userSignIn)}, 650);
    }
    render(){
        return(
            <div className="signIn">
                <table className="signIn-table">
                    <tbody>
                    <tr>
                        <td>
                        {"If you are a ShelterCare admin, sign in by clicking the button below"}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button className="btn btn-success btn-md"  id="signIn-button" onClick={() => 
                                {this.props.firebase.doSignIn(this.props.userSignIn)}}>Sign in!</button>   
                        </td>
                    </tr>
                    </tbody>
                </table>
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
            userSignIn: (newUser, adminStatus) => {dispatch({
                type: "SIGNIN",
                payload: {email: newUser.email, userName: newUser.name, isAdmin:adminStatus}
            })}
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);