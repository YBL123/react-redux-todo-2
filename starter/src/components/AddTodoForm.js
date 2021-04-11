import React, { useState } from 'react';

//LETS US DISPATCH ACTIONS
import { useDispatch } from 'react-redux';
//ACTION
//without API
// import { addTodo } from '../redux/todoSlice';
//with API
import { addTodoAsync } from '../redux/todoSlice';

const AddTodoForm = () => {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    //adding a call to DISPATCH addTodo ACTION
    dispatch(
      // addTodo({
      addTodoAsync({
        //PAYLOD = TITLE
        title: value,
      })
    );
  };

  return (
    <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
      <label className="sr-only">Name</label>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Add todo..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      ></input>

      <button type="submit" className="btn btn-primary mb-2">
        Submit
      </button>
    </form>
  );
};

export default AddTodoForm;
