// Initialize Firebase 
import firebase from 'firebase/app'; 
import 'firebase/auth';
import 'firebase/database';
  const config = {
    apiKey: "AIzaSyDWT1HRjJ-p0jH5pjQPtWLSVuZ2xxyWIDU",
    authDomain: "hfac-sc.firebaseapp.com",
    databaseURL: "https://hfac-sc.firebaseio.com",
    projectId: "hfac-sc",
    storageBucket: "hfac-sc.appspot.com",
    messagingSenderId: "432119133740"
  };
  function parseString(inStr)
  {
    var ret = inStr.replace(/\./g, "");
    ret = ret.replace(/#/g, "");
    ret = ret.replace(/\$/g, "");
    ret = ret.replace(/\[/g, "");
    ret = ret.replace(/\]/g, "");
    return ret;
    
  }
  function findAdmin(toFind, func)
    {
      // function that finds user in the database, returning an object isAdmin
      // isAdmin is a bool that states if this account is a verified admin able to view the page
      var db = firebase.database().ref();
      const query = '/admins/'+parseString(toFind.email);
      console.log("database query: "+query);

      db.child(query).once('value').then(function(snapshot) {
        if(snapshot.exists())
        {
          func(toFind, true);
        }
        else
        {
          alert("Signed in email is not an admin, contact system admin if this is incorrect");
          firebase.auth().signOut();  
        }
      });
      return ;
    }
    
  
  class Firebase{
    constructor(){
      firebase.initializeApp(config);
      console.log("firebase intialized");
    }
    doSignIn(cleanUpFunc) {
      //signs in user if a user is not signed in already
      var a = firebase.auth();
      if(a.currentUser == null)
      {
        console.log("signing in");
        var provider = new firebase.auth.GoogleAuthProvider();
        var user = a.signInWithPopup(provider);

        user.then(function(result)
        {
          findAdmin({email:result.user.email, name:result.user.displayName}, cleanUpFunc)
        })
        //error code that warns user of potential mishaps
        .catch(function(error)
        {
         var errorCode = error.code;
         if (errorCode === "auth/popup-closed-by-user")
          {
            console.log("Sign in window closed by user before finalizing authentication");
          }
          else
          {
            alert(error);
          }
        });
      }
      else
      {
        console.log("user already signed in");
      }
    }
    doSignOut(cleanUpFunc){
      var a = firebase.auth();
      if(a.currentUser != null)
      {
        a.signOut();
        cleanUpFunc();
        console.log("signed out");
      }
    }
    doSearch(inObj, statusBind)
    // searches the database for inObj.type value for all items that contain .substr
    //    when a match is found, inObj.updateListBind(match) is called
    // Sets the status log by calling statusBind
    {
      var db = firebase.database().ref();
      var path = "/"+parseString(inObj.type)+"s/";
      db.child(path).once('value').then(function(snapshot){
        if(!snapshot.exists())
        {
          statusBind("Could not search " + inObj.type + "s as they do not exist in the database");
          return ;
        }
        inObj.updateListBind("", inObj.type, true);
        snapshot.forEach(function(secondSnap){
          const subString = inObj.substr.toLowerCase();
          const entry = ("" + secondSnap.key).toLowerCase();
          if(entry.includes(subString))
          {
            inObj.updateListBind(secondSnap.key, inObj.type);
          }
        });
        
      });
    }
    doAddHelper(refs, reduxBind = () => {})
    {
      //Attemps to add an object to the database
      //recieves an object with attributes type, adding, statusFunc, then adds these to the
      //    database to the corresponding values
      var db = firebase.database().ref();
      const parsedStr = parseString(refs.adding);
      const query = '/'+refs.type+'s/'+parsedStr;

      db.child(query).once('value').then(function(snapshot) {
        if(snapshot.exists())
        {
          refs.statusFunc("Failed to add "+ refs.type+" " + refs.adding +"\n REASON: "+ refs.type+" already exists in database");
        }
        else
        {
          var updates = {};
          updates[query] = true;
          db.update(updates);
          reduxBind();
          refs.statusFunc("Successfully added "+ refs.type+" " + refs.adding);
          return ;
        }
      })
      .catch(function(error) {
        alert("An error occurred: ", error);
        refs.statusFunc("Failed to add "+ refs.type+" " + refs.adding + " REASON: " +error);
      });
    }
    doDeleteHelper(refs, reduxBind = () => {})
    {
      //Attemps to delete an user to the database
      var db = firebase.database().ref();
      const parsedStr = parseString(refs.deleting);
      const query = '/'+refs.type+'s/'+parsedStr;

      db.child(query).once('value').then(function(snapshot) {
        if(snapshot.exists())
        {
          var confirmStr = "are you sure you want to delete the "+refs.type+ " "+ refs.deleting + "?";
          if(window.confirm(confirmStr))
          {
            db.child(query).remove();
            reduxBind();
            refs.statusFunc("Successfully deleted "+refs.type+ " "+ refs.deleting);
          }
          else
          {
            refs.statusFunc("Deletion of "+refs.type+ " "+ refs.deleting +" aborted by user");
          }
          return ;
        }
        else
        {
          alert("This "+refs.type+ " does not exist in the database");
          refs.statusFunc(refs.type+ " " + refs.deleting +" does not exist in database");
        }
      })
      .catch(function(error) {
        alert("An error occurred: ", error);
        refs.statusFunc("Failed to delete "+refs.type+ " "+ refs.deleting+"/n REASON: " +error);
      });
    }
    doAddAdmin(adminToAdd, statusBind)
    {
      //Attemps to add an admin to the database
      var obj = {
        type: "admin",
        adding: adminToAdd,
        statusFunc: statusBind
      };
      this.doAddHelper(obj);
    }
    doDeleteAdmin(adminToDel, statusBind)
    {
      //Attemps to delete an admin to the database
      var obj = {
        type: "admin",
        deleting: adminToDel,
        statusFunc: statusBind
      };
      this.doDeleteHelper(obj);
    }
    doAddUser(userToAdd, statusBind)
    {
      var obj = {
        type: "user",
        adding: userToAdd,
        statusFunc: statusBind
      };
      this.doAddHelper(obj);
    }
    doDeleteUser(userToDel, statusBind)
    {
      var obj = {
        type: "user",
        deleting: userToDel,
        statusFunc: statusBind
      };
      this.doDeleteHelper(obj);
    }
    doAddResponse(responseToAdd, statusBind)
    {
      var obj = {
        type: "response",
        adding: responseToAdd,
        statusFunc: statusBind
      };
      this.doAddHelper(obj);
    }
    doDeleteResponse(responseToDel, statusBind)
    {
      var obj = {
        type: "response",
        deleting: responseToDel,
        statusFunc: statusBind
      };
      this.doDeleteHelper(obj);
    }
    doAddIssue(issueToAdd, statusBind)
    {
      var obj = {
        type: "issue",
        adding: issueToAdd,
        statusFunc: statusBind
      };
      this.doAddHelper(obj);
    }
    doDeleteIssue(issueToDel, statusBind)
    {
      var obj = {
        type: "issue",
        deleting: issueToDel,
        statusFunc: statusBind
      };
      this.doDeleteHelper(obj);
    }
    doAddProgram(programToAdd, statusBind)
    {
      var obj = {
        type: "program",
        adding: programToAdd,
        statusFunc: statusBind
      };
      this.doAddHelper(obj);
    }
    doDeleteProgram(programToDel, statusBind)
    {
      var obj = {
        type: "program",
        deleting: programToDel,
        statusFunc: statusBind
      };
      this.doDeleteHelper(obj);
    }
    checkStatus(signInFunc){
      var a = firebase.auth();
      if(a.currentUser != null)
      {
        console.log("CheckStatus says: user signed in");
        signInFunc({email: a.currentUser.email, name:a.currentUser.displayName},true)
      }
      else
      {
        console.log("CheckStatus says: no user signed in");
      }
    }
    test()
    {
      console.log("working");
    }
  }

  export default Firebase;
