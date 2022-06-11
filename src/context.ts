import React from 'react';
import { TaskType } from './types';

export const TodosContext = React.createContext<{
  todos: [TaskType[], React.Dispatch<React.SetStateAction<TaskType[]>>];
  filter: [
    {
      status: boolean | null;
      type: string;
    },
    React.Dispatch<
      React.SetStateAction<{
        status: boolean | null;
        type: string;
      }>
    >
  ];
}>({
  todos: [[], () => {}],
  filter: [
    {
      type: 'all',
      status: null,
    },
    () => {},
  ],
});
