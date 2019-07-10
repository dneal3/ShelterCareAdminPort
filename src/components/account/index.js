import React from 'react';

class Account extends React.Component{
    render()
    {
        return(
            <div>
                <div> 
                    page for any signed in user to see
                    <div></div>
                    Your name is {this.props.userName}
                    <div></div>
                    Your email is {this.props.userEmail}
                </div>
            </div>
        );
    }
}

export default Account;