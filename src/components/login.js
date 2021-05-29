import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// components

const Login = () => {
    //state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // login
    const login = localStorage.user_login;

    const isLogin = () => {
        if (login) window.location = '/app';
        else console.log("User doesn't logged in");
    };

    // function that will execute when form is submitted
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch('https://fourpairstodoappserver.herokuapp.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            // get the response data
            const data = await response.json();

            // if login === false show error message, else redirect to /app
            if (data.login === false) toast.error(data.message);
            else {
                Promise.resolve()
                    .then(() => {
                        toast.success('Logged in successfully!');
                        localStorage.setItem('user_id', data.id);
                        localStorage.setItem('user_login', data.login);
                        return Promise.resolve();
                    })
                    .then(() => {
                        setTimeout(() => {
                            window.location = '/app';
                        }, 2000);
                    });
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        isLogin();
    }, []);

    return (
        <Fragment>
            <div className="container text-center mt-5">
                <h1 className="display-5">Login</h1>
                <form onSubmit={onSubmitForm}>
                    <input
                        className="form-control my-4"
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        type="email"
                        name="email"
                        placeholder="Email:"
                    />
                    <input
                        className="form-control my-4"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        required
                        type="password"
                        name="password"
                        placeholder="Password:"
                    />
                    <button className="btn btn-success w-100">Login</button>
                    <div className="container mt-4">
                        <span className="txt1">Don’t have an account? &nbsp;</span>
                        <a className="mt-4" href="/register">
                            Register
                        </a>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default Login;
