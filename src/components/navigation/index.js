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
    var btn = '';

    console.log(this.props);

    if(this.props.user.isAdmin) {
        ss = (
            <li className="nav-item">
                <a className="nav-link" rel="noopener noreferrer" target='_blank' href="https://docs.google.com/spreadsheets/d/1jKAy71Lb1o-dv_rnNvMlrQNqV6dxBx_UYAbNgz2Ptlk/edit?ts=5d40ce16#gid=0"> Encounters Spreadsheet </a>
            </li>
        );

        // docs link not real yet
        docs = (<li className="nav-item">
                <a className='nav-link' rel="noopener noreferrer" target='_blank' href="#"> Docs </a>
            </li>
            );
    }

    if(this.props.user.userSignedIn) {
        btn = (<FirebaseContext.Consumer>
        {
            firebase => 
                <SignOut className='btn my-2 my-sm-0' id='signOutButton' firebase = {firebase} signOutBind = {this.signOutUser.bind(this)}/>
        
        }
        </FirebaseContext.Consumer>);

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
            {btn}
            
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


