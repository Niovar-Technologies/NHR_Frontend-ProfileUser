import React from 'react';
import { Route, Switch, Router, Link } from "react-router-dom"

import "./static/css/bootstrap.min.css"
import "./static/css/bootstrap-datetimepicker.min.css"
import "./static/css/select2.min.css"
import "./static/css/style.css"

// import TalonPaie from "./Components/TalonPaie";
import ProfileUser from "./Components/ProfileUser";

const Hello = () => (<div>Hello Niovar!</div>)

import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

function App() {
    return (
		<Router history={history}>
			<Route exact path='/profile' component={ProfileUser} />
        </Router>
    );
}

export default App;

