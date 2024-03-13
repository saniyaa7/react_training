import { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Home, { ITodo } from "../component/Home";
import { API_ENDPOINT } from "../constants";

function DisplayTodo() {
  const initialValue = {
    id: "",
    title: "",
    content: "",
    dueDate: "",
    isComplete: false
  };
  const [todo, setTodo] = useState<ITodo>(initialValue);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${API_ENDPOINT}todos/${id}`)
      .then(res => res.json())
      .then(data => setTodo(data));
  }, [id]);
  let color;
  if (todo.isComplete)
    color = "success";
  else
    color = "danger";

  return (
    <div className="App ">
      <Container className="mt-4 ">
        <Row className="d-flex justify-content-left align-items-left">
          <Col>
            <>
              {/* Apply inline styles to make the title bigger and centered horizontally */}
              <h4 style={{ fontSize: '28px', marginBottom: '20px' }}>Title: {todo.title}</h4>
              <p style={{}}>Content: {todo.content}</p>
              <p className="lead">Due Date: {todo.dueDate}</p>
              <span className="lead">Status: {" "}
                <Badge>
                  {todo.isComplete ? "Complete" : "Incomplete"}
                </Badge>
              </span>
            </>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Link to="/" className="btn btn-secondary">Back to Todo List</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default DisplayTodo;