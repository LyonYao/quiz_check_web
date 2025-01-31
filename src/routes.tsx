import React from 'react'
import { Router, Route, RouterProps } from 'react-router'

import App from './App'
import Home from './components/Home' 

const Routes = (props: React.JSX.IntrinsicAttributes & RouterProps) => (
    <Router {...props}>
        <Route path="/" Component={App}> 
        <Route path="/home" Component={Home} /> 
        </Route>
    </Router>
);

export default Routes