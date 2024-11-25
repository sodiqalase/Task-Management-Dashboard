<script setup lang="ts">
import Action from "../../components/Action.vue";
import TaskDetailsModal from "./components/TaskDetailsModal.vue";
import Table from "../../components/table/Table.vue";
import { ref } from "vue";
import { ITask, } from "../../interface/task.interface";
import Status from "../../components/Status.vue";
import Priority from "../../components/Priority.vue";
import { formatDate } from "../../utils/date.util";
import ConfirmationModal from "../../components/modal/ConfirmationModal.vue";
import AddTaskModal from "./components/AddTaskModal.vue";



const headers = ["Title", "Description", "Status", "Priority", "DueDate"];
const rows = [
    {
        id: 1,
        title: "Task 1",
        description: "Description of task 1",
        status: "Pending",
        priority: "High",
        dueDate: "2024-11-20T12:00:00Z",
    },
    {
        id: 2,
        title: "Task 2",
        description: "Description of task 2",
        status: "In Progress",
        priority: "Medium",
        dueDate: "2024-11-25T15:00:00Z",
    },
    {
        id: 3,
        title: "Task 3",
        description: "Description of task 3",
        status: "Completed",
        priority: "Low",
        dueDate: "2024-11-18T09:30:00Z",
    },
    {
        id: 4,
        title: "Task 4",
        description: "Description of task 4",
        status: "Pending",
        priority: "High",
        dueDate: "2024-11-28T17:00:00Z",
    },
    {
        id: 5,
        title: "Task 5",
        description: "Description of task 5",
        status: "In Progress",
        priority: "Low",
        dueDate: "2024-12-02T11:45:00Z",
    },
    {
        id: 6,
        title: "Task 6",
        description: "Description of task 6",
        status: "Pending",
        priority: "Medium",
        dueDate: "2024-12-05T14:00:00Z",
    },
    {
        id: 7,
        title: "Task 7",
        description: "Description of task 7",
        status: "Completed",
        priority: "High",
        dueDate: "2024-11-19T08:00:00Z",
    },
    {
        id: 8,
        title: "Task 8",
        description: "Description of task 8",
        status: "In Progress",
        priority: "Medium",
        dueDate: "2024-11-22T10:30:00Z",
    },
    {
        id: 9,
        title: "Task 9",
        description: "Description of task 9",
        status: "Pending",
        priority: "High",
        dueDate: "2024-12-10T16:00:00Z",
    },
    {
        id: 10,
        title: "Task 10",
        description: "Description of task 10",
        status: "Completed",
        priority: "Low",
        dueDate: "2024-11-15T13:00:00Z",
    },
];

const details = ref<ITask | null>(null);
const deleteId = ref<number | null>(null);

function setTask(task: ITask) {
    details.value = task;
}

function clearTask() {
    details.value = null;
}
</script>

<template>
    <section class="pt-4">
        <TaskDetailsModal :data="details" :onClose="clearTask" v-if="!!details" />
        <ConfirmationModal
        v-if="!!deleteId"
        :id="deleteId"
        :onClose="()=>{
          deleteId = null
        }"
        />

        <AddTaskModal
        :onClose="()=>{
         
        }"
        />

        <Table
            :isLoading="false"
            :tableData="rows"
            :headers="headers"
            :currentPage="1"
            :totalCount="rows.length"
        >
            <template #tr="{ row }">
                <td :class="['px-5 py-3 text-xs font-medium whitespace-nowrap', 'cursor-pointer']">
                    {{ (row as ITask).title }}
                </td>
                <td :class="['px-5 py-3 text-xs font-medium', 'cursor-pointer max-w-[350px]']">
                    {{ (row as ITask).description }}
                </td>
                <td :class="['px-5 py-3 text-xs font-medium', 'cursor-pointer max-w-[350px]']">
                    <Status :status="(row as ITask).status" />
                </td>
                <td :class="['px-5 py-3 text-xs font-medium', 'cursor-pointer max-w-[350px]']">
                  <Priority :priority="(row as ITask).priority" />
                </td>
                <td :class="['px-5 py-3 text-xs font-medium', 'cursor-pointer max-w-[350px]']">
                    {{ formatDate((row as ITask).dueDate) }}
                </td>
                <td :class="['px-5 py-3 whitespace-nowrap text-xs font-medium', 'cursor-pointer']">
                    <Action
                        :options="[
                            {
                                name: 'View',
                                onClick: () => setTask(row),
                            },
                            {
                                name: 'Edit',
                                onClick: () => clearTask(),
                            },
                            {
                                name: 'Delete',
                                onClick: () => deleteId=(row as ITask).id,
                            },
                        ]"
                    />
                </td>
            </template>
        </Table>
    </section>
</template>
