import React from 'react';
import {connect} from 'react-redux';
import {FirebaseContext} from '../firebase';
import Fields from '../fieldBar';
class Admin extends React.Component
{
    constructor()
    {
        super();
    }
    render(){
        return(     
        <div>
            <div>
                <p>
                   Page only for admins to see
                </p>
                <p id="statusInformer">{"Status: "+this.props.status}</p>
            </div>
            <FirebaseContext.Consumer>
                {
                    firebaseIn => 
                    <Fields firebase = {firebaseIn}/>
                }
            </FirebaseContext.Consumer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	//return object with key value pairs that this component can use
	// localPropName: globalStateNameFromRedux
	return {
        status: state.fieldReducer.status
	};
};
const mapDispatchToProps = (dispatch) => {
    //this function must exist to call connect, but we dont actually need it
    

    
	return {nada: (dispatch)=>{}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
