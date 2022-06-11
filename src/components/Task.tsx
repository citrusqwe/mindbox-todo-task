import React, { useContext, useRef, useState } from 'react';
import { TaskType } from '../types';
import { ReactComponent as CheckIcon } from '../assets/check.svg';
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { ReactComponent as EditIcon } from '../assets/edit.svg';
import { TodosContext } from '../context';
import classnames from 'classnames';
import { completedTodosArray, filteredTodosArray } from '../utils';

const Task = ({ text, completed, id }: TaskType) => {
  const {
    todos: [todos, setTodos],
  } = useContext(TodosContext);
  const [isEdit, setIsEdit] = useState(false);
  const [inputText, setInputText] = useState(text);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleComplete = () => setTodos(completedTodosArray(todos, id));

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setTodos(filteredTodosArray(todos, id));
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsEdit(true);
    inputRef.current?.blur();
    inputRef.current?.focus();
  };

  const editTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (inputText) {
      if (e.key === 'Enter') {
        const editedTodos = todos.map((task) =>
          task.id === id ? { ...task, text: inputText } : task
        );
        setTodos(editedTodos);
        inputRef.current?.blur();
      }
    }
  };

  return (
    <div
      className="flex items-center border-b border-gray-300 p-2 group animate-fadein"
      onClick={handleComplete}
      aria-label="task-item"
    >
      <div className="flex items-center flex-1">
        <span
          className={classnames(
            'flex justify-center items-center w-4 h-4 shrink-0 border transition border-black rounded-full group-hover:border-green-600',
            { 'border-green-600': completed }
          )}
        >
          {completed && (
            <CheckIcon className="w-2 h-2 transition fill-green-600" />
          )}
        </span>
        <input
          className={classnames(
            'break-all mx-2 p-1 group-hover:text-gray-600',
            {
              'line-through opacity-40': completed,
            }
          )}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => editTask(e)}
          disabled={!isEdit}
          ref={inputRef}
          onBlur={() => setIsEdit(false)}
          aria-label="task-input"
        />
      </div>
      <div className="flex space-x-3">
        <button
          className="w-4 h-3 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleEdit}
          aria-label="task-edit"
        >
          <EditIcon />
        </button>
        <button
          className="w-4 h-3 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleRemove}
          aria-label="task-delete"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default Task;
