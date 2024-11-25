import { Ref } from "vue";
import useFetch from "../composables/useFetch";
import { PaginatedResponse } from "../interface/api.interface";
import { ITask } from "../interface/task.interface";

export const TaskQueryKey = {
    fetchAllTasks: "FETCH_ALL_TASKS",
};

export const TaskApiUrls = {
    fetchAllTasks: "/task",
};

export const TaskService = {
    getTasks: (params: Ref<any>) => {
        return useFetch<PaginatedResponse<ITask[]>>({
            key: TaskQueryKey.fetchAllTasks,
            url: TaskApiUrls.fetchAllTasks,
            params,
        });
    },
};
