import { Ref } from "vue";
import useFetch from "../composables/useFetch";
import { PaginatedResponse } from "../interface/api.interface";
import { ITask } from "../interface/task.interface";
import { useCustomMutation } from "../composables/useMutation";

export const TaskQueryKey = {
    fetchAllTasks: "FETCH_ALL_TASKS",
};

export const TaskApiUrls = {
    fetchAllTasks: "/task",
    createTask: "/task",
    editTask: (_id: string) => `/task/${_id}`,
    deleteTask: (_id: string) => `/task/${_id}`,
};

export const TaskService = {
    getTasks: (params: Ref<any>) => {
        return useFetch<PaginatedResponse<ITask[]>>({
            key: TaskQueryKey.fetchAllTasks,
            url: TaskApiUrls.fetchAllTasks,
            params,
        });
    },
    createTask: () =>
        useCustomMutation({
            method: "post",
            url: TaskApiUrls.createTask,
            customSuccessMessage: "Your task was created successfully.",
            invalidateKeys: [TaskQueryKey.fetchAllTasks],
        }),
    editTask: () =>
        useCustomMutation({
            method: "patch",
            url: ({ taskId }) => TaskApiUrls.editTask(taskId),
            customSuccessMessage: "Your task was updated successfully.",
            invalidateKeys: [TaskQueryKey.fetchAllTasks],
        }),
    deleteTask: () =>
        useCustomMutation({
            method: "delete",
            url: ({ taskId }) => TaskApiUrls.deleteTask(taskId),
            customSuccessMessage: "Your task was successfully deleted",
            invalidateKeys: [TaskQueryKey.fetchAllTasks],
        }),
};
