import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const InputTodo = () => {
    // states
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState([]);
    const [selectedcategory, setSelectedCategory] = useState('none');
    const [visibility, setVisibility] = useState('none');
    const user_id = localStorage.user_id;

    // function to fetch all categories
    const getAllCategory = async () => {
        try {
            const response = await fetch('https://fourpairstodoappserver.herokuapp.com/categories');
            const JSONdata = await response.json();

            setCategory(JSONdata);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // function that submit the form
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            if (description === '' || selectedcategory === 'none' || visibility === 'none') {
                toast.error('Please fill-in all fields!');
            } else {
                const body = { description, selectedcategory, visibility };
                const response = await fetch(`https://fourpairstodoappserver.herokuapp.com/todos/create_todo/${user_id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });

                // get the actual data of response
                const data = await response.json();

                if (response.status === 200) {
                    Promise.resolve()
                        .then(() => {
                            toast.success(data.message);
                            return Promise.resolve();
                        })
                        .then(() => {
                            setTimeout(() => {
                                window.location = '/app';
                            }, 2500);
                        });
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-4">PERN Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <select className="form-select ms-3" required onChange={e => setSelectedCategory(e.target.value)}>
                    <option defaultValue value="none">
                        Choose Category
                    </option>
                    {category.map(el => (
                        <option key={el.category_id} value={el.category_id}>
                            {el.category_name}
                        </option>
                    ))}
                </select>
                <select className="form-select ms-3" required onChange={e => setVisibility(e.target.value)}>
                    <option defaultValue value="none">
                        Choose Visibility
                    </option>
                    <option value="public">public</option>
                    <option value="private">private</option>
                </select>
                <input className="form-control ms-3" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;
