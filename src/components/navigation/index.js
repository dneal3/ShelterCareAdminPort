import React from 'react';
import { connect } from 'react-redux';
import { FirebaseContext } from '../firebase';
import SignOut from '../signOut';



class Navbar extends React.Component {

  signOutUser(){
    this.props.userSignOut();
  }

  render() {
    // should try to add ico next to the sheltercare brand item
    var ss='';
    var docs='';

    console.log('nav props', this.props);

    if(this.props.user.isAdmin) {
        ss = (
            <li className="nav-item">
                <a className="nav-link" href="#"> Encounters Spreadsheet </a>
            </li>
        );

        docs = (<li className="nav-item">
                <a className='nav-link' href="#"> Docs </a>
            </li>
            );
    }

    return (
        <nav id='navbar-style' className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span id='comp-name' className='navbar-brand mb-0 h1'> ShelterCare Admin Portal </span>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {ss}
                    {docs}
                </ul>
            </div> 
            <FirebaseContext.Consumer>
                {
                    firebase => 
                        <SignOut className='btn my-2 my-sm-0' id='signOutButton' firebase = {firebase} signOutBind = {this.signOutUser.bind(this)}/>
                
                }
            </FirebaseContext.Consumer>
    </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);


