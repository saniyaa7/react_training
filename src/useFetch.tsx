import { useEffect,useState } from "react";
import { ITodo } from "./TodoList";

const url="http://localhost:3060/todos";
let err="";
function useFetch(): [ITodo[], string]
{

  const [response,setResponse]=useState<ITodo[]>([]);

  useEffect(()=>{
    fetch("http://localhost:8000/todos")
    .then((response) => { return response.json();
      // setResponse(data);
    //  console.log(data);
    })
    .then((result)=>{const data=result;
      setResponse(data);})
    
    .catch((error) => err=error);

  },[]);
  
  return([response,err]);
}

export default useFetch;