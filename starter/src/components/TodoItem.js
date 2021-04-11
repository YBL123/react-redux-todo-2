import React from 'react';

//DISPATCH
import { useDispatch } from 'react-redux';
//ACTIONS
//WITHOUT API
// import { toggleComplete, deleteTodo } from '../redux/todoSlice';
//WITH API
import { toggleCompleteAsync, deleteTodoAsync } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  //our reducer needs to know the id of the todo item we are changing
  // and what the new completed value is
  // we pass this in as our payload object
  const handleCompleteClick = () => {
    dispatch(
      //wITHOUT API
      // toggleComplete({
      //WITH API
      toggleCompleteAsync({
        // opposite of whater the completed value currently is -> toggle
        id: id,
        completed: !completed,
      })
    );
  };

  // reducer needs to know the id of the todo item
  const handleDeleteClick = () => {
    dispatch(
      //wITHOUT API
      // deleteTodo({
      //WITH API
      deleteTodoAsync({
        id: id,
      })
    );
  };

  return (
    <li className={`list-group-item ${completed && 'list-group-item-success'}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            checked={completed}
            onChange={handleCompleteClick}
          ></input>
          {title}
        </span>
        <button onClick={handleDeleteClick} className="btn btn-danger">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
