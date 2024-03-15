import { useQuery, useMutation } from "@tanstack/react-query";
import { ITodo } from "../component/Home";
import axios from "axios";
import { API_ENDPOINT } from "../constants";

interface GetTodoRequest {
  _page: number;
  _limit: number;
}

interface PatchTodoRequest {
  id: string;
  checked: boolean;
}

export const useFetch = (completeTask: boolean, params: GetTodoRequest) => {
  let api_url = API_ENDPOINT + "todos";
  if (completeTask) api_url += "?isComplete=true";

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["todos", params],
    queryFn: async () =>
      await axios.get<ITodo[]>(api_url, { params }).then((res) => res),
  });

  return { data, error, isLoading, refetch };
};

export const AddTodoMutation = () => {
  return useMutation({
    mutationKey: ["todos"],
    mutationFn: async (payload: any) => {
      const { data } = await axios.post(`${API_ENDPOINT}todos`, payload); // Remove the wrapping object
      return data;
    },
  });
};

export const useDeleteTodo = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`${API_ENDPOINT}todos/${id}`);
    },
  });
  return {
    deleteTodo: mutate,
    isdeleteSuccess: isSuccess,
    isDeletePending: isPending,
  };
};

export const usePatchCheckTodo = () => {
  // const queryClient = useQueryClient()
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: ({ id, checked }: PatchTodoRequest) => {
      return axios.patch(`${API_ENDPOINT}todos/${id}`, { isComplete: checked });
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (err) => {
      alert(err);
    },
  });
  return {
    patchCheckTodo: mutate,
    isPatchSuccess: isSuccess,
    isPatchPending: isPending,
  };
};
