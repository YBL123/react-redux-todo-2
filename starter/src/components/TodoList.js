import React, { useEffect } from 'react';
import TodoItem from './TodoItem';

import { useSelector, useDispatch } from 'react-redux';
//ACTIONS
import { getTodosAsync } from '../redux/todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();

  //accepts functions and returns data based on that function
  // state being passed into useSelectore is the entire state tree ->
  // this is why we have to specify = state.todos
  // goes to store -> picks out all todos from state and assigns them to todos variable
  // you could also filter here etc to get specific todo from the todos
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
      ))}
    </ul>
  );
};

export default TodoList;
