import React, { useState } from "react";


function TodoList() {
  //interface created for todo list
  interface ITodo {
    id: number,
    title: string,
    isComplete: boolean
  }

  //initial data which will be stored in todo-list
  const initialData: ITodo[] = [
    { id: 1, title: "todays taks", isComplete: true },
    { id: 2, title: "Assignment", isComplete: true }

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
              <button onClick={() => handleDelete(todo)}>Delete</button>
              <input
                type="checkbox"
                onChange={() => {
                  const todoStatus = todo.isComplete
                  todo.isComplete = !todoStatus
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