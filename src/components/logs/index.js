import React from 'react';
import {connect} from 'react-redux';

class Logs extends React.Component {
constructor(props) {
    super(props);
    this.state= {};
}

    render(){
        return(     
            <div id='logging'>
                <div className='logging-tables'>
                    <span> {'Hello ' + this.props.user.userName + '!'} </span> 
                </div>
                <div className='logging-tables'>
                    <span  id="statusInformer"> {"Status: "+this.props.status} </span>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
