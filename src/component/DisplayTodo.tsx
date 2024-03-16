import { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ITodo } from "../component/Home";
import { API_ENDPOINT } from "../constants";
import { useFetchById } from "../Hook/todo.hook";

function DisplayTodo() {
  const { id } = useParams<{ id: string }>();
  const { data } = useFetchById(id || "");

  const initialValue = {
    id: "",
    title: "",
    content: "",
    dueDate: "",
    isComplete: false,
  };
  const [todo, setTodo] = useState<ITodo>(initialValue);

  useEffect(() => {
    if (data) {
      setTodo(data.data);
    }
  }, [data]);

  return (
    <div className="App">
      <Container className="mt-4">
        <Row className="d-flex justify-content-left align-items-left">
          <Col>
            <>
              <h4 style={{ fontSize: "28px", marginBottom: "20px" }}>
                Title: {todo.title}
              </h4>
              <p style={{}}>Content: {todo.content}</p>
              <p className="lead">Due Date: {todo.dueDate}</p>
              <span className="lead">
                Status:{" "}
                <Badge>{todo.isComplete ? "Complete" : "Incomplete"}</Badge>
              </span>
            </>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Link to="/" className="btn btn-secondary">
              Back to Todo List
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DisplayTodo;
