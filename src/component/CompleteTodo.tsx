import TodoTable from "../shareable_component/TodoTable";

function CompleteTodo()
{
  return(<div>
    <h1>All Completed Task</h1>
    <TodoTable showButton={false} completeTask={true}/>
  </div>)

}
export default CompleteTodo;