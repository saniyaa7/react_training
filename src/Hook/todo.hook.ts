import { useQuery, useMutation } from "@tanstack/react-query";
import { ITodo } from "../component/Home";
import axios from "axios";
import { API_ENDPOINT } from "../constants";

export interface GetTodoRequest {
  isComplete?: boolean;
  _page: number;
  _limit: number;
  title_like: string;
}

interface PatchTodoRequest {
  id: string;
  checked: boolean;
}
const api_url = `${API_ENDPOINT}todos`;

export const useFetch = (params: GetTodoRequest) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["todos", params],
    queryFn: async () =>
      await axios.get<ITodo[]>(api_url, { params }).then((res) => res),
  });
  return { data, error, isLoading, refetch };
};

export const useFetchById = (id: string) => {
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => await axios.get(`${api_url}/${id}`).then((res) => res),
  });
  return { data };
};

export const AddTodoMutation = () => {
  return useMutation({
    mutationKey: ["todos"],
    mutationFn: async (payload: any) => {
      await axios.post(api_url, payload);
    },
  });
};

export const useDeleteTodo = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationKey: ["todos"],
    mutationFn: (id: string) => {
      return axios.delete(`${api_url}/${id}`);
    },
  });
  return {
    deleteTodo: mutate,
    isdeleteSuccess: isSuccess,
    isDeletePending: isPending,
  };
};

export const usePatchCheckTodo = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: ({ id, checked }: PatchTodoRequest) => {
      return axios.patch(`${api_url}/${id}`, { isComplete: checked });
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
