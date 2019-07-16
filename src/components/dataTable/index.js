import React from 'react';
import './App.css';
import {emptyMsg} from '../../constants/emptyMessages';
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
      setTimeout(this.init.bind(this), 200);
    }
    init()
    {
        this.setSearch(this.field);
    }
    setSearch(field, event)
    {
        this.props.firebase.doSearch({type:this.field, substr:window.document.getElementById(this.field+"SearchInput").value, updateListBind: this.props.updateList}, this.props.updateStatus);
    }
    
    addFiller()
    {
      if(this.props.elements.length === 0)
      {
        this.props.updateList(emptyMsg, this.field);
        //console.log(this.props);
        //console.log(this.field);
      }
    }
    addButtonClick()
    {
      const input = window.document.getElementById(this.field+"SearchInput");
      const toAdd = input.value;
      if(toAdd === "")
      {
        this.props.updateStatus("Cannot add an empty string to the database");
        return ;
      }
      this.props.firebase.doAddHelper({type: this.field, adding: toAdd, statusFunc: this.props.updateStatus}, () => {this.props.updateField("ADD"+this.field_upper, toAdd);});
      input.value = "";
      setTimeout( ()=>{
        this.props.firebase.doSearch({type:this.field, substr: "", updateListBind: this.props.updateList}, this.props.updateStatus);
      },180);
    }
    buildTable()
    {
      var els = this.props.elements.map( (item, i) => {
        var button = "";
        if(item !== emptyMsg)
        {
          button = <button id='rem-btn' className='btn btn-danger btn-sm' onClick={() => {this.props.firebase.doDeleteHelper({type: this.field, deleting: item, statusFunc: this.props.updateStatus}, () => {this.props.updateField("DELETE"+this.field_upper, item);})}}>-</button>  
        }
        else 
        {
          button = <button id='add-btn' className='btn btn-success btn-sm' onClick={()=>{
              this.addButtonClick();
            }
          }>Add now</button> 
        }
        return (
          <tr key={i}>
            <td key={i}> {item} </td>
            <td>{button}</td>
          </tr>
        );} 
        ) 
  
      return (
        <div className='tables'>
          <table className='table'>
            <thead>
              <tr>
                <td>
                  <input className='form-control' id={this.field+"SearchInput"} type="text" placeholder="search" onChange={(event)=>{this.setSearch(this.field,event)}}></input>
                </td>
                <td>
                  <button id='add-btn' className='btn btn-success btn-sm' onClick={()=>{
                      this.addButtonClick();
                    }
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
      //console.log(this.props.elements);
      setTimeout(this.addFiller.bind(this), 1);
      //this.addFiller();
      return (
        this.buildTable()
      );
    }
  }
  
export default DatabaseTable;