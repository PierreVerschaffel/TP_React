import React from 'react'
import TodoProps from './TodoProps';

function NewTodoForm({ onSubmit }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        // let data = new FormData(e.target);
        if(e.target.name.value !== "" &&  e.target.name.value !==""){
            const form = e.target;
            let todo = new TodoProps(e.target.name.value);
            onSubmit(todo);
            form.reset();
        }else{
            alert("renseignez les champs");
        }
    }

    return (
            <form onSubmit={(e) => handleSubmit(e)}>
                        <label>Tâche</label>
                        <div className='d-flex justify-content-between'>
                        <input type='text' name='name' className="form-control" />
                        <button className='btn btn-primary'>Ajouter</button>
                        </div>
            </form>
    )
}

export default NewTodoForm;