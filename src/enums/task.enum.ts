export enum TaskStatusEnum {
    Pending = "Pending",
    "In_Progress" = "In_Progress",
    Completed = "Completed",
}

export type TaskStatus = keyof typeof TaskStatusEnum;

export enum TaskPriorityEnum {
    "Low" = "Low",
    "Medium" = "Medium",
    "High" = "High",
}

export type TaskPriority = keyof typeof TaskPriorityEnum;
