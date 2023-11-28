
import React, { useEffect, useState } from 'react'
import Todo from './Todo';
import TodoProps from './TodoProps';
import NewTodoForm from './NewTodoForm';
import './todo.css';

// Tableau d'objets todos
let todosList = [
    new TodoProps("Première Todo"),
    new TodoProps("Deuxième Todo"),
    new TodoProps("Test")
]

function TodoList() {

    // Variables d'état
    const [todos, setTodos] = useState(todosList);
    const [filteredTodos, setFilteredTodos] = useState(todosList);

    // Création de nouvelle liste
    const [listTodos, setListTodos] = useState([]);

    // Déclenchement au rendu initial du composant
    useEffect(() => {
        setTodos(todosList)
        setFilteredTodos(todosList)
    }, []);

    // Déclenchement lors de la modification des tâches en fonction du filtre
    useEffect(() => {
        setFilteredTodos(todos)
    }, [todos]);

    // Gestion de l'affiche en fonction du filtre sur les noms de mes tâches
    const handleFilterTodoChange = (value) => {
        if (value !== "") {
            const filteredTodos = todos.filter(todo => todo.name === value);
            setFilteredTodos(filteredTodos);
        } else {
            setFilteredTodos(todosList);
        }
    }

    // Suppression d'une tâche en fonction de son index
    const handleTodoDelete = (index) => {
        let newTodosList = [...todos];
        newTodosList.splice(index, 1);
        setTodos(newTodosList);
    }

    // On modifie le name d'une tâche en fonction de son index et de la valeur l'input envoyé
    const handleTodoModification = (index, newName) => {
        let newTodosList = [...todos];
        newTodosList[index] = { ...newTodosList[index], name: newName };
        setTodos(newTodosList);
    }

    // On modifie la propriété state de l'élément clicker en fonction de son index
    const handleTodoState = (index) => {
        let newTodosList = [...todos];

        newTodosList[index] = { ...newTodosList[index], state: !newTodosList[index].state };
        setTodos(newTodosList);
    }

    // On push dans notre tableau une nouvelle tâche
    const handleNewTodoFormSubmit = (data) => {
        let newTodosList = [...todos];
        newTodosList.push(data);
        setTodos(newTodosList);
    }

    return (
        <>
            <div className='row'>
                <label>Filtre Todo</label>
                <input type='text' onChange={(e) => handleFilterTodoChange(e.target.value)} className="form-control mb-2" />
            </div>
            <div className='row'>

                <h1>Liste de tâches</h1>

                <div className='col-lg-4 todo-app'>
                    <NewTodoForm onSubmit={(data) => handleNewTodoFormSubmit(data)} />
                    <ul>
                        {filteredTodos.length > 0 ? (
                            filteredTodos.map((todo, index) =>
                                <Todo
                                    key={index}
                                    id={index}
                                    TodoProps={todo}
                                    onDelete={(index) => handleTodoDelete(index)}
                                    onModification={(newName) => handleTodoModification(index, newName)}
                                    onState={(index) => handleTodoState(index)}
                                />
                            )
                        ) : (
                            <li className='tex-center'>
                                Aucune tâche trouvé ...
                            </li>
                        )}
                    </ul>
                </div>
            </div>

        </>
    )
}

export default TodoList