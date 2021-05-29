//import modules
import React, { Fragment, useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import TodoApp from './components/TodoApp';
import Login from './components/login';
import Register from './components/register';

toast.configure();

function App() {
    return (
        <Router>
            <Fragment>
                <div className="container">
                    <Switch>
                        <Route exact path="/login" render={() => <Login />} />
                        <Route exact path="/register" render={() => <Register />} />
                        <Route exact path="/app" render={() => <TodoApp />} />
                    </Switch>
                </div>
            </Fragment>
        </Router>
    );
}

export default App;
