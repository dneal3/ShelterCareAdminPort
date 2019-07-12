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
        <button className='btn btn-info btn-sm' onClick={() => this.onExOrMin()}> {this.state.symbol} </button>
      );
    }
  
  }
  
  export class DatabaseTable extends React.Component {
    constructor(props){
      super(props);
      this.query = props.query;
      this.field = (this.props.query).toLowerCase();
      this.field_upper = (this.props.query).toUpperCase();
      this.elements = undefined;
      this.state = {
        inputVal: "",
        elements: [] //this is a list of all the elements gotten from the database in fetch information
      };
      
    }
  
    buildTable()
    {
      var els = this.props.elements.map( (item, i) => {
        return (
          <tr key={i}>
            <td key={i}> {item} </td>
            <td><button id='rem-btn' className='btn btn-danger btn-sm' onClick={() => {this.props.firebase.doDeleteHelper({type: this.field, deleting: item, statusFunc: this.props.updateStatus}, () => {this.props.updateField("DELETE"+this.field_upper, item);})}}>-</button> </td>  
          </tr>
        );} 
        ) 
  
      return (
        <div className='tables'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <td>
                  <input type="text" className='form-control' placeholder="add items here" id={"add_bar_"+this.props.query} value = {this.state.inputVal} onChange ={(event)=> {this.setState({inputVal: event.target.value})}}></input>
                  <button id='add-btn' className='btn btn-success btn-sm' onClick={()=>{
                    var toAdd = window.document.getElementById("add_bar_"+this.props.query).value;
                    console.log(toAdd);
                    if(toAdd === "")
                    {
                      this.props.updateStatus("Cannot add an empty string to the database");
                      return ;
                    }
                    this.props.firebase.doAddHelper({type: this.field, adding: toAdd, statusFunc: this.props.updateStatus}, () => {this.props.updateField("ADD"+this.field_upper, toAdd);}) }
                  }>+</button> 
                </td>
              </tr>
            </thead>
            <tbody>
              {els}
            </tbody>
          </table>
          
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