import React from 'react';
import { connect } from 'react-redux';
import { FirebaseContext } from '../firebase';
import SignOut from '../signOut';



class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  signOutUser(){
    this.props.userSignOut();
  }

  render() {
    // should try to add ico next to the sheltercare brand item

    return (
      <nav className="navbar navbar-default">
        <div className='container-fluid'>
            <div className='navbar-header'>
                <ul className='nav navbar-nav'>
                    <li> <h4 id='comp-name' className="navbar-brand"> ShelterCare Admin Portal </h4> </li>
                    <li> <h10>{"Hello " + this.props.user.userName}</h10> </li>
                </ul>
            
            </div>
            <FirebaseContext.Consumer>
                {
                    firebase => 
                        <SignOut firebase = {firebase} signOutBind = {this.signOutUser.bind(this)}/>
                
                }
            </FirebaseContext.Consumer>
        </div>
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


