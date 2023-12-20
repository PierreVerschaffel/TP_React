
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

    // if(localStorage.getItem('todo')){
    //     let olderTodo=[localStorage.getItem('todo')]+[JSON.stringify(todosList)];
    //     localStorage.setItem('todo',olderTodo);
    // }else{
    //     localStorage.setItem('todo',JSON.stringify(todosList))
    // }

    // Déclenchement au rendu initial du composant
    useEffect(() => {
        const newTodos = [...todosList];
        setTodos(newTodos);
        setFilteredTodos(todosList);
    }, []);

    // Déclenchement lors de la modification des tâches en fonction du filtre
    useEffect(() => {
        setFilteredTodos(todos);
    }, [todos]);

    // Gestion de l'affiche en fonction du filtre sur les noms de mes tâches
    // startsWith qui me permet de filtrer sans avoir à écrire exactement le name de la tâche
    const handleFilterTodoChange = (value) => {
        if (value !== "") {
            const filteredTodos = todos.filter(todo => todo.name.toLowerCase().includes(value.toLowerCase()));
            setFilteredTodos(filteredTodos);
        } else {
            setFilteredTodos(todos);
        }
    }

    // Suppression d'une tâche en fonction de son index
    const handleTodoDelete = (id) => {
        console.log(id);
        // let newTodosList = [...todos];
        // newTodosList.splice(index, 1);
        // setTodos(newTodosList);
        const newTodoList = todosList.filter(todosList => todosList.id !== id);
        setTodos(newTodoList);
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
                <div className='todo-app'>
                    <div className='add-todo'>
                        <input
                            type='text'
                            placeholder='Rechercher une tâche'
                            onChange={(e) => handleFilterTodoChange(e.target.value)}
                            className="filter-todo-btn" />
                    </div>
                    <NewTodoForm onSubmit={(data) => handleNewTodoFormSubmit(data)} />
                    <ul>
                        {filteredTodos.length > 0 ? (
                            filteredTodos.map((todo, index) =>
                                <Todo
                                    key={index}
                                    id={todo.id}
                                    TodoProps={todo}
                                    onDelete={(id) => handleTodoDelete(id)}
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