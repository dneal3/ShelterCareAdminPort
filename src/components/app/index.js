import React from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from '../navigation';
import Home from '../home';
import SignIn from '../signIn';

const LANDING = '/';
const SIGN_IN = '/signin';
const HOME = '/home';
const ADMIN = '/admin';

const App = () => (
	<div>
		<Router>
			<Navigation/>
			<Route path={LANDING} component={Home}></Route>
			<Route path={HOME} ></Route>
			
		</Router>
		<h1>App</h1>
	</div>
);

export default App;
