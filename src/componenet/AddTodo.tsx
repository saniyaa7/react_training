import { useEffect, useState, FormEvent } from "react";
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  Row,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import { v4 as uuidv4 } from "uuid";

export interface ITodo {
  id: string;
  title: string;
  content: string;
  isComplete: boolean;
}
function AddTodo() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [nextId, setNextId] = useState<number>(todos.length + 1);

  const [status, setStatus] = useState(false);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data: ITodo[]) => {
        setTodos(data);
        setNextId(data.length + 1);
      });
  }, [todos]);

  function handleSubmit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    console.log(newTitle.length);
    if (!newTitle.length) {
      alert("title cannot be empty");
      return;
    }

    fetch(API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        id: uuidv4(),
        content: newContent,
        title: newTitle,
        isComplete: false,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        setNewTitle("");
        setNewContent("");
        navigate("/");
      });
  }

  return (
    <div>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Add title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </InputGroup>
          <br />
          <FormControl
            as="textarea"
            placeholder="Add Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <br />
          <div className="d-flex justify-content-center">
            <Button variant="success" onClick={handleSubmit}>
              Add Task
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default AddTodo;
