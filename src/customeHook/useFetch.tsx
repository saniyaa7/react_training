import { useEffect,useState } from "react";
import { ITodo } from "../component/TodoList";

let err="";
function useFetch(): [ITodo[], string]
{

  const [response,setResponse]=useState<ITodo[]>([]);

  useEffect(()=>{
    fetch("http://localhost:3060/todos")
    .then((response) => { return response.json();
      // setResponse(data);
    
    })
    .then((result)=>{const data=result;
      setResponse(data);
    })
    
    .catch((error) => err=error);

  },[]);
  
  return([response,err]);
}

export default useFetch;