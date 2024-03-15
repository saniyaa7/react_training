// TodoTable.js
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputGroup,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ITodo } from "../component/Home";
import "./TodoTable.css";
import { API_ENDPOINT } from "../constants";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useFetch, useDeleteTodo, usePatchCheckTodo } from "../Hook/todo.hook";

interface TodoTableProps {
  showButton: boolean;
  completeTask: boolean;
}

function TodoTable({ showButton, completeTask }: TodoTableProps) {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [totalpages, setTotalPages] = useState(2);

  const { data, error, isLoading, refetch } = useFetch(completeTask, {
    _page: page,
    _limit: limit,
  });

  const { deleteTodo, isdeleteSuccess } = useDeleteTodo();
  const { patchCheckTodo, isPatchSuccess } = usePatchCheckTodo();

  useEffect(() => {
    if (data) {
      setTodos(data.data);
      setTotalPages(Math.ceil(data.headers["x-total-count"] / limit));
    }
  }, [data, limit]);

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

  const currentDate = new Date();
  let expiredTodos = todos.filter((todo) => {
    const dueDate = new Date(todo.dueDate);
    return (
      !isNaN(dueDate.getTime()) && dueDate.getTime() >= currentDate.getTime()
    );
  });

  const filterTask =
    status === "all"
      ? expiredTodos
      : expiredTodos.filter(
          (todo: ITodo) => String(todo.isComplete) === status
        );
  const serachFilter = filterTask.filter((item) => {
    return search.toLocaleLowerCase() === ""
      ? item
      : item.title.toLocaleLowerCase().includes(search);
  });

  const handleSort = (direction: string) => () => {
    if (direction === "ascending")
      setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
    else setTodos([...todos].sort((a, b) => b.title.localeCompare(a.title)));
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    // refetchTodos()
  };

  const displayData = (status: string) => (
    <Table striped bordered hover className="todo-table text-center">
      <thead>
        <tr>
          <th>Number</th>
          <th>Title</th>
          <th>Due</th>
          {showButton && (
            <>
              <th style={{ width: "15%" }}>Action</th>
              <th style={{ width: "25%" }}>Status</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {serachFilter.map((todo, index) => (
          <tr key={todo.id}>
            <>
              <td style={{ width: "5%" }}>{index + 1}</td>
              <td>
                <Link to={`/todo-add/${todo.id}`} className="todo-link">
                  {todo.title}
                </Link>
              </td>
              <td>{calculateDueTimeRemaining(todo.dueDate)}</td>
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
  );
  const calculateDueTimeRemaining = (dueDate: string): string => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDiff = dueDateObj.getTime() - currentDate.getTime();

    if (timeDiff < 0) {
      return "Expired";
    }

    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);

    if (daysDiff > 0) {
      return `${daysDiff} day${daysDiff !== 1 ? "s" : ""} `;
    } else if (hoursDiff > 0) {
      return `${hoursDiff} hour${hoursDiff !== 1 ? "s" : ""} `;
    } else if (minutesDiff > 0) {
      return `${minutesDiff} minute${minutesDiff !== 1 ? "s" : ""} `;
    } else {
      return `${secondsDiff} second${secondsDiff !== 1 ? "s" : ""} `;
    }
  };

  const handleStatus = (status: string) => {
    setStatus(status);
    // displayData(status) //no need to write displayData here
  };

  return (
    <>
      <div className="search-bar">
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
          <Col xs={12} md={3}>
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
          <Col xs={12} md={3}>
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
      </div>
      {displayData(status)}
      <div>
        <input
          className="mt-3 w-20"
          type="number"
          placeholder="set limit"
          value={limit}
          onChange={(e) => {
            setLimit(parseInt(e.target.value));
            setPage(1);
          }}
          style={{ marginRight: "100px" }}
        />
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        {page}/{totalpages}
        <button
          className="btn btn-primary ms-2"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalpages}
        >
          Next
        </button>
        <br />
      </div>
    </>
  );
}

export default TodoTable;
