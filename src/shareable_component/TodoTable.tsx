// TodoTable.js
import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Home, { ITodo } from "../component/Home";
import "./TodoTable.css";
import { API_ENDPOINT } from "../constants";
import useFetch from "../Hook/useFetch";

interface TodoTableProps {
  showButton: boolean;
  completeTask: boolean;
}


function TodoTable({ showButton, completeTask }: TodoTableProps) {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { response: data, err: error, refetchData } = useFetch(completeTask);

  useEffect(() => {
    if (data) {
      setTodos(data)
    }
  }, [data])

  const deleteTodo = async (id: string) => {
    const filteredTasks = todos.filter((task) => task.id !== id);
    setTodos(filteredTasks);

    await fetch(`${API_ENDPOINT}todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
  };

  const handleCheck = (id: string, checked: boolean) => {
    fetch(`${API_ENDPOINT}todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isComplete: checked }),
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
        console.log(data)
      })
      .catch(error => console.error('Error:', error));
  };
  const currentDate = new Date();

  const expiredTodos = todos.filter(todo => {
    const dueDate = new Date(todo.dueDate);
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
                  <td><Button variant="danger" size="sm" onClick={() => deleteTodo(todo.id)}>DELETE</Button></td>
                  <td><Button size="sm" onClick={(e) => {
                    setToggle(!toggle)
                    handleCheck(todo.id, toggle)
                  }} variant={todo.isComplete ? "secondary" : "success"}>
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
