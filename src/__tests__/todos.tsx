import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('todo adding', () => {
  render(<App />);
  const input = screen.getByLabelText('task-form-input');
  const form = screen.getByLabelText('task-form');

  fireEvent.change(input, { target: { value: 'task1' } });
  fireEvent.submit(form);

  expect(screen.getByLabelText('task-input')).toHaveValue('task1');
});

test('active todos', () => {
  render(<App />);
  const input = screen.getByLabelText('task-form-input');
  const form = screen.getByLabelText('task-form');

  fireEvent.change(input, { target: { value: 'task1' } });
  fireEvent.submit(form);

  const taskItem = screen.getByLabelText('task-item');
  const taskActive = screen.getByLabelText('task-active');
  fireEvent.click(taskItem);
  fireEvent.click(taskActive);

  expect(screen.queryByLabelText('task-item')).not.toBeInTheDocument();
});

test('completed todos', () => {
  render(<App />);
  const input = screen.getByLabelText('task-form-input');
  const form = screen.getByLabelText('task-form');

  fireEvent.change(input, { target: { value: 'task1' } });
  fireEvent.submit(form);

  const taskItem = screen.getByLabelText('task-item');
  const taskCompleted = screen.getByLabelText('task-completed');
  fireEvent.click(taskItem);
  fireEvent.click(taskCompleted);

  expect(screen.getByLabelText('task-item')).toBeInTheDocument();
});

test('delete todo', () => {
  render(<App />);
  const input = screen.getByLabelText('task-form-input');
  const form = screen.getByLabelText('task-form');

  fireEvent.change(input, { target: { value: 'task1' } });
  fireEvent.submit(form);
  const deleteButton = screen.getByLabelText('task-delete');
  fireEvent.click(deleteButton);

  expect(screen.queryByLabelText('task-item')).not.toBeInTheDocument();
});

test('edit todo', () => {
  render(<App />);
  const input = screen.getByLabelText('task-form-input');
  const form = screen.getByLabelText('task-form');

  fireEvent.change(input, { target: { value: 'task1' } });
  fireEvent.submit(form);
  const editButton = screen.getByLabelText('task-edit');
  const taskInput = screen.getByLabelText('task-input');
  fireEvent.click(editButton);
  fireEvent.change(taskInput, { target: { value: 'task11' } });
  fireEvent.keyDown(taskInput);

  expect(screen.getByLabelText('task-input')).toHaveValue('task11');
});

test('clear completed', () => {
  render(<App />);
  const input = screen.getByLabelText('task-form-input');
  const form = screen.getByLabelText('task-form');

  fireEvent.change(input, { target: { value: 'task1' } });
  fireEvent.submit(form);
  const taskItem = screen.getByLabelText('task-item');
  fireEvent.click(taskItem);
  const clearCompleted = screen.getByLabelText('todo-clear');
  fireEvent.click(clearCompleted);

  expect(screen.queryByLabelText('task-item')).not.toBeInTheDocument();
});
