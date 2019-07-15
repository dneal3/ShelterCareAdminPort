import React from 'react';

class Account extends React.Component{
    render()
    {
        return(
            <div className='container-fluid'>
                <div className='tables'> 
                    <p>Page for any signed in user to see</p>
                    <hr/>
                    <p>Your name is {this.props.userName}</p>
                    <hr/>
                    <p>Your email is {this.props.userEmail}</p>  
                </div>
            </div>
        );
    }
}

export default Account;