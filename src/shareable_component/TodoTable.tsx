// TodoTable.js
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Home, { ITodo } from "../component/Home";
import "./TodoTable.css"; 
import { API_ENDPOINT } from "../constants";

interface TodoTableProps {
  showButton: boolean;
  completeTask: boolean;
}


function TodoTable({ showButton, completeTask }: TodoTableProps) {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  function FetchData(apiUrl: any) {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    let apiUrl = API_ENDPOINT;

    if (completeTask) {
      apiUrl += '?isComplete=1';
    }

    FetchData(apiUrl);
  }, [completeTask]);

  const deleteTodo = (todo: ITodo) => {
    fetch(API_ENDPOINT + '/' + todo.id, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        FetchData(API_ENDPOINT);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleCheck = (todo: ITodo) => {

    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isComplete = !t.isComplete;
      }
      return t;
    });

    setTodos(updatedTodos);


    fetch(API_ENDPOINT + '/' + todo.id, {
      method: "PUT",
      body: JSON.stringify({ title: todo.title, content: todo.content, isComplete: todo.isComplete }), // Send only the updated isComplete value
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
  const currentDate = new Date();
  const expiredTodos = todos.filter(todo => {
    const dueDate = new Date(todo.dueDate); // Assuming your todo object has a dueDate property

    // Display the task only if the due date has expired
    console.log(dueDate.getTime() < currentDate.getTime(),!isNaN(dueDate.getTime()) );
    return !isNaN(dueDate.getTime()) && dueDate.getTime() > currentDate.getTime();
  });


  return (
    <Table striped bordered hover className="todo-table">
      <thead style={{ width: "60%" }}>
        <tr>
          <th>Title</th>
          {showButton && <><th style={{ width: "25%" }}>Action</th><th style={{ width: "25%" }}>Status</th></>}
        </tr>
      </thead>
      <tbody>
        {expiredTodos.map((todo) => (
          <tr key={todo.id}>
            <td><Link to={`/todo-add/${todo.id}`} className="todo-link">{todo.title}</Link></td>
            {showButton && <>
              <td ><Button variant="danger" size="sm" onClick={() => deleteTodo(todo)} >DELETE</Button></td>
              <td ><Button size="sm" onClick={() => handleCheck(todo)} variant={todo.isComplete ? "secondary" : "success"} >
                {todo.isComplete ? "MARK AS INCOMPLETE" : "MARK AS COMPLETE"}
              </Button></td>
            </>}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TodoTable;
