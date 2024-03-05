import React, { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { Button, Col, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import AddTodo from "./AddTodo";
import { Link, useNavigate } from "react-router-dom";
import Input from "postcss/lib/input";

export interface ITodo {
  id: number,
  title: string,
  content:string,
  isComplete: boolean
}

function TodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState(false);
  const [data, error] = useFetch();
  const navigate = useNavigate();
  console.log(data, error)

  const handleDelete = (todo: ITodo) => {
    todos.splice(todos.indexOf(todo), 1);
    setTodos([...todos]);
  };

  useEffect(() => {
    fetch('http://localhost:8000/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])

  const handlecheck = (todo: ITodo) => {
    const todoStatus = todo.isComplete;
    todo.isComplete = !todoStatus;
    setTodos([...todos]);
  
    fetch(`http://localhost:8000/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: { 'Content-type': "application/json; charset=UTF-8" }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  const deleteTodo=(todo:ITodo)=>
  {
    fetch(`http://localhost:8000/todos/${todo.id}`,{
      method:"DELETE",

    })
    .then(res=>res.json())
    .then(data=>navigate('/'))

    
  }
  


  return (<div  className="App">
    <h1 className="justify-content-center mt-4">Todo-List</h1>
     <br/>
        <Button variant="primary" size="sm"  className="mt-3 mx-auto"
        style={{ width: "200px" } } onClick={()=>{
          (setStatus(!status))
          

        }}> {status ? "Show All Tasks" : "Show Completed Task"}</Button>
        <br/>

    <ListGroup className="align-items-center">
      {
        todos.map((todo) => (
          <div>
            {(!status ||(status && todo.isComplete))&&(  <Row className="justify-content-center mt-2">
              <InputGroup>
                <InputGroup.Checkbox checked={todo.isComplete} onChange={() =>handlecheck(todo) 
                
                }>
                </InputGroup.Checkbox>
              

                <Link key={todo.id} to={`/todo-add/${todo.id}`}>
            <ListGroup.Item
              style={{ width: 400 }}
            >
              {todo.title}
            </ListGroup.Item>
          </Link>
                <Button variant="danger" size="sm" onClick={()=>deleteTodo(todo)}>DELETE</Button>
              </InputGroup>
            </Row>)

            }
          
          </div>
        )

        )
      }

    </ListGroup>

  </div>
  )

}
export default TodoList;