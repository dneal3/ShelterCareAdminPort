import React from 'react';
import './App.css';

class CreateTables extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        userinfo: undefined,
        admininfo: undefined,
        responseinfo: undefined,
        programinfo: undefined,
        issuesinfo: undefined,
        addressinfo: undefined
      };
      this.startcategories = props.categories;
    }
  
    getDBTable(q){
      // i am 100% sure there is a better way to do this
      var infostem = q+'info';
      var newinfo = (<DatabaseTable query={q} />);
      switch(infostem){
        case 'Usersinfo':
          if(this.state.userinfo !== undefined){
            this.setState({
              userinfo: undefined
            });
          }
          else {
            this.setState({
              userinfo: newinfo
            });
          }
          break;
        case 'Adminsinfo':
          if(this.state.admininfo !== undefined) {
            this.setState({
              admininfo: undefined
            });
          }
          else{
            this.setState({
              admininfo: newinfo
            });
          }
          break;
        case 'Responsesinfo':
          if(this.state.responseinfo !== undefined) {
            this.setState({
              responseinfo: undefined
            });
          }
          else {
            this.setState({
              responseinfo: newinfo
            });
          }
          break;
        case 'Programsinfo':
          if(this.state.programinfo !== undefined){
            this.setState({
              programinfo: undefined
            });
          }
          else {
            this.setState({
              programinfo: newinfo
            });
          }
          break;
        case 'Common Issuesinfo':
          if(this.state.issuesinfo !== undefined){
            this.setState({
              issuesinfo: undefined
            });
          }
          else{
            this.setState({
              issuesinfo: newinfo
            });
          }
          break;
        case 'Addressesinfo':
          if(this.state.addressesinfo !== undefined){
            this.setState({
              addressesinfo: undefined
            });
          }
          else {
            this.setState({
              addressesinfo: newinfo
            });
          }
          break;
        default:
          break;
      }
  
    }
  
    stateHelper(item) {
      switch(item){
        case 'Users':
          return this.state.userinfo;
        case 'Admins':
          return this.state.admininfo;
        case 'Responses':
          return this.state.responseinfo;
        case 'Programs':
          return this.state.programinfo;
        case 'Common Issues':
          return this.state.issuesinfo;
        case 'Addresses':
          return this.state.addressesinfo;
        default:
          break;
      }
  
    }
  
    render() {
      return (
        <div>
          {this.startcategories.map(item => {
            return (
              <div key={item}>
                <label> {item} </label> <ExpandMinimizeButton onClickFunction={() => this.getDBTable(item) } symbol="Expand" /><br /> <br />
                {this.stateHelper(item)}
              </div>
            );
          })}
      </div> );
    }
  }
  
  class ExpandMinimizeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        symbol: props.symbol
      };
    }
  
    onExOrMin(){
      this.props.onClickFunction();
      if(this.state.symbol === "Expand") {
        this.setState({
          symbol: "Minimize"
        })
      }
      else {
        this.setState({
          symbol: "Expand"
        })
      }
    }
  
    render () {
      return (
        <button onClick={() => this.onExOrMin()}> {this.state.symbol} </button>
      );
    }
  
  }
  
  export class DatabaseTable extends React.Component {
    constructor(props){
      super(props);
      this.query = props.query;
      this.elements = undefined;
      this.state = {
        elements: [] //this is a list of all the elements gotten from the database in fetch information
      };
      
    }
  
    fetchInformation(query){
      // get the info from firebase 
      // fetch information into a list
      var els = ["daniel.loyd19@gmail.com", "test.email@gmail.com"]
      //maybe make a state of emails and the map that to a table, store it in state and have a button that removes that string
      this.elements = this.props.elements;
    }
  
    removeInfo(item){       // todo, remove item directly from redux and firebase
      //remove stuff from the elements list and database
  
      this.elements.splice(this.elements.indexOf(item), 1);
      this.setState({
        elements: this.elements
      })
    }
  
    addInfo() {             //todo, add item to firebase and redux
      //need to ask for user input or something
      //then add that to the elements list, and the database
  
      var item = prompt("Enter Email");
      this.elements.push(item);
      this.setState({
        elements: this.elements
      })
    }
  
    buildTable()
    {
      if(this.elements === undefined){
        this.fetchInformation(this.query);
      }
  
      var els = this.props.elements.map( (item, i) => {
        return (
          <tr key={i}>
            <td key={i}> {item} <button onClick={() => this.removeInfo(item)}>-</button> </td>
            
          </tr>
        );} 
        ) 
  
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {els}
            </tbody>
          </table>
          <button onClick={() => this.addInfo()}>+</button> 
        </div>
      )
    }
  
    render () {
      return (
        this.buildTable()
      );
    }
  }
  
  const AdminPortal = () => (
    <div>
      <h1> Admin Portal Test </h1>
      <CreateTables categories={['Users', 'Admins', 'Programs', 'Common Issues', 'Responses', 'Addresses']} />
    </div>
  );
  
export default AdminPortal;