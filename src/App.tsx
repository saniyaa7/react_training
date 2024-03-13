import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import MyNavbar from './Layout/MyNavbar';
import AddTodo from './component/AddTodo';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayTodo from './component/DisplayTodo';
import TodoTable from './shareable_component/TodoTable';
import CompleteTodo from './component/CompleteTodo';
import NotFound from './component/NotFound';

function App() {
  return (
    <div>
    
      <BrowserRouter>
      <MyNavbar/>
      <Routes>
        <Route path='/' element={<Home/>}> </Route>
        <Route path='/todo-add' element={<AddTodo/>}></Route>
        <Route path='/todo-add/:id' element={<DisplayTodo/>}></Route>
        <Route path='/complete-task' element={<CompleteTodo/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;