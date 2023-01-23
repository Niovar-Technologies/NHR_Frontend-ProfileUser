import React from 'react';
import { Route, Switch, Router, Link } from "react-router-dom"

import "./static/css/bootstrap.min.css"
import "./static/css/bootstrap-datetimepicker.min.css"
import "./static/css/select2.min.css"
import "./static/css/style.css"

// import TalonPaie from "./Components/TalonPaie";
import UserProfile from "./Components/UserProfile";

const Hello = () => (<div>Hello Niovar!</div>)

import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

function App() {
	return (
		<Router history={history}>
			<UserProfile />
        </Router>
    );
}

export default App;

