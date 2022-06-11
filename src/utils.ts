import { TaskType } from './types';

export const countUncompleted = (todos: TaskType[]) => {
  return todos.filter((task) => task.completed === false).length;
};

export const completedTodosArray = (todos: TaskType[], id: string) => {
  return todos.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
};

export const filteredTodosArray = (todos: TaskType[], id: string) => {
  return todos.filter((task) => task.id !== id);
};

export const completedClearTodosArray = (todos: TaskType[]) => {
  return todos.reduce((clearedTodos: TaskType[], task) => {
    if (!task.completed) clearedTodos.push(task);
    return clearedTodos;
  }, []);
};

export const filterTodos = (todos: TaskType[], status: boolean | null) => {
  switch (status) {
    case true:
    case false:
      return todos.filter((t) => t.completed === status);
    default:
      return todos;
  }
};

export const filterTodosMessage = (type: string) => {
  switch (type) {
    case 'active':
      return 'No active tasks';
    case 'completed':
      return 'No completed tasks';
    default:
      return 'Create task';
  }
};
