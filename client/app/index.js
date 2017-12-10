import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, Route, IndexRedirect, browserHistory } from 'react-router';

import Search from './views/Search';
import Login from './views/Login';
import Room from './views/Room';

import './../../node_modules/semantic-ui-css/semantic.min.css';


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/">
            <IndexRedirect to="/login" />
            <Route path="login" component={Login}> </Route>
            <Route path="search" component={Search}> </Route>
            <Route path="book" component={Room}> </Route>
        </Route>
    </Router>,
    document.getElementById('root')
);