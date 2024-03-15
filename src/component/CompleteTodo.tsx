import TodoTable from "../shareable_component/TodoTable";

function CompleteTodo() {
  return (<div className="text-center">
    <h2>Completed Task</h2>
    <TodoTable showButton={false} completeTask={true} />
  </div>)

}
export default CompleteTodo;