import { useEffect, useState } from "react";
import { ITodo } from "../component/Home";
import { API_ENDPOINT } from "../constants";


let err = "";
function useFetch(completeTask: boolean): { response: ITodo[], err: string, refetchData: (value: boolean) => void } {

  const [response, setResponse] = useState<ITodo[]>([]);
  const [refetch, setRefecth] = useState<boolean>(false)

  const refetchData = (value: boolean) => {
    setRefecth(value)
  }

  useEffect(() => {
    let api_url = API_ENDPOINT + 'todos';
    if (completeTask) {
      api_url += '?isComplete=1'
    }
    fetch(api_url)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const data = result;
        setResponse(data)
        refetchData(false)
      })

      .catch((error) => err = error);

  }, [refetch, completeTask]);

  return ({ response, err, refetchData });
}

export default useFetch;