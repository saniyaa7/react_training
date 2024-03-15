// TodoTable.js
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputGroup,
  Table,
  Row,
  Col,
  Form
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ITodo } from "../component/Home";
import "./TodoTable.css";
import { API_ENDPOINT } from "../constants";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useFetch, useDeleteTodo, usePatchCheckTodo, GetTodoRequest } from "../Hook/todo.hook";

interface TodoTableProps {
  showButton: boolean;
  completeTask: boolean;
}

const initialSearchParams = {
  _page: 1,
    _limit: 5,
    title_like:""
}

function TodoTable({ showButton, completeTask }: TodoTableProps) {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams,setSearchParams] = useState<GetTodoRequest>(initialSearchParams)

  const { data, error, isLoading, refetch } = useFetch(completeTask, searchParams);

  const { deleteTodo, isdeleteSuccess } = useDeleteTodo();
  const { patchCheckTodo, isPatchSuccess } = usePatchCheckTodo();

  useEffect(() => {
    if (data) {
      setTodos(data.data);
      console.log(data.headers)
      setTotalPages(Math.ceil(data.headers["x-total-count"] / 5));
    }
  }, [data, 5]);

  useEffect(() => {
    if (data) {
      setTodos(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (isPatchSuccess || isdeleteSuccess) {
      refetch();
    }
  }, [isPatchSuccess, isdeleteSuccess, refetch]);

  const deleteTodoFun = async (id: string) => {
    try {
      await deleteTodo(id);
      refetch();
    } catch (err) {
      console.log("Error in deleting task", err);
    }
  };

  const handleCheck = (id: string, checked: boolean) => {
    patchCheckTodo({ id, checked });
  };

  // const currentDate = new Date();
  // let expiredTodos = todos.filter((todo) => {
  //   const dueDate = new Date(todo.dueDate);
  //   return (
  //     !isNaN(dueDate.getTime()) && dueDate.getTime() >= currentDate.getTime()
  //   );
  // });

  const filterTask =
    status === "all"
      ? todos
      : todos.filter(
          (todo: ITodo) => String(todo.isComplete) === status
        );
  // const searchFilter = filterTask.filter((item) => {
  //   return search.toLocaleLowerCase() === ""
  //     ? item
  //     : item.title.toLocaleLowerCase().includes(search);
  // });

  const handleSort = (direction: string) => () => {
    if (direction === "ascending")
      setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
    else setTodos([...todos].sort((a, b) => b.title.localeCompare(a.title)));
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    setSearchParams(prevState => ({...prevState,_page:page}))

  };

  const displayData = (status: string) => (
    <>
      {Boolean(filterTask.length) ? (
        <div>
          <Table striped bordered hover className="todo-table text-center">
            <thead>
              <tr>
                <th>Number</th>
                <th>Title</th>
                <th>Due Date</th>
                {showButton && (
                  <>
                    <th style={{ width: "15%" }}>Action</th>
                    <th style={{ width: "25%" }}>Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filterTask.map((todo, index) => (
                <tr key={todo.id}>
                  <>
                    <td style={{ width: "5%" }}>{index + 1}</td>
                    <td>
                      <Link to={`/todo-add/${todo.id}`} className="todo-link">
                        {todo.title}
                      </Link>
                    </td>
                    <td>{todo.dueDate}</td>
                    {showButton && (
                      <>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deleteTodoFun(todo.id)}
                          >
                            DELETE
                          </Button>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            onClick={() => {
                              setToggle(!toggle);
                              handleCheck(todo.id, toggle);
                            }}
                            variant={todo.isComplete ? "secondary" : "success"}
                          >
                            {todo.isComplete
                              ? "MARK AS INCOMPLETE"
                              : "MARK AS COMPLETE"}
                          </Button>
                        </td>
                      </>
                    )}
                  </>
                </tr>
              ))}
            </tbody>
          </Table>

          <div>
            <button
              className="btn btn-primary"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            {page}/{totalPages}
            <button
              className="btn btn-primary ms-2"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
            >
              Next
            </button>
            <br />
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <h5>No data available.</h5>
        </div>
      )}
    </>
  );

  const handleStatus = (status: string) => {
    setStatus(status);
  };

  const handleSearchSubmit = (e:ChangeEvent<HTMLFormElement>) =>{
    e.preventDefault()
    setSearchParams(prevState => ({...prevState,title_like:search}))
  }

  return (
    <>
      <div className="search-bar">
      <Form onSubmit={handleSearchSubmit}>
        <Row>
          <Col xs={12} md={6}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search list"
                onChange={(e) => setSearch(e.target.value)}
                className="custom-search-bar"
              />
            </InputGroup>

          </Col>
          <Col xs={12} md={2}>
            <DropdownButton id="status-dropdown" title="Status">
              <Dropdown.Item onClick={() => handleStatus("all")}>
                ALL
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatus("true")}>
                COMPLETED
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatus("false")}>
                INCOMPLETED
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col xs={12} md={2}>
            <DropdownButton id="sort-dropdown" title="Sort">
              <Dropdown.Item onClick={handleSort("ascending")}>
                ASCENDING
              </Dropdown.Item>
              <Dropdown.Item onClick={handleSort("descending")}>
                DESCENDING
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col xs={12} md={2}>
            <Button type="submit">Search</Button>
          </Col>
        </Row>
        </Form>
      </div>
      {displayData(status)}
    </>
  );
}

export default TodoTable;
