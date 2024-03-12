import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ITodo {
  id: string,
  title: string,
  isComplete: boolean
}

function TodoList() {
  
  const initialData: ITodo[] = [
    { id: uuidv4(), title: "todays taks", isComplete: true },
    {  id: uuidv4(), title: "Assignment", isComplete: true }

  ]
  //stroring todo-list of type ITodo
  const [todos, setTodos] = useState<ITodo[]>(initialData);
  //storing value for input
  const [inputValue, setInputValue] = useState('');
  //storing status of show completed task check box
  const [status, setStatus] = useState(false);

  function handleChange(e: any) {
    console.log(e.target.value)
    setInputValue(e.target.value)
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    if (inputValue.length > 0) {
      setTodos([...todos, { id: uuidv4(), title: inputValue, isComplete: false }]);
      setInputValue('');
    }
    else
      alert("empty task cannot be added")
  }
  const handleDelete = (id: string) => {
    const filteredTasks = todos.filter((task) => task.id !== id);
    setTodos(filteredTasks);
  };



  return (<div>
    {/* taking input */}

    <form>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleSubmit}>Add Todo</button>
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
            <>
              {todo.title}
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
              <input
                type="checkbox"
                onChange={() => {
                  todo.isComplete = !todo.isComplete
                  setTodos([...todos])
                }}
                checked={todo.isComplete}
              />
            </>
          )}
        </div>
      ))}
    </ul>

  </div>
  )

}
export default TodoList;