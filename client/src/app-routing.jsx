import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './twitter/login.component';
import RegistrationComponent from './twitter/user-registration';
import UserPostsComponent from './twitter/user-posts.component'
import { Provider } from 'react-redux';
import store from './store/store-config';

const routing = (
    <Provider store={store} >
    <Router>
        <Route exact path="/" component={LoginComponent}></Route>
        <Route path="/registration" component={RegistrationComponent}></Route>
        <Route path="/userposts" component={UserPostsComponent}></Route>
    </Router>
    </Provider>

);

export default routing;