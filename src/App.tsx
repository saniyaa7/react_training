import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './componenet/TodoList';
import MyNavbar from './MyNavbar';
import AddTodo from './componenet/AddTodo';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayTodo from './componenet/DisplayTodo';

function App() {
  return (
    <div>
    
      <BrowserRouter>
      <MyNavbar/>
      <Routes>
        <Route path='/' element={<TodoList/>}> </Route>
        <Route path='/todo-add' element={<AddTodo/>}></Route>
        <Route path='/todo-add/:id' element={<DisplayTodo/>}></Route>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;