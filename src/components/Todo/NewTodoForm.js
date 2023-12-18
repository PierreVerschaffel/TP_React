import React from 'react'
import TodoProps from './TodoProps';
import './todo.css';

function NewTodoForm({ onSubmit }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        // let data = new FormData(e.target);
        if (e.target.name.value !== "" && e.target.name.value !== "") {
            const form = e.target;
            let todo = new TodoProps(e.target.name.value);
            onSubmit(todo);
            form.reset();
        } else {
            alert("renseignez les champs");
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className='add-todo'>
            <input type='text' name='name' placeholder='ajouter une tâche' className='add-todo-input' />
            <button className='add-todo-btn'>Ajouter</button>
        </form>
    )
}

export default NewTodoForm;