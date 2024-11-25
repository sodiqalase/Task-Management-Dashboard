import { TaskPriority, TaskStatus } from "../enums/task.enum";

export interface ITask {
    _id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    due_date: string;
}
