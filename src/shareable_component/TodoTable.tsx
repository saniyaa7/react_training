// TodoTable.js
import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup, Table } from "react-bootstrap";
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
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function FetchData(apiUrl: any) {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setTodos(data)
        console.log("data: ", data)
      })
      .catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    let apiUrl = API_ENDPOINT + 'todos';

    if (completeTask) {
      apiUrl += '?isComplete=1';
    }

    FetchData(apiUrl);
  }, [completeTask,]);

  const deleteTodo = (todo: ITodo) => {
    fetch(API_ENDPOINT + 'todos/' + todo.id, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        FetchData(API_ENDPOINT + 'todos');
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


    fetch(API_ENDPOINT + 'todos/' + todo.id, {
      method: "PUT",
      body: JSON.stringify({ title: todo.title, content: todo.content, dueDate: todo.dueDate, isComplete: todo.isComplete }), // Send only the updated isComplete value
      headers: { 'Content-type': "application/json; charset=UTF-8" }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => console.log("update:", data))
      .catch(error => console.error('Error:', error));
  };
  const currentDate = new Date();

  const expiredTodos = todos.filter(todo => {
    const dueDate = new Date(todo.dueDate);
    console.log(dueDate.getTime(), dueDate.getTime() > currentDate.getTime())
    return !isNaN(dueDate.getTime()) && dueDate.getTime() >= currentDate.getTime();
  });


  return (
    <><Form>
      <InputGroup className="w-50 mx-auto my-3">
        <FormControl placeholder="Search list" onChange={(e) => setSearch(e.target.value)} className="custom-search-bar" />
      </InputGroup>
    </Form><Table striped bordered hover className="todo-table text-center">
        <thead style={{ width: "60%" }}>
          <tr>
            <th>Title</th>
            {showButton && <><th style={{ width: "25%" }}>Action</th><th style={{ width: "25%" }}>Status</th></>}
          </tr>
        </thead>
        <tbody>
          {expiredTodos.filter((item) => {
            return search.toLocaleLowerCase() === ''
              ? item : item.title.toLocaleLowerCase().includes(search)
          })
            .map((todo) => (
              <tr key={todo.id}>
                <td><Link to={`/todo-add/${todo.id}`} className="todo-link">{todo.title}</Link></td>
                {showButton && <>
                  <td><Button variant="danger" size="sm" onClick={() => deleteTodo(todo)}>DELETE</Button></td>
                  <td><Button size="sm" onClick={() => handleCheck(todo)} variant={todo.isComplete ? "secondary" : "success"}>
                    {todo.isComplete ? "MARK AS INCOMPLETE" : "MARK AS COMPLETE"}
                  </Button></td>
                </>}
              </tr>
            ))}
        </tbody>
      </Table></>
  );
}

export default TodoTable;
