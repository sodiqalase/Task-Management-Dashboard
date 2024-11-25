export enum TaskStatusEnum {
    Pending = "Pending",
    "In Progress" = "In Progress",
    Completed = "Completed",
}

export type TaskStatus = keyof typeof TaskStatusEnum;

export enum TaskPriorityEnum {
    "Low" = "Low",
    "Medium" = "Medium",
    "High" = "High",
}

export type TaskPriority = keyof typeof TaskPriorityEnum;
