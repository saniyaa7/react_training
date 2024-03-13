import TodoTable from "../shareable_component/TodoTable";

export interface ITodo {
  id: string,
  title: string,
  content: string,
  dueDate: string,
  isComplete: boolean
}

function TodoList() {

  return (<div className="App">
    <h1 className="justify-content-center mt-4">Todo-List</h1>
    <TodoTable showButton={true} completeTask={false} />
  </div>
  )

}
export default TodoList;