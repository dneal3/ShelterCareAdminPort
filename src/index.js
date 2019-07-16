import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from "redux";
import {Provider} from "react-redux"
import './index.css';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import Firebase, {FirebaseContext} from './components/firebase';
import {emptyMsg} from './constants/emptyMessages';

const initialState = {userSignedIn: false,
    email: "",
    userName: ""};
const userAuthReducer = (state=initialState, action) => {
    //state takes in an intial state at program intialization, all other calls will have a state input
    var newState = {...state};

    switch(action.type)
    {
        case "SIGNIN":
            newState.email = action.payload.email;
            newState.userName = action.payload.userName;
            newState.userSignedIn = true;
            newState.isAdmin = action.payload.isAdmin;
            break;
        case "SIGNOUT":
            newState.userSignedIn = false;
            newState.isAdmin = false;
            newState.email = "";
            newState.userName = "";
            break;
        default:
            //console.log("error in userAuthReducer, unknown action type: ", action.type);
            break;
    }
    return newState;
};
const initialFieldState = {responseField: [],
                            issueField: [],
                            userField: [],
                            adminField: [],
                            programField: [],
                            addressField: [],
                            status: "no action taken"
                            };
function freshen(listIn)
{
    // removes no entries message from the list
    if(listIn.length === 1 && listIn[0] === emptyMsg )
    {
        console.log("popping from: ", listIn);
        listIn.pop();
    }
}
const fieldReducer = (state=initialFieldState, action) => {
    var newState = {...state};
    var length, i;
    var newList = [];
    switch(action.type)
    {
        case "UPDATESTATUS":
            newState.status = action.payload;
            break;
        case "CLEARLIST":
            var emptyList = [];
            switch (action.payload)
            {
                case "all":
                    newState = initialFieldState;
                    newState.status = state.status;
                    break;
                case "admin":
                    newState.adminField = emptyList;
                    break;
                case "address":
                    newState.addressField = emptyList;
                    break;
                case "issue":
                    newState.issueField = emptyList;
                    break;
                case "program":
                    newState.programField = emptyList;
                    break;
                case "response":
                    newState.responseField = emptyList;
                    break;
                case "user":
                    newState.userField = emptyList;
                    break;
                default:
                    //console.log("unrecognized field name in reducer");
                    break;
            }
            break;
        case "ADDADMIN":
            newList = [...state.adminField];
            freshen(newList);
            newList.push(action.payload);
            newList.sort();
            newState.adminField = newList;
            break;
        case "DELETEADMIN":
            newList = [...state.adminField];
            i = 0;
            length = newList.length;
            for(i; i<length; i++)
            {
                if(newList[i] === action.payload){break;}
            }
            newList.splice(i, 1);
            newState.adminField = newList;
            break;
        case "ADDADDRESS":
            newList = [...state.addressField];
            freshen(newList);
            newList.push(action.payload);
            newList.sort();
            newState.addressField = newList;
            break;
        case "DELETEADDRESS":
            newList = [...state.addressField];
            i = 0;
            length = newList.length;
            for(i; i<length; i++)
            {
                if(newList[i] === action.payload){break;}
            }
            newList.splice(i, 1);
            newState.addressField = newList;
            break;
        case "ADDISSUE":
            newList = [...state.issueField];
            freshen(newList);
            newList.push(action.payload);
            newList.sort();
            newState.issueField = newList;
            break;
        case "DELETEISSUE":
            newList = [...state.issueField];
            i = 0;
            length = newList.length;
            for(i; i<length; i++)
            {
                if(newList[i] === action.payload){break;}
            }
            newList.splice(i, 1);
            newState.issueField = newList;
            break;
        case "ADDRESPONSE":
            newList = [...state.responseField];
            freshen(newList);
            newList.push(action.payload);
            newList.sort();
            newState.responseField = newList;
            break;
        case "DELETERESPONSE":
            newList = [...state.responseField];
            i = 0;
            length = newList.length;
            for(i; i<length; i++)
            {
               if(newList[i] === action.payload){break;}
            }
            newList.splice(i, 1);
            newState.responseField = newList;
            break;
        case "ADDPROGRAM":
            newList = [...state.programField];
            freshen(newList);
            newList.push(action.payload);
            newList.sort();
            newState.programField = newList;
            break;
        case "DELETEPROGRAM":
            newList = [...state.programField];
            i = 0;
            length = newList.length;
            for(i; i<length; i++)
            {
                if(newList[i] === action.payload){break;}
            }
            newList.splice(i, 1);
            newState.programField = newList;
            break;
        case "ADDUSER":
            newList = [...state.userField];
            freshen(newList);

            newList.push(action.payload);
            newList.sort();
            newState.userField = newList;
            break;
        case "DELETEUSER":
            newList = [...state.userField];
            i = 0;
            length = newList.length;
            for(i; i<length; i++)
            {
                if(newList[i] === action.payload){break;}
            }
            newList.splice(i, 1);
            newState.userField = newList;
            break;
        default:
            break;
    }
    return newState;
};

const store = createStore(combineReducers({userAuthReducer, fieldReducer}));
//store.subscribe(()=>{console.log(store.getState())});

ReactDOM.render(
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <App />
        </FirebaseContext.Provider>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
