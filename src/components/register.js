import React, { Fragment, useState } from 'react';
import { toast } from 'react-toastify';

const Register = () => {
    //states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // function that will execute when form is submitted
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { name, email, password };
            const response = await fetch('https://fourpairstodoappserver.herokuapp.com/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            // get response data
            const data = await response.json();
            console.log(data);

            // if login === false show error message, else redirect to /login
            if (data.register === false) toast.error(data.message);
            else {
                Promise.resolve()
                    .then(() => {
                        toast.success('Registered successfully!');
                        return Promise.resolve();
                    })
                    .then(() => {
                        setTimeout(() => {
                            window.location = '/login';
                        }, 2000);
                    });
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <div className="container text-center mt-5">
                <h1 className="display-5">Sign Up</h1>
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
                        id="name"
                        onChange={e => setName(e.target.value)}
                        required
                        type="text"
                        name="name"
                        placeholder="Name:"
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
                    <button className="btn btn-success w-100">Sign Up</button>
                    <div className="container mt-4">
                        <span className="txt1">Have an account? &nbsp;</span>
                        <a className="mt-4" href="/Login">
                            Login
                        </a>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default Register;
