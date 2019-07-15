import React from 'react';
import {connect} from 'react-redux';
import {DatabaseTable} from '../dataTable';
import { Accordion, AccordionItem } from 'react-sanfona';


class Fields extends React.Component
{
    constructor()
    {
        super();
        setTimeout(this.init.bind(this), 200);
    }
    init()
    {
        this.setSearch("all");
    }
    updateList(newElement, type, clearList=false)
    {
        //updates the list, clearing it instead if clearList = true
        //TODO: change to make dynamic
        if(clearList)
        {
            this.props.clearList(type);
        }
        else
        {
            this.props.updateField("ADD"+type.toUpperCase(), newElement);
        }
    }
    getField(field)
    {
        //returns the react elements to render the list of the given field
        var fieldList;
        switch(field)
        {
            
            case "admin":
                fieldList = this.props.fields.adminField;
                break;
            case "issue":
                fieldList = this.props.fields.issueField;
                break;
            case "response":
                fieldList = this.props.fields.responseField;
                break;
            case "program":
                fieldList = this.props.fields.programField;
                break;
            case "user":
                fieldList = this.props.fields.userField;
                break;
            case "address":
                //TODO are we supporting addresses?
                fieldList = [];
                break;
            default:
              //  console.log('unrecognized field ' + field + ' name in getField');
                fieldList = []; // avoid crash by iterating over nothing
                break;
        }
        
        //const fieldItems = fieldList.map((item) => <li key ={item}>{item}</li>);
         return fieldList;
    }
    setSearch(field, event)
    {
        //sets the search value of the given field
        if(field === "all")
        {
            this.props.firebase.doSearch({type:"response", substr:window.document.getElementById("resSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
            this.props.firebase.doSearch({type:"admin", substr:window.document.getElementById("adminSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
            this.props.firebase.doSearch({type:"issue", substr:window.document.getElementById("issueSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
            this.props.firebase.doSearch({type:"user", substr:window.document.getElementById("userSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
            
            this.props.firebase.doSearch({type:"program", substr:window.document.getElementById("programSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
        
        }
        else if(field === "response")
        {
            this.props.firebase.doSearch({type:"response", substr:window.document.getElementById("resSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
        }
        else if(field === "admin")
        {
            this.props.firebase.doSearch({type:"admin", substr:window.document.getElementById("adminSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
        }
        else if(field === "issue")
        {
            this.props.firebase.doSearch({type:"issue", substr:window.document.getElementById("issueSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
        }
        else if(field === "user")
        {
            this.props.firebase.doSearch({type:"user", substr:window.document.getElementById("userSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
        }
        else if(field === "program")
        {
            this.props.firebase.doSearch({type:"program", substr:window.document.getElementById("programSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
        }
        
    }
    render(){
       // console.log(this.props.fields);
        return(
            <div>
                <br/>
                <hr/>
                <Accordion allowMultiple = {true}>
        {['User', 'Admin', 'Program', 'Issue', 'Response', 'Address'].map(item => {
          return (
            <AccordionItem key = {item} title={`${item}`} expanded = {true}>
              <DatabaseTable query = {item} firebase = {this.props.firebase} updateStatus = {this.props.updateStatus} updateField = {this.props.updateField} elements = {this.getField(item.toLowerCase())}/>
            </AccordionItem>

          );
        })}
      </Accordion>
            <div className='container-fluid' id='search-bars'>
                <h4>Admins Search</h4>
                <input className='form-control' id="adminSearchInput"type="text" placeholder="search" onChange={(event)=>{this.setSearch("admin",event)}}></input>
                <button className='btn btn-primary btn-sm' id="addAdmin" onClick={()=>{this.props.firebase.doAddAdmin("test.AdminsEmail@gmail.com", this.props.updateStatus);}}>Add an admin</button>
                <button className='btn btn-primary btn-sm' id="delAdmin" onClick={()=>{this.props.firebase.doDeleteAdmin("test.AdminsEmail@gmail.com", this.props.updateStatus);}}>Delete an admin</button>
                <br/>
                
                <hr/>
                
                <h4>Users Search</h4>
                <input className='form-control' id="userSearchInput" type="text" placeholder="search" onChange={(event)=>{this.setSearch("user",event)}}></input>
                <button className='btn btn-primary btn-sm' id="addUser" onClick={()=>{this.props.firebase.doAddUser("test.UserEmails@gmail.com", this.props.updateStatus);}}>Add an User</button>
                <button className='btn btn-primary btn-sm' id="delUser" onClick={()=>{this.props.firebase.doDeleteUser("test.UserEmails@gmail.com", this.props.updateStatus);}}>Delete an User</button>
                <br/>
                
                <hr/>

                <h4>Issue Search</h4>
                <input className='form-control' id="issueSearchInput"type="text" placeholder="search" onChange={(event)=>{this.setSearch("issue",event)}}></input>
                <button className='btn btn-primary btn-sm' id="addIssue" onClick={()=>{this.props.firebase.doAddIssue("test issue", this.props.updateStatus);}}>Add an issue</button>
                <button className='btn btn-primary btn-sm' id="delIssue" onClick={()=>{this.props.firebase.doDeleteIssue("test issue", this.props.updateStatus);}}>Delete an issue</button>
                <br/>
                
                <hr/>
                
                <h4>Response Search</h4>
                <input className='form-control' id="resSearchInput"type="text" placeholder="search" onChange={(event)=>{this.setSearch("response",event)}}></input>
                <button className='btn btn-primary btn-sm' id="addResponse" onClick={()=>{this.props.firebase.doAddHelper({type: "response", adding: "test response", statusFunc: this.props.updateStatus}, () => {this.props.updateField("ADDRESPONSE", "test response")});}}>Add a response</button>
                <button className='btn btn-primary btn-sm' id="delResponse" onClick={()=>{this.props.firebase.doDeleteHelper({type: "response", deleting: "test response", statusFunc: this.props.updateStatus}, () => {this.props.updateField("DELETERESPONSE", "test response");});}}>Delete a response</button>
                <br/>
                
                <hr/>
                
                <h4>Program Search</h4>
                <input className='form-control' id="programSearchInput"type="text" placeholder="search" onChange={(event)=>{this.setSearch("program",event)}}></input>
                <button className='btn btn-primary btn-sm' id="addProgram" onClick={()=>{this.props.firebase.doAddProgram("test program", this.props.updateStatus);}}>Add a program</button>
                <button className='btn btn-primary btn-sm' id="delProgram" onClick={()=>{this.props.firebase.doDeleteProgram("test program", this.props.updateStatus);}}>Delete a program</button>
                <br />

                <hr/>
            </div>
        </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        fields: state.fieldReducer
    }
};
const mapDispatcherToProps = (dispatch) => {
    return {
        updateStatus: (newStatus) => {dispatch({type: "UPDATESTATUS", payload: newStatus})},
        updateField: (updateType, element) => {
            dispatch({type: updateType, payload: element});
        },
        clearList: (fieldName) => {dispatch({type: "CLEARLIST", payload: fieldName});}
    }
};
export default connect(mapStateToProps, mapDispatcherToProps)(Fields);