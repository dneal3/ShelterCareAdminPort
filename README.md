Dependancies:  react, react-dom, react-router, react-router-dom, redux, react-redux, react-sanfona, firebase

can install any react, redux dependancies with "npm install --save <dependancy>"
firebase can be intialized with firebase init
only need storage, hosting, and database selections from firebase, set up with hfac-sc project
when prompted to input the public directory, choose the name "build"(this allows us to do "npm build" and immediately "firebase serve" from the build directory

SUMMARY:
src/index.js 
	contains the reducers for redux, and creates the store for redux to use. These reducers contain the userAuthReducer, which handles any authentication information about a signed in user, and a fieldReducer, which handles updating/managing all fields stored in redux. 

components/account
	contains a dummy component showing how we can display info of the user, most likely will become part of the header

components/admin
	this is rendered by home only when an authenticated admin is signed in. Renders the status bar and the fields component

components/app
	Main app that is rendered, allows for navigation. This will be used to selectively render the sign in page or the home page. Currently sign in page never un-renders.

components/dataTable
	contains styling for the dataTable and dataTable code.This is everything you pushed, with slight changes to support firebase. Biggest changes: firebase is a prop given to the table, allowing it to make direct queries/modifications to the database. Also I passed in the data as a prop from the home component. This prop can be used with "this.props.elements" I used the same name as your this.elements, which is bad naming on my part, but I think we can delete this.elements and fetchInformation now that its a prop. Also, I connected adding data to an input text bar, but like your prompt idea in addInfo better. We should turn the input bars into the search bars and use prompt to input new data.

components/fieldBar
	Contains the Fields component. In the constructor, we set a time out to allow firebase to intialize, then search all of our fields for their info, this is pretty fast, so any table will have its info before a user can open the accordian. Note, when we search for an empty string, all database entries are returned, this is used to render the entire database when the user isn't searching. 
	updateList is an interface for other components to access redux reducers. getField returns the appropriate field info for any input field. setSearch calls firebase to search the desired field for the substring. 
	In render, anything after the end of the accordion is not needed. That was what I used to test everything before I had your code.

components/firebase
	app.js contains all interfacing for accessing firebase that is used in other components. We should move the config file out of this and into a seperate section(thus the keys wont be publicly known)
	doAddAdmin, doDeleteAdmin, doAddUser, doDeleteUser... are not necessary, I changed some code so we only need doAddHelper, doDeleteHelper
	checkStatus is called on intialization to see if a user is signed in. This is useful when the user reloads the page, they do not have to sign back in

components/home
	component that aids rendering each component in its proper place. Sign in/out will be moved to a different component, home will render anything displayed after the user signs in.

navigation I do not think we need. signIn/signOut are fairly straight forward. Sign in checks the status of the user, which is called on each page load. A longer timeout is needed to give firebase authentication time to be consistent.

ADDED FOR DEVELOPMENT:
each accordian item starts expanded

KNOWN BUGS:
each field name appears in the admin list on redux, but not in firebase


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
