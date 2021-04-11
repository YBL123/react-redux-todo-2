import React from 'react';
//SELECTOR HOOK
import { useSelector } from 'react-redux';

const TotalCompleteItems = () => {
  //pass in function to tell redux what we want to return from state
  //using filter to return only todos with completed property value of true
  const completedTodos = useSelector((state) =>
    state.todos.filter((todo) => todo.completed === true)
  );

  //completedTodos.length = number of completed items
  return <h4 className="mt-3">Total Complete Items: {completedTodos.length}</h4>;
};

export default TotalCompleteItems;
