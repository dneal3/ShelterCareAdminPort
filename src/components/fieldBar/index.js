import React from 'react';
import {connect} from 'react-redux';
import AdminPortal, {DatabaseTable} from '../dataTable';
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
            this.props.clearList("response");
        }
        else
        {
            switch(type)
            {
                case "response" : this.props.updateField("ADDRESPONSE", newElement);
                        break;
                default:
                    break;
            }
        }
    }
    getField(field)
    {
        //returns the react elements to render the list of the given field
        var fieldList;
        switch(field)
        {
            case "address":
                //TODO are we supporting addresses?
                fieldList = [];
                break;
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
            default:
                console.log('unrecognized field ' + field + ' name in getField');
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
            /*this.props.firebase.doSearch({type:"admin", substr:window.document.getElementById("adminSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
            this.props.firebase.doSearch({type:"issue", substr:window.document.getElementById("issueSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
            this.props.firebase.doSearch({type:"user", substr:window.document.getElementById("userSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
            this.props.firebase.doSearch({type:"program", substr:window.document.getElementById("programSearchInput").value, updateListBind: this.updateList.bind(this)}, this.props.updateStatus);
        */
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
        return(
            <div>
                <div/>
                <hr/>
                <Accordion allowMultiple = {true}>
        {['User', 'Admin', 'Program', 'Issue', 'Response', 'Address'].map(item => {
          return (
            <AccordionItem key = {item} title={`${item}`}>
              <DatabaseTable query = {item} firebase = {this.props.firebase} elements = {this.getField(item.toLowerCase())}/>
            </AccordionItem>
          );
        })}
      </Accordion>
                <p>Admins</p>
                <input id="adminSearchInput"type="text" placeholder="search" onChange={(event)=>{this.setSearch("admin",event)}}></input>
                <button id="addAdmin" onClick={()=>{this.props.firebase.doAddAdmin("test.AdminsEmail@gmail.com", this.props.updateStatus);}}>Add an admin</button>
                <button id="delAdmin" onClick={()=>{this.props.firebase.doDeleteAdmin("test.AdminsEmail@gmail.com", this.props.updateStatus);}}>Delete an admin</button>
                <div/>
                <hr/>
                <p>Users</p>
                <input id="userSearchInput"type="text" placeholder="search" onChange={(event)=>{this.setSearch("user",event)}}></input>
                <button id="addUser" onClick={()=>{this.props.firebase.doAddUser("test.UserEmails@gmail.com", this.props.updateStatus);}}>Add an User</button>
                <button id="delUser" onClick={()=>{this.props.firebase.doDeleteUser("test.UserEmails@gmail.com", this.props.updateStatus);}}>Delete an User</button>
                <div/>
                <hr/>
                <p>Issues</p>
                <input id="issueSearchInput"type="text" placeholder="search" onChange={(event)=>{this.setSearch("issue",event)}}></input>
                <button id="addIssue" onClick={()=>{this.props.firebase.doAddIssue("test issue", this.props.updateStatus);}}>Add an issue</button>
                <button id="delIssue" onClick={()=>{this.props.firebase.doDeleteIssue("test issue", this.props.updateStatus);}}>Delete an issue</button>
                <div/>
                <hr/>
                <p>Responses</p>
                <input id="resSearchInput"type="text" placeholder="search" onChange={(event)=>{this.setSearch("response",event)}}></input>
                <div />
                <button id="addResponse" onClick={()=>{this.props.firebase.doAddHelper({type: "response", adding: "test response", statusFunc: this.props.updateStatus}, () => {this.props.updateField("ADDRESPONSE", "test response")});}}>Add a response</button>
                <button id="delResponse" onClick={()=>{this.props.firebase.doDeleteHelper({type: "response", deleting: "test response", statusFunc: this.props.updateStatus}, () => {this.props.updateField("DELETERESPONSE", "test response");});}}>Delete a response</button>
                <ul>
                {this.getField("response")}
                </ul>
                <div/>
                <hr/>
                <p>Programs</p>
                <input id="programSearchInput"type="text" placeholder="search" onChange={(event)=>{this.setSearch("program",event)}}></input>
                <button id="addProgram" onClick={()=>{this.props.firebase.doAddProgram("test program", this.props.updateStatus);}}>Add a program</button>
                <button id="delProgram" onClick={()=>{this.props.firebase.doDeleteProgram("test program", this.props.updateStatus);}}>Delete a program</button>
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