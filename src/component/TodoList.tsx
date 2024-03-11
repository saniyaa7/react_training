import React, { useEffect, useState } from "react";
import useFetch from "../customeHook/useFetch";

//interface created for todo list
export interface ITodo {
  id: number,
  title: string,
  isComplete: boolean
}

function TodoList() {
  //stroring todo-list of type ITodo
  const [todos, setTodos] = useState<ITodo[]>([]);
  //storing value for input
  const [inputValue, setInputValue] = useState('');
  //storing status of show completed task check box
  const [status, setStatus] = useState(false);
  //fetching data
  const [data, error] = useFetch();
  console.log(data)


  function handleChange(e: any) {

    setInputValue(e.target.value)
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    if (inputValue.length > 0) {
      const todoItem = {
        id: Math.random() * 2000,
        title: inputValue,
        isComplete: false,
      };
      //add todo in todo-list
      setTodos([...todos, todoItem]);
      setInputValue('');
    }
    else
      alert("empty task cannot be added")
  }
  const handleDelete = (todo: ITodo) => {
    const filteredTodos = todos.filter((task) => task.id !== todo.id);
    setTodos(filteredTodos);
  };
  //fetch data using json-serverand set that data to todo-list
  useEffect(() => setTodos(data), [data]);

  return (<div style={{ backgroundColor: "lightgray", padding: "20px", maxWidth: "600px", margin: "auto" }}>

    <h1>Todo-List</h1>

    <form >
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleSubmit} style={{ color: "white", backgroundColor: "green" }}>Add Todo</button>
    </form>

    <label>
      <input type="checkbox" onChange={() => setStatus(!status)} />
      <span>Show Completed</span>
    </label>

    {/* logic for show completed task */}
    <ul>
      {todos.map((todo: ITodo, index: number) => (
        <div key={index}>
          {(!status || (status && todo.isComplete)) && (
            <div style={{ color: "black" }}>
              <input
                type="checkbox"
                onChange={() => {
                  const todoStatus = todo.isComplete
                  todo.isComplete = !todoStatus
                  setTodos([...todos])
                }}
                checked={todo.isComplete}
              />
              <span style={{ flexGrow: 1, textDecoration: todo.isComplete ? "line-through" : "none" }}>{todo.title}</span>
              <button onClick={() => handleDelete(todo)} style={{ backgroundColor: "red", color: "white" }}>Delete</button>

            </div>
          )}
        </div>
      ))}
    </ul>

  </div>
  )

}
export default TodoList;