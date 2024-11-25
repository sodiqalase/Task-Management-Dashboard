<script setup lang="ts">
import { TaskStatus } from "../enums/task.enum";

interface Props {
    status: TaskStatus;
}

const { status } = defineProps<Props>();

const statusMap: Record<TaskStatus, string> = {
    Pending: "bg-yellow-100 text-yellow-500",
    "In Progress": "bg-blue-100 text-blue-500",
    Completed: "bg-green-100 text-green-500",
};
</script>

<template>
    <span
        :class="[
            'font-medium rounded px-2 py-0.5 text-xs inline-block whitespace-nowrap',
            statusMap[status],
        ]"
    >
        {{ status }}
    </span>
</template>


