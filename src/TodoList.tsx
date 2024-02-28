import React,{useState} from "react";


function TodoList()
{const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  function handleChange(e:any)
{
  console.log(e.target.value)
  setInputValue(e.target.value)
}
function handleSubmit(e:any)
{
e.preventDefault();
setTodos([...todos, inputValue]);

  setInputValue('');


}

  return(<div>
    <form>
      <input type="text" value={inputValue} onChange={handleChange}/>
      <button onClick={handleSubmit}>Add Todo</button>
    </form>
    <ul>
        {todos.map((todo) => (
        
          <li key={todo}>{todo}
           <button>Delete</button>
          </li>
        ))}
      </ul>
  </div>);

}
export default TodoList;