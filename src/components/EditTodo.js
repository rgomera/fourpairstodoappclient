import React, { Fragment, useState } from 'react';
import { toast } from 'react-toastify';

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.desc_todo);
    const user_id = localStorage.user_id;

    // update a todo function
    const updateTodo = async e => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`https://fourpairstodoappserver.herokuapp.com/todos/update_todo/${todo.id_todo}/${user_id}`, {
                method: 'PUT',
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
            } else if (response.status === 401) {
                toast.error(data.message);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.id_todo}`}>
                Edit
            </button>

            <div
                className="modal fade"
                id={`id${todo.id_todo}`}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                onClick={e => setDescription(todo.desc_todo)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Edit Todo
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={e => setDescription(todo.desc_todo)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={e => updateTodo(e)}>
                                Edit
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={e => setDescription(todo.desc_todo)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTodo;
