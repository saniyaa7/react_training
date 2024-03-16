// TodoTable.js
import React, { ChangeEvent, useEffect, useReducer, useState } from "react";
import {
  Button,
  FormControl,
  InputGroup,
  Table,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ITodo } from "../component/Home";
import "./TodoTable.css";
import { API_ENDPOINT } from "../constants";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  useFetch,
  useDeleteTodo,
  usePatchCheckTodo,
  GetTodoRequest,
} from "../Hook/todo.hook";

interface TodoTableProps {
  showButton: boolean;
  completeTask: boolean;
}
interface State {
  todos: ITodo[];
  status: string;
  search: string;
  toggle: boolean;
  page: number;
  totalPages: number;
  searchParams: GetTodoRequest;
}

const initialSearchParams = {
  _page: 1,
  _limit: 5,
  title_like: "",
};

type Action =
  | { type: "SET_TODOS"; payload: ITodo[] }
  | { type: "SET_STATUS"; payload: string }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_TOGGLE"; payload: boolean }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_TOTAL_PAGES"; payload: number }
  | { type: "SET_SEARCH_PARAMS"; payload: GetTodoRequest };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_TOGGLE":
      return { ...state, toggle: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_TOTAL_PAGES":
      return { ...state, totalPages: action.payload };
    case "SET_SEARCH_PARAMS":
      return { ...state, searchParams: action.payload };
    default:
      return state;
  }
};

function TodoTable({ showButton, completeTask }: TodoTableProps) {
  const initialState = {
    todos: [],
    status: "all",
    search: "",
    toggle: false,
    page: 1,
    totalPages: 1,
    searchParams: initialSearchParams,
  };

  const { deleteTodo, isdeleteSuccess } = useDeleteTodo();
  const { patchCheckTodo, isPatchSuccess } = usePatchCheckTodo();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todos, status, search, toggle, page, totalPages, searchParams } =
    state;
  const { data, error, isLoading, refetch } = useFetch(searchParams);

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_TODOS", payload: data.data });
      dispatch({
        type: "SET_TOTAL_PAGES",
        payload: Math.ceil(data.headers["x-total-count"] / 5),
      });
    }
    if (completeTask)
      dispatch({
        type: "SET_SEARCH_PARAMS",
        payload: { ...searchParams, isComplete: completeTask },
      });
  }, [data, 5]);

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

  const filterTask =
    status === "all"
      ? todos
      : todos.filter((todo: ITodo) => String(todo.isComplete) === status);

  const handleSort = (direction: string) => () => {
    if (direction === "ascending")
      dispatch({
        type: "SET_TODOS",
        payload: [...todos].sort((a, b) => a.title.localeCompare(b.title)),
      });
    else
      dispatch({
        type: "SET_TODOS",
        payload: [...todos].sort((a, b) => b.title.localeCompare(a.title)),
      });
  };

  const handlePageChange = (page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
    dispatch({
      type: "SET_SEARCH_PARAMS",
      payload: { ...searchParams, _page: page },
    });
  };
  console.log(todos);
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
                    <td style={{ width: "15%" }}>{todo.dueDate}</td>
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
                              dispatch({
                                type: "SET_TOGGLE",
                                payload: !toggle,
                              });
                              handleCheck(todo.id, toggle);
                            }}
                            variant={todo.isComplete ? "success" : "secondary"}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <h5>No data available.</h5>
        </div>
      )}
    </>
  );

  const handleStatus = (status: string) => {
    dispatch({ type: "SET_STATUS", payload: status });
  };

  const handleSearchSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "SET_SEARCH_PARAMS",
      payload: { ...searchParams, title_like: search },
    });
  };

  return (
    <>
      <div className="search-bar">
        <Form onSubmit={handleSearchSubmit}>
          <Row>
            <Col xs={12} md={6}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search list"
                  onChange={(e) =>
                    dispatch({ type: "SET_SEARCH", payload: e.target.value })
                  }
                  className="custom-search-bar"
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={2}>
              <Button type="submit">Search</Button>
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
          </Row>
        </Form>
      </div>
      {displayData(status)}
    </>
  );
}

export default TodoTable;
