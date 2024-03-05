import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';
import MyNavbar from './MyNavbar';
import AddTodo from './AddTodo';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<TodoList/>}> </Route>
        <Route path='/todo-add' element={<AddTodo/>}></Route>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;