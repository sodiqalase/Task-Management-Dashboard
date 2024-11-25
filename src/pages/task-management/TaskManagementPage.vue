<script setup lang="ts">
import Action from "../../components/Action.vue";
import TaskDetailsModal from "./components/TaskDetailsModal.vue";
import Table from "../../components/table/Table.vue";
import { computed, ref } from "vue";
import { ITask } from "../../interface/task.interface";
import Status from "../../components/Status.vue";
import Priority from "../../components/Priority.vue";
import { formatDate } from "../../utils/date.util";
import ConfirmationModal from "../../components/modal/ConfirmationModal.vue";
import AddTaskModal from "./components/AddTaskModal.vue";
import TaskFilters from "./components/TaskFilters.vue";
import { TaskService } from "../../services/task.service";

import { useUrlState } from "../../composables/useURLQuery";

const headers = ["Title", "Description", "Status", "Priority", "DueDate"];

const page = useUrlState("page", "1", (x) => Number(x));
const status = useUrlState("status", "");
const priority = useUrlState("priority", "");
const sortBy = useUrlState("sortBy", "");

const fetchParams = computed(() => ({
    page: page.value,
    status: status.value,
    priority: priority.value,
    sortBy: sortBy.value,
    limit: 10,
}));

const details = ref<ITask | null>(null);
const deleteId = ref<string | null>(null);
const addEditTask = ref<{ isOpen: boolean; data: ITask | null }>({
    isOpen: false,
    data: null,
});

const { isLoading, data } = TaskService.getTasks(fetchParams);

const tableData = computed(() => {
    return data.value?.data ?? [];
});

const openTaskModal = (data: ITask | null) => {
    addEditTask.value = { isOpen: true, data };
};
const closeTaskModal = () => {
    addEditTask.value = { isOpen: false, data: null };
};

function setTask(task: ITask) {
    details.value = task;
}

function clearTask() {
    details.value = null;
}
</script>

<template>
    <section class="pt-4">
        <TaskDetailsModal
            :data="details"
            :onClose="clearTask"
            v-if="!!details"
        />
        <ConfirmationModal
            v-if="!!deleteId"
            :id="deleteId"
            :onClose="
                () => {
                    deleteId = null;
                }
            "
        />

        <AddTaskModal
            :data="addEditTask.data"
            v-if="addEditTask.isOpen"
            :onClose="closeTaskModal"
        />

        <TaskFilters :addTask="() => openTaskModal(null)" />
        <Table
            :isLoading="isLoading"
            :tableData="tableData"
            :headers="headers"
            :currentPage="1"
            :totalCount="tableData.length"
        >
            <template #tr="{ row }">
                <td
                    :class="[
                        'px-5 py-3 text-xs font-medium whitespace-nowrap',
                        'cursor-pointer',
                    ]"
                >
                    {{ (row as ITask).title }}
                </td>
                <td
                    :class="[
                        'px-5 py-3 text-xs font-medium',
                        'cursor-pointer max-w-[350px]',
                    ]"
                >
                    {{ (row as ITask).description }}
                </td>
                <td
                    :class="[
                        'px-5 py-3 text-xs font-medium',
                        'cursor-pointer max-w-[350px]',
                    ]"
                >
                    <Status :status="(row as ITask).status" />
                </td>
                <td
                    :class="[
                        'px-5 py-3 text-xs font-medium',
                        'cursor-pointer max-w-[350px]',
                    ]"
                >
                    <Priority :priority="(row as ITask).priority" />
                </td>
                <td
                    :class="[
                        'px-5 py-3 text-xs font-medium',
                        'cursor-pointer max-w-[350px]',
                    ]"
                >
                    {{ formatDate((row as ITask).due_date) }}
                </td>
                <td
                    :class="[
                        'px-5 py-3 whitespace-nowrap text-xs font-medium',
                        'cursor-pointer',
                    ]"
                >
                    <Action
                        :options="[
                            {
                                name: 'View',
                                onClick: () => setTask(row),
                            },
                            {
                                name: 'Edit',
                                onClick: () => openTaskModal(row),
                            },
                            {
                                name: 'Delete',
                                onClick: () => (deleteId = (row as ITask)._id),
                            },
                        ]"
                    />
                </td>
            </template>
        </Table>
    </section>
</template>
