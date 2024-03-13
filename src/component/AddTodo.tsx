import { useEffect, useState, ChangeEvent } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import Home, { ITodo } from "../component/Home";
import { v4 as uuidv4 } from "uuid";

function AddTodo() {
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [newDueDate, setNewDueDate] = useState<string>("");

  function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setNewTitle(e.target.value);
  }
  function handleChangeContent(e: ChangeEvent<HTMLInputElement>) {
    setNewContent(e.target.value);
  }
  function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {
    setNewDueDate(e.target.value);
  }
  function handleSubmit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    if (!newTitle.length) {
      alert(`title cannot be empty`);
      return;
    }
    if (!newContent.length) {
      alert(`Content cannot be empty`);
      return;
    }
    if (!newDueDate.length) {
      alert(`Due Date cannot be empty`);
      return;
    }
    fetch(`${API_ENDPOINT}todos`, {
      method: "POST",
      body: JSON.stringify({
        id: uuidv4(),
        content: newContent,
        title: newTitle,
        dueDate: newDueDate,
        isComplete: false,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/");
      });
  }
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <FormControl
                type="text"
                placeholder="Enter title"
                value={newTitle}
                onChange={handleChangeTitle}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <FormControl
                as="textarea"
                placeholder="Enter Content"
                value={newContent}
                onChange={handleChangeContent}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <FormControl
                type="date"
                placeholder="Enter date"
                value={newDueDate}
                onChange={handleChangeDate}
                min={getCurrentDate()}
              />
            </Form.Group>
            <br />
            <Form.Group></Form.Group>
            <br />
            <Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="success" onClick={handleSubmit}>
                  Add Task
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
export default AddTodo;
