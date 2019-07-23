import React from 'react';
import {connect} from 'react-redux';
import DatabaseTable from '../dataTable';
import { Accordion, AccordionItem } from 'react-sanfona';


class Fields extends React.Component
{
    
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
                fieldList = this.props.fields.addressField;
                break;
            default:
              //  console.log('unrecognized field ' + field + ' name in getField');
                fieldList = []; // avoid crash by iterating over nothing
                break;
        }      
        return fieldList;
    }
    
    render(){
       // console.log(this.props.fields);
        return(
            <div>
                <Accordion allowMultiple className='container-fluid'>
        {['User', 'Admin', 'Program', 'Issue', 'Response', 'Address'].map(item => {
          return (
            <AccordionItem key = {item+"-accordian"} title={`${item} List`}>
              <DatabaseTable updateList = {this.updateList.bind(this)} query={item} firebase={this.props.firebase} updateStatus={this.props.updateStatus} updateField={this.props.updateField} elements={this.getField(item.toLowerCase())}/>
            </AccordionItem>

          );
        })}
      </Accordion>
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