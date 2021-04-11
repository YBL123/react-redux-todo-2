import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

//STORE holds reducers and manages them for us

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});
