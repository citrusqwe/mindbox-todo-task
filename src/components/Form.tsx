import React, { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { TodosContext } from '../context';

const Form = () => {
  const {
    todos: [todos, setTodos],
  } = useContext(TodosContext);
  const [textInput, setTextInput] = useState('');

  const createTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textInput) {
      const newTask = {
        id: uuid(),
        text: textInput,
        completed: false,
      };

      setTodos([...todos, newTask]);
      setTextInput('');
    }
  };

  return (
    <form
      className="mb-4 border-b"
      aria-label="task-form"
      onSubmit={createTask}
    >
      <input
        className="border-gray-400 p-4 w-full outline-none"
        type="text"
        placeholder="What need to be done?"
        aria-label="task-form-input"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />
    </form>
  );
};

export default Form;
