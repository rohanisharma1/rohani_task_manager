// this file I have added, will make use of it to modify task related calls with react query further

import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthHeaders } from "./utils/auth";

const baseURL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${baseURL}/api`,
});

api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    ...getAuthHeaders(),
  };
  return config;
});

export const apiClient = api;

export const getTasks = () =>
  apiClient.get("/tasks").then((response) => response.data);

export const createTask = (task) =>
  apiClient.post("/tasks", task).then((response) => response.data);

export const useGetTasks = () =>
  useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData(["tasks"]);
      const optimisticTask = {
        ...newTask,
        id: Date.now().toString(),
        isNew: true,
      };
      queryClient.setQueryData(["tasks"], (old) => [
        ...(old || []),
        optimisticTask,
      ]);
      return { previousTasks };
    },
    onError: (_err, _newTask, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
