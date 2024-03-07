import { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, InputGroup, Row, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import Home, { ITodo } from "../component/Home";

function AddTodo() {
  
  const navigate=useNavigate();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newDueDate, setNewDueDate] = useState<string>('');
  const [nextId, setNextId] = useState<number>(todos.length + 1)
  const [status, setStatus] = useState(false);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then(res => res.json())
      .then((data: ITodo[]) => {
        setTodos(data)
        setNextId(data.length + 1)
      })
  }, [todos])

  function handleChangeTitle(e: any) {
    console.log(e.target.value)
    setNewTitle(e.target.value)

  }
  function handleChangeContent(e: any) {
    console.log(e.target.value)
    setNewContent(e.target.value)

  }
  function handleChangeDate(e:any)
    {
      setNewDueDate(e.target.value)
    }
  function handleSubmit(e: any) {
    e.preventDefault();
    if (newTitle.length === 0) {
      alert("title cannot be empty");
      return;
    }

    const payload: ITodo = {
      id: nextId.toString(),
      content: newContent,
      title: newTitle,
      dueDate:newDueDate,
      isComplete: false

    }
    fetch(API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { 'Content-type': "application/json; charset=UTF-8" }

    })
      .then(res => res.json())
      .then((data) => {
        setTodos([...todos, data])
        setNewTitle('');
        setNewContent('')
        navigate('/');

      })
  }

  return (<div>
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
        /></Form.Group>
          <br />
        <Form.Group>
        <Form.Label>Due Date</Form.Label>
          <FormControl
            type="date"
            placeholder="Enter date"
            value={newDueDate}
            onChange={handleChangeDate}
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

  </div>);

}
export default AddTodo;