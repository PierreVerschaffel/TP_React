import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import Button from '../Button/Button';

// Génération d'un identifiant unique (j'évite les problèmes lors de la suppression d'une liste)
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36);
}

function Todos() {
  // Je stocke les listes de tâches dans une constante il il n'y en a pas alors je renvoies un tableau vide
  const initialTodoLists = JSON.parse(localStorage.getItem('todoLists')) || [];
  const [todoLists, setTodoLists] = useState(initialTodoLists);

  // On renvoie les listes stockées dans le local storage
  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(todoLists));
  }, [todoLists]);

  // Création d'une nouvelle liste de tâches
  const handleNewTodoList = () => {
    const newTodoLists = [...todoLists, { id: generateUniqueId() }];
    setTodoLists(newTodoLists);
  };

  // Suppression d'une liste de tâches
  const handleDeleteList = (id) => {
    const updatedTodoLists = todoLists.filter(todoList => todoList.id !== id);
    setTodoLists(updatedTodoLists);
  };

  return (
    <>
      <div className='todos'>
        {todoLists.map(({id}) => (
          <div key={id} className='todo-list'>
            <TodoList key={id} />
            <Button text="Supprimer" type="" onClick={() => handleDeleteList(id)} CSSclass={"delete-todo-list-btn"}>
              Supprimer la liste
            </Button>
          </div>
        ))}
        <div className='add-todo-list-btn'>
          <button onClick={handleNewTodoList}>
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default Todos;
