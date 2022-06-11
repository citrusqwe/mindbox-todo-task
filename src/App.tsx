import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import { TodosContext } from './context';
import { TaskType } from './types';
import {
  completedClearTodosArray,
  countUncompleted,
  filterTodos,
} from './utils';
import Filter from './components/Filter';
import TasksList from './components/TasksList';

function App() {
  const [todos, setTodos] = useState<TaskType[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TaskType[]>([]);
  const [filter, setFilter] = useState<{
    status: boolean | null;
    type: string;
  }>({
    type: 'all',
    status: null,
  });

  const handleClearCompleted = () => setTodos(completedClearTodosArray(todos));

  useEffect(() => {
    setFilteredTodos(filterTodos(todos, filter.status));
  }, [filter, todos]);

  return (
    <TodosContext.Provider
      value={{ todos: [todos, setTodos], filter: [filter, setFilter] }}
    >
      <div className="mx-5 my-12">
        <div className="flex justify-center items-center">
          <div className="w-3/5">
            <h1 className="text-center text-3xl mb-8">Todos</h1>
            <div>
              <Form />
              <TasksList filteredTodos={filteredTodos} />
              <div className="flex justify-between items-center">
                <span>{countUncompleted(filteredTodos)} items left</span>
                <Filter />
                <button onClick={handleClearCompleted} aria-label="todo-clear">
                  Clear completed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
