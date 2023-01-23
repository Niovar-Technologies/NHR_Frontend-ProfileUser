import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import App from './App'

import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();


const mount = (el) => {

    ReactDOM.render(
        <App history={history} />,
        el
    )
}

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#NRH_Frontend_UserProfile')
    if (devRoot) {
        mount(devRoot)
    }
}

export { mount }