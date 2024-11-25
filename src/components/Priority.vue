<script setup lang="ts">
import { TaskPriority } from "../enums/task.enum";

interface Props {
    priority: TaskPriority;
}

const { priority } = defineProps<Props>();

const statusMap: Record<TaskPriority, string> = {
    Low: "bg-yellow-100 text-yellow-500",
    Medium: "bg-blue-100 text-blue-500",
    High: "bg-red-100 text-red-500",
};
</script>

<template>
    <span
        :class="[
            'font-medium rounded px-2 py-0.5 text-xs inline-block whitespace-nowrap',
            statusMap[priority],
        ]"
    >
        {{ priority }}
    </span>
</template>
