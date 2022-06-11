import React, { useContext } from 'react';
import { TodosContext } from '../context';
import { TaskType } from '../types';
import { filterTodosMessage } from '../utils';
import Task from './Task';

interface TasksListProps {
  filteredTodos: TaskType[];
}

const TasksList: React.FC<TasksListProps> = ({ filteredTodos }) => {
  const {
    filter: [filter, setFilter],
  } = useContext(TodosContext);

  return (
    <div className="mb-4">
      {filteredTodos.length < 1 && (
        <p className="text-center my-10 font-bold text-xl animate-fadein">
          {filterTodosMessage(filter.type)}
        </p>
      )}
      {filteredTodos.map((todo) => (
        <Task key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default TasksList;
