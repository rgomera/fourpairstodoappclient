import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// components
import EditTodo from '../components/EditTodo';
import UpdateRemarks from '../components/UpdateRemarks';

const ListTodos = () => {
    // states
    const [todos, setTodo] = useState([]);
    const user_id = localStorage.user_id;

    //function to delete a todo
    const deleteTodo = async id => {
        try {
            const response = await fetch(`https://fourpairstodoappserver.herokuapp.com/todos/delete_todo/${id}/${user_id}`, { method: 'DELETE' });

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
                            setTodo(todos.filter(el => el.id_todo !== id));
                        }, 2500);
                    });
            } else if (response.status === 401) {
                toast.error(data.message);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    // function to fetch all todos
    const getAllTodo = async () => {
        try {
            if (user_id) {
                const response = await fetch(`https://fourpairstodoappserver.herokuapp.com/todo_list/${user_id}`);
                const JSONdata = await response.json();
                setTodo(JSONdata);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // use effect
    useEffect(() => {
        getAllTodo();
    }, []);

    return (
        <Fragment>
            <table className="table  mt-5 table-striped">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Remarks</th>
                        <th>Visibility</th>
                        <th>Creator</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(el => (
                        <tr key={el.id_todo}>
                            <td>{el.desc_todo}</td>
                            <td>{el.date_todo}</td>
                            <td>{el.category_todo}</td>
                            <td>{el.remarks_todo}</td>
                            <td>{el.visibility_todo}</td>
                            <td>{el.user_name}</td>
                            <td>
                                <EditTodo todo={el} />
                                <UpdateRemarks todo={el} />
                                <button className="btn btn-danger ms-3" onClick={() => deleteTodo(el.id_todo)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;
