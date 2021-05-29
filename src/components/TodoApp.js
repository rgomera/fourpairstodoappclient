//import modules
import React, { Fragment, useEffect, useState } from 'react';
import '../App.css';

import { toast } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

//components
import InputTodo from './InputTodo';
import ListTodos from './ListTodos';

function TodoApp() {
    // state
    const [name, setName] = useState('');
    const [upublic, setUpublic] = useState(0);
    const [uprivate, setUprivate] = useState(0);

    // login
    const login = localStorage.user_login;

    const isLogin = () => {
        if (login) console.log('Logged in');
        else window.location = '/login';
    };

    // the name and set the setName
    const getName = async () => {
        // get the id from localstorage
        const id = localStorage.user_id;
        try {
            const response = await fetch(`https://fourpairstodoappserver.herokuapp.com/users/${id}`);
            const data = await response.json();

            setName(data.name);
        } catch (err) {
            console.error(err.message);
        }
    };

    // get count of all public unfinish todos
    const getCountUpublic = async () => {
        try {
            const response = await fetch('https://fourpairstodoappserver.herokuapp.com/todos/count_publictodos/');
            const data = await response.json();

            setUpublic(data.unfinish_public);
        } catch (err) {
            console.error(err.message);
        }
    };

    // get count of all private todos base on spific user
    const getCountUprivate = async () => {
        try {
            // get the id from localstorage
            const id = localStorage.user_id;

            const response = await fetch(`https://fourpairstodoappserver.herokuapp.com/todos/count_privatetodos/${id}`);
            const data = await response.json();

            setUprivate(data.unfinish_private);
        } catch (err) {
            console.error(err.message);
        }
    };

    // logout function that will clear the localstorage
    const logout = () => {
        Promise.resolve()
            .then(() => {
                toast.success('Logged out successfully!');
                return Promise.resolve();
            })
            .then(() => {
                setTimeout(() => {
                    localStorage.clear();
                    window.location = '/app';
                }, 2000);
            });
    };

    useEffect(() => {
        getCountUpublic();
        getCountUprivate();
        getName();
        isLogin();
    }, []);

    return (
        <Router>
            <Fragment>
                <div className="container">
                    <div className="container">
                        <h4 className="mt-5 text-right">User: {name}</h4>
                        <button className="btn btn-danger" onClick={logout}>
                            Logout
                        </button>
                        <div className="my-3">
                            <h6>In Progress Todos: </h6>
                            <span type="button" className="btn btn-warning">
                                public <span className="badge bg-danger">{upublic}</span>
                            </span>
                            <span type="button" className="btn ms-3 btn-warning">
                                private <span className="badge bg-danger">{uprivate}</span>
                            </span>
                        </div>
                    </div>
                    <InputTodo />
                    <ListTodos />
                </div>
            </Fragment>
        </Router>
    );
}

export default TodoApp;
