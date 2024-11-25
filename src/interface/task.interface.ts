import { TaskPriority, TaskStatus } from "../enums/task.enum";

export interface ITask {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}
