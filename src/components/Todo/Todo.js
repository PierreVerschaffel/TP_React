import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import './todo.css';

function Todo({ id,index ,TodoProps, onDelete, onModification, onState }) {

    // Variables d'état sur le CSS lors du click sur une tâche
    const [color, setColor] = useState("todo-unchecked");

    // Variables d'état pour modification des tâches
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(TodoProps.name);

    // Suppression d'une tâche
    const handleDelete = (e) => {
        // Afin d'éviter que handleTodoState passe au dessus
        e.stopPropagation();
        onDelete(id);
    }

    const handleModification = (e) => {
        // Afin d'éviter que handleTodoState passe au dessus
        e.stopPropagation();
        setIsEditing(true);
    }

    // Changement de la propriété state d'une tâche afin de l'activer (true) ou désactiver (false)
    const handleTodoState = (e) => {
        // Je vérifie si le click est ailleur que sur mon input pour éviter de changer son état lors d'une modification
        if (e.target.tagName.toLowerCase() !== 'input') {
            onState(index);
        }
    }

    // Changement du nom de la tâche
    const handleNameChange = (e) => {
        setEditedName(e.target.value);
    }

    // écoute de la touche enter pour valider l'input du nom de la tâche
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // On évite les champs vide
            if (editedName.trim() !== '') {
                setIsEditing(false);
                onModification(editedName);
            }
        }
    }

    // Si l'utilisateur click ailleur sur la page on modifie l'input
    const handleModificationConfirm = () => {
        // On évite les champs vide
        if (editedName.trim() !== '') {
            setIsEditing(false);
            onModification(editedName);
        }
    }

    // On effet les actions en fonction de la réponse de la propriété state afin de changer les styles
    useEffect(() => {
        if (TodoProps.state === false) {
            setColor("todo-checked");
        } else {
            setColor("todo-unchecked");
        }
    }, [TodoProps.state]);

    return <>
        <li className={color + " todo-task"} onClick={(e) => handleTodoState(e)}>
            <div>
                {isEditing ? (
                    <input
                        type='text'
                        value={editedName}
                        onChange={handleNameChange}
                        onKeyDown={handleKeyPress}
                        onBlur={handleModificationConfirm} />
                ) : (
                    TodoProps.name
                )}
            </div>
            <div className='actions'>
                <span>
                    <Button text="Modifier" type="btn" onClick={(e) => handleModification(e)}>
                        <i className='bi bi-pen grey-icon'></i>
                    </Button>
                </span>
                <span>
                    <Button text="Supprimer" type="btn" onClick={(e) => handleDelete(e)}>
                        <i className='bi bi-trash grey-icon'></i>
                    </Button>
                </span>
            </div>
        </li>
    </>
}

export default Todo;