import React, { useEffect, useState } from "react";
import useFetch from "./useFetch";

export interface ITodo {
  id: number,
  title: string,
  isComplete: boolean
}


function TodoList() {
  //interface created for todo list

  //fetching data  
  
  //stroring todo-list of type ITodo
  const [todos, setTodos] = useState<ITodo[]>([]);
  //storing value for input
  const [inputValue, setInputValue] = useState('');
  //storing status of show completed task check box
  const [status, setStatus] = useState(false);

  const [data,error]= useFetch();
  console.log(data,error)

  function handleChange(e: any) {
    console.log(e.target.value)
    setInputValue(e.target.value)
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    if (inputValue.length > 0) {
      setTodos([...todos, { id: 6, title: inputValue, isComplete: false }]);
      setInputValue('');
    }
    else
      alert("empty task cannot be added")
  }
  const handleDelete = (todo: ITodo) => {
    todos.splice(todos.indexOf(todo), 1);
    setTodos([...todos]);
  };

  useEffect(()=>setTodos(data),[]);

  return (<div style={{ backgroundColor: "lightgray", padding: "20px",  maxWidth: "600px", margin: "auto" }}>
    {/* taking input */}
    
    {/* setTodos(data); */}
    <h1>Todo-List</h1>

    <form >
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleSubmit} style={{color:"white",backgroundColor:"green"}}>Add Todo</button>
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
            <div style={{color:"black"}}>
              <input
                type="checkbox"
                onChange={() => {
                  const todoStatus = todo.isComplete
                  todo.isComplete = !todoStatus
                  setTodos([...todos])
                }}
                checked={todo.isComplete}
              />
              <span  style={{ flexGrow: 1, textDecoration: todo.isComplete ? "line-through" : "none" }}>{todo.title}</span>
              <button onClick={() => handleDelete(todo)} style={{backgroundColor:"red",color:"white"}}>Delete</button>
              
            </div>
          )}
        </div>
      ))}
    </ul>

  </div>
  )

}
export default TodoList;