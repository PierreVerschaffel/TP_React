import React, { useState } from 'react';
import TodoList from './TodoList';

function Todos() {
  const [todoLists, setTodoLists] = useState([<TodoList key={0} />]);

  const handleNewTodoList = () => {
    const newTodoLists = [...todoLists, <TodoList key={todoLists.length} />];
    setTodoLists(newTodoLists);
  };

  return (
    <>
      <div className='todos'>
        {todoLists.map((todoList, index) => (
          <div key={index} className='todo-list'>
            {todoList}
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