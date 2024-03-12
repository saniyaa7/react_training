import { useEffect,useState } from "react";
import { ITodo } from "../componenet/TodoList";


let err="";
function useFetch(): {response:ITodo[],err:string,refetchData:(value:boolean)=>void}
{

  const [response,setResponse]=useState<ITodo[]>([]);
  const [refetch,setRefecth] = useState<boolean>(false)

  const refetchData = (value:boolean) =>{
    setRefecth(value)
  }

  useEffect(()=>{
    fetch("http://localhost:8000/todos")
    .then((response) => { return response.json();
    })
    .then((result)=>{const data=result;
      setResponse(data)
     refetchData(false)
    })
    
    .catch((error) => err=error);

  },[refetch]);
  
  return({response,err,refetchData});
}

export default useFetch;