import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MyNavbar from './Layout/MyNavbar';
 import AddTodo from './component/AddTodo';
import CompleteTodo from './component/CompleteTodo';
import DisplayTodo from './component/DisplayTodo';
import Home from './component/Home';
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