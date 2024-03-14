import { Formik, Form, Field, ErrorMessage } from "formik";
import { ITodo } from "../component/Home";
import * as yup from "yup";
import "./AddTodo.css";
import {
  Col,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import { v4 as uuidv4 } from "uuid";

const validationRules = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Description is required"),
  dueDate: yup.date().required("Date is required"),
});

type ValuesType = {
  title: string;
  content: string;
  dueDate: string;
};

const initialValues: ValuesType = {
  title: "",
  content: "",
  dueDate: "",
};

function AddTodo() {
  const navigate = useNavigate();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (values: ValuesType) => {
    const payload: ITodo = {
      id: uuidv4(),
      content: values.content,
      title: values.title,
      dueDate: values.dueDate,
      isComplete: false,
    };

    fetch(`${API_ENDPOINT}todos`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationRules}
      >
        {({ errors, touched }) => (
          <Form>
            <Row className="justify-content-center mt-4">
              <Col md={6}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Field
                    type="text"
                    name="title"
                    className={`form-control ${touched.title && errors.title ? "is-invalid" : ""
                      }`}
                    placeholder="Title"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <Field
                    as="textarea"
                    name="content"
                    className={`form-control ${touched.content && errors.content ? "is-invalid" : ""
                      }`}
                    placeholder="Content"
                  />
                  <ErrorMessage
                    name="content"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date</label>
                  <Field
                    type="date"
                    name="dueDate"
                    className={`form-control ${touched.dueDate && errors.dueDate ? "is-invalid" : ""
                      }`}
                    min={getCurrentDate()}
                  />
                  <ErrorMessage
                    name="dueDate"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <button className="btn btn-primary mt-4 justify-items-center" type="submit">
                  Add
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddTodo;
