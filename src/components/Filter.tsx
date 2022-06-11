import React, { useContext } from 'react';
import classnames from 'classnames';
import { TodosContext } from '../context';

const Filter = () => {
  const {
    filter: [filter, setFilter],
  } = useContext(TodosContext);

  const handleFilterTodos = (e: any) => {
    switch (e.target.id) {
      case 'all':
        setFilter({ type: e.target.id, status: null });
        break;
      case 'active':
        setFilter({ type: e.target.id, status: false });
        break;
      case 'completed':
        setFilter({ type: e.target.id, status: true });
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex space-x-2" onClick={handleFilterTodos}>
      <button
        id="all"
        className={classnames('py-1 px-2 border', {
          'border-black rounded-md': filter.type === 'all',
          'border-transparent': filter.type !== 'all',
        })}
      >
        All
      </button>

      <button
        id="active"
        className={classnames('py-1 px-2 border', {
          'border-black rounded-md': filter.type === 'active',
          'border-transparent': filter.type !== 'active',
        })}
        aria-label="task-active"
      >
        Active
      </button>

      <button
        id="completed"
        className={classnames('py-1 px-2 border', {
          'border-black rounded-md': filter.type === 'completed',
          'border-transparent': filter.type !== 'completed',
        })}
        aria-label="task-completed"
      >
        Completed
      </button>
    </div>
  );
};

export default Filter;
