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
import { useRoute } from "vue-router";

const headers = ["Title", "Description", "Status", "Priority", "DueDate"];
const route = useRoute()

const fetchParams = computed(() => { 
   return {
  page: route.query.page??"1",
  limit: 10, 
}
 });

const details = ref<ITask | null>(null);
const deleteId = ref<number | null>(null);
const addEditTask = ref<{isOpen:boolean; data:ITask | null}>({isOpen:false,data:null});

const {isLoading,data} = TaskService.getTasks(fetchParams)

const tableData = computed(() => { 
    return data.value?.data??[]
 })


const openTaskModal = (data:ITask|null) => { 
    addEditTask.value ={isOpen:true,data}
 }
const closeTaskModal = () => { 
    addEditTask.value ={isOpen:false,data:null}
 }

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

        <AddTaskModal :data="addEditTask.data" v-if="addEditTask.isOpen" :onClose="closeTaskModal" />






        <TaskFilters :addTask="()=>openTaskModal(null)" />
        <Table
            :isLoading="isLoading"
            :tableData="tableData"
            :headers="headers"
            :currentPage="1"
            :totalCount="50"
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
                    {{ formatDate((row as ITask).dueDate) }}
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
                                onClick: () => (deleteId = (row as ITask).id),
                            },
                        ]"
                    />
                </td>
            </template>
        </Table>
    </section>
</template>
