// TodoTable.js
import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup, Table, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Home, { ITodo } from "../component/Home";
import "./TodoTable.css";
import { API_ENDPOINT } from "../constants";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



interface TodoTableProps {
  showButton: boolean;
  completeTask: boolean;
}

function TodoTable({ showButton, completeTask }: TodoTableProps) {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [toggle,setToggle]=useState<boolean>(false);

  const navigate = useNavigate();

  function FetchData(apiUrl: any) {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setTodos(data)
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

  const deleteTodo = (id: string) => {
    fetch(API_ENDPOINT + 'todos/' + id, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        FetchData(API_ENDPOINT + 'todos');
      })
      .catch(error => console.error('Error:', error));
  };

  const handleCheck = (id:string,checked:boolean) => {
      const updatedList = todos.map((todo)=> todo.id ===id ? ({...todo,isComplete:checked}): todo)
    setTodos(updatedList);
    fetch(API_ENDPOINT + 'todos/' + id, {
      method: "PATCH",
      body: JSON.stringify({isComplete:checked}), // Send only the updated isComplete value
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
  let expiredTodos = todos.filter(todo => {
    const dueDate = new Date(todo.dueDate);
    return !isNaN(dueDate.getTime()) && dueDate.getTime() >= currentDate.getTime();
  });

  const filterTask = status === 'all' ? expiredTodos : expiredTodos.filter((todo: ITodo) => String(todo.isComplete) === status);
  const serachFilter = filterTask.filter((item) => {
    return search.toLocaleLowerCase() === ''
      ? item : item.title.toLocaleLowerCase().includes(search)
  })

  const handleSort = (direction: string) => () => {
    if (direction === 'ascending')
      setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
    else
      setTodos([...todos].sort((a, b) => b.title.localeCompare(a.title)));
  };

  const displayData = (status: string) => (

    <Table striped bordered hover className="todo-table text-center">
      <thead>
        <tr>
          <th>Title</th>
          {showButton && <><th style={{ width: "25%" }}>Action</th><th style={{ width: "25%" }}>Status</th></>}
        </tr>
      </thead>
      <tbody>
        {serachFilter.map((todo) => (
          <tr key={todo.id}>
            <>
              <td><Link to={`/todo-add/${todo.id}`} className="todo-link">{todo.title}</Link></td>
              {showButton && <>
                <td><Button variant="danger" size="sm" onClick={() => deleteTodo(todo.id)}>DELETE</Button></td>
                <td><Button size="sm" onClick={() =>{setToggle(!toggle)
                   handleCheck(todo.id,toggle)}} variant={todo.isComplete ? "secondary" : "success"}>
                  {todo.isComplete ? "MARK AS INCOMPLETE" : "MARK AS COMPLETE"}
                </Button></td>
              </>}
            </>

          </tr>
        ))}
      </tbody>
    </Table>
  );
  const handleStatus = (status: string) => {
    setStatus(status);
    // displayData(status) //no need to write displayData here
  }

  return (
    <>
      <div className="search-bar">
        <Row>
          <Col xs={12} md={6}>
            <InputGroup className="mb-3">
              <FormControl placeholder="Search list" onChange={(e) => setSearch(e.target.value)} className="custom-search-bar" />
            </InputGroup>
          </Col>
          <Col xs={12} md={3}>
            <DropdownButton id="status-dropdown" title="Status">
              <Dropdown.Item onClick={() => handleStatus('all')}>ALL</Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatus('true')}>COMPLETED</Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatus('false')}>INCOMPLETED</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col xs={12} md={3}>
            <DropdownButton id="sort-dropdown" title="Sort">
              <Dropdown.Item onClick={handleSort('ascending')}>ASCENDING</Dropdown.Item>
              <Dropdown.Item onClick={handleSort('descending')}>DESCENDING</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>

      </div>
      {displayData(status)} {/* Corrected invocation */}
    </>
  );

}

export default TodoTable;
