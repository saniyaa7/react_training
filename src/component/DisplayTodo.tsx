import { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Home, { ITodo } from "../component/Home";
import { API_ENDPOINT } from "../constants";

function DisplayTodo() {
  const [todo, setTodo] = useState<ITodo>({ id: "", title: "", content: "", dueDate: "", isComplete: false });
  const { id } = useParams();
  useEffect(() => {
    fetch(API_ENDPOINT + 'todos/' + id)
      .then(res => res.json())
      .then(data => setTodo(data))

  }, [id])
  return (<div className="App">
    <Container className="mt-4">
      <Row>
        <Col>
          <>
            <h4>Title: {todo.title}</h4>
            <h4>Content: {todo.content}</h4>
            <h4>Due Date: {todo.dueDate}</h4>
            <span>Status: {" "}
              <Badge>
                {todo.isComplete ? "Complete" : "Incomplete"}
              </Badge>
            </span>
          </>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Link to="/">Back to Todo List</Link>
        </Col>
      </Row>
    </Container>

  </div>)

}
export default DisplayTodo;