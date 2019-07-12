import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from "redux";
import {Provider} from "react-redux"
import './index.css';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import Firebase, {FirebaseContext} from './components/firebase';

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
                            status: "no action taken"
                            };
const fieldReducer = (state=initialFieldState, action) => {
    var newState = {...state};
    var length;
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
                    break;
                case "admin":
                    newState.adminField = emptyList;
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
            var admins = [...state.adminField];
            admins.push(action.payload);
            admins.sort();
            newState.adminField = admins;
            break;
        case "DELETEADMIN":
            var admins = [...state.adminField];
            var i = 0;
            length = admins.length;
            for(i; i<length; i++)
            {
                if(admins[i] === action.payload){break;}
            }
            admins.splice(i, 1);
            newState.adminField = admins;
            break;
        case "ADDISSUE":
            var issues = [...state.issueField];
            issues.push(action.payload);
            issues.sort();
            newState.issueField = issues;
            break;
        case "DELETEISSUE":
            var issues = [...state.issueField];
            var i = 0;
            length = issues.length;
            for(i; i<length; i++)
            {
                if(issues[i] === action.payload){break;}
            }
            issues.splice(i, 1);
            newState.issueField = issues;
            break;
        case "ADDRESPONSE":
            var responses = [...state.responseField];
            responses.push(action.payload);
            responses.sort();
            newState.responseField = responses;
            break;
        case "DELETERESPONSE":
            var responses = [...state.responseField];
            var i = 0;
            length = responses.length;
            for(i; i<length; i++)
            {
               if(responses[i] === action.payload){break;}
            }
            responses.splice(i, 1);
            newState.responseField = responses;
            break;
        case "ADDPROGRAM":
            var programs = [...state.programField];
            programs.push(action.payload);
            programs.sort();
            newState.programField = programs;
            break;
        case "DELETEPROGRAM":
            var programs = [...state.programField];
            var i = 0;
            length = programs.length;
            for(i; i<length; i++)
            {
                if(programs[i] === action.payload){break;}
            }
            programs.splice(i, 1);
            newState.programField = programs;
            break;
        case "ADDUSER":
            var users = [...state.userField];
            users.push(action.payload);
            users.sort();
            newState.userField = users;
            break;
        case "DELETEUSER":
            var users = [...state.userField];
            var i = 0;
            length = users.length;
            for(i; i<length; i++)
            {
                if(users[i] === action.payload){break;}
            }
            users.splice(i, 1);
            newState.userField = users;
            break;
        case "ADDADDRESS":
            console.log("Addresses?");
            break;
        case "DELETEADDRESS":
            console.log("Addresses?");
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
