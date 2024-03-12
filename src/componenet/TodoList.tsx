import React, { useEffect, useState } from "react";
import useFetch from "../Hook/useFetch";
import { Button, Col, InputGroup, ListGroup, Row } from "react-bootstrap";
import AddTodo from "./AddTodo";
import { Link, useNavigate } from "react-router-dom";
import Input from "postcss/lib/input";

export interface ITodo {
  id: string,
  title: string,
  content:string,
  isComplete: boolean
}

function TodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState<boolean>(false);
  const {response:data,err: error,refetchData} = useFetch();
  const navigate = useNavigate();
  console.log(data, error)

  useEffect(() => {
    if(data){
      setTodos(data)
    }
  }, [data])

  const handlecheck = (id:string,checked:boolean) => {
    // const updatedList = todos.map((todo)=> todo.id ===id ? ({...todo,isComplete:checked}): todo)
    // setTodos(updatedList);
  
    fetch(`http://localhost:8000/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({isComplete:checked}),
      headers: { 'Content-type': "application/json; charset=UTF-8" }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        refetchData(true)
        console.log(data)})
      .catch(error => console.error('Error:', error));
  };

  const deleteTodo = async(id: string) => {
    const filteredTasks = todos.filter((task) => task.id !== id);
    setTodos(filteredTasks);

    await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
  };
  
  return (<div  className="App">
    <h1 className="justify-content-center mt-4">Todo-List</h1>
    <Button variant="primary" size="sm" onClick={() => navigate('/todo-add')} className="mt-3 mx-auto"
        style={{ width: "200px" }}>Add Todo</Button> <br/>
        <Button variant="primary" size="sm"  className="mt-3 mx-auto"
        style={{ width: "200px" } } onClick={()=>{
          (setStatus(!status))
          

        }}> {status ? "Show All Tasks" : "Show Completed Task"}</Button>
        <br/>

    <ListGroup className="align-items-center">
      {
        todos.map((todo,key) => (
          <div key={key}>
            {(!status ||(status && todo.isComplete))&&(  <Row className="justify-content-center mt-2">
              <InputGroup>
                <InputGroup.Checkbox checked={todo.isComplete} onChange={(e) =>{
                  handlecheck(todo.id,e.target.checked) }
                
                }>
                </InputGroup.Checkbox>
                <Link key={todo.id} to={`/todo-add/${todo.id}`}>
            <ListGroup.Item
              style={{ width: 400 }}
            >
              {todo.title}
            </ListGroup.Item>
          </Link>
                <Button variant="danger" size="sm" onClick={()=>deleteTodo(todo.id)}>DELETE</Button>
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