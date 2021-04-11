import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// THUNKS !!!!!!!!
//a THUNK is a function which returns another function
//this THUNK is a the new ACTION which we dispatch from our components
// this will in turn will dispatch its own ACTION when the RESPONSE COMPLETES with the DATA from the API CALL AS THE PAYLOAD
//so need to pass some stuff into the createThunk function
// need to export THUNK here -> used bellow in extraReducers
export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const response = await fetch('http://localhost:7000/todos');
    if (response.ok) {
      const todos = await response.json();
      // whenever this returns it will dispatch another action with the todos in the PAYLOAD
      return { todos };
    }
  }
);

// this time we pass in the payload parameter as we need to know the title of the todo
export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (payload) => {
    const response = await fetch('http://localhost:7000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: payload.title }),
    });
    if (response.ok) {
      // get the todo from response
      const todo = await response.json();
      // return this todo as a new object
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  'todos/completeTodoAsync',
  async (payload) => {
    //updating exisitng todo -> need to pass id of todo we are updating
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      //PATCH -> updating existing
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (response.ok) {
      //get updated todo object from response
      const todo = await response.json();
      // return object
      return { id: todo.id, completed: todo.completed };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return { id: payload.id };
    }
  }
);

// -----------------------------------

//SLICE!!!
const todoSlice = createSlice({
  name: 'todos',
  initialState: [
    { id: 1, title: 'todo1', completed: false },
    { id: 2, title: 'todo2', completed: false },
    { id: 3, title: 'todo3', completed: true },
  ],
  //REDUCER -> responds to ACTION -> takes current state and creates new state based on the action payload
  reducers: {
    //STATE = current state of the slice -> array of todo items
    //ACTION = contains the type and the payload and comes from our component
    // When we add our reducer object like this, the createSlice function creates actions based on the reducer names
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      //now need to push into state
      state.push(newTodo);
      // adds newTodo to the end of the array
      // at this point redux will take this new state and updat the store
      // this then goes on to update the components that rely on this piece of state
    },
    toggleComplete: (state, action) => {
      //finding the index of the todo in the todos array based on the id
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      //using index to get to todo in that position and update completed property to whatever
      // value our component passes as part of the payload
      // at this point redux will update the state -> selector will detect the change and rerender any components
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      // when action gets dispatched -> we will send id of todo that was clicked -> then filter this todo out of the current list using filter
      // gives back all the ids that are NOT equal to the id in the payload
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  //specify additional reducers
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      console.log('fetching data...');
    },
    //when the THUNK dispatches a fullfiled action, this will mean that the API call in our THUNK has completed and dispatched this ACTION successfully
    [getTodosAsync.fulfilled]: (state, action) => {
      console.log('fetched data successfully...');
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      // takes the todo from payload and pushes into current state -> redux will update store and notify components that something has changed
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      //finding the index of the todo in the todos array based on the id
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      //using index to get to todo in that position and update completed property to whatever
      // value our component passes as part of the payload
      // at this point redux will update the state -> selector will detect the change and rerender any components
      state[index].completed = action.payload.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

// getting the actions out of actions object
// createSlice function automatically CREATES ACTIONS BASED ON OUR REDUCER NAMES
export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

// exporting to add to store in store.js
export default todoSlice.reducer;
