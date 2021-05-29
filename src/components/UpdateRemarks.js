import React, { Fragment, useState } from 'react';
import { toast } from 'react-toastify';

const UpdateRemarks = ({ todo }) => {
    let remarks = todo.remarks_todo;
    const user_id = localStorage.user_id;

    const updateRemarks = async id => {
        try {
            if (remarks === 'In Progress') remarks = 'Done';
            else remarks = 'In Progress';

            const body = { remarks };
            const response = await fetch(`https://fourpairstodoappserver.herokuapp.com/todos/update_remarks/${id}/${user_id}`, {
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
            <button className="btn btn-success ms-3" onClick={() => updateRemarks(todo.id_todo)}>
                Remarks
            </button>
        </Fragment>
    );
};

export default UpdateRemarks;
