<script setup lang="ts">
import SelectField from "../../../components/form/SelectField.vue";
import { useURLQuery } from "../../../composables/useURLQuery";
import { ref } from "vue";
import { TaskPriorityEnum, TaskStatusEnum } from "../../../enums/task.enum";
import Button from "../../../components/Button.vue";

interface Props {
    addTask: () => void;
}

const { addTask } = defineProps<Props>();

const { value, setURLQuery } = useURLQuery();

const statusOptions = ref(
    Object.values(TaskStatusEnum).map((val) => {
        return { key: val, label: val };
    })
);
const priorityOptions = ref(
    Object.values(TaskPriorityEnum).map((val) => {
        return { key: val, label: val };
    })
);
const sortByOptions = ref(
    ["Ascending", "Descending"].map((val) => {
        return { key: val, label: val };
    })
);

const clearFilter = () => { 
    setURLQuery({
        status:null,
        priority:null,
        sortBy:null
    })
 }
</script>

<template>
    <div class="flex mb-5 sm:justify-end">
        <div class="grid w-full grid-cols-2 sm:grid-cols-5 gap-4">
            <SelectField
                name="status"
                :options="statusOptions"
                v-model="value.status as string"
                :onChange="(val) => setURLQuery({ status: val as string })"
                placeholder="Select status"
            />

            <SelectField
                name="priority"
                :options="priorityOptions"
                v-model="value.priority as string"
                :onChange="(val) => setURLQuery({ priority: val as string })"
                placeholder="Select priority"
            />

            <SelectField
                name="sortBy"
                :options="sortByOptions"
                v-model="value.sortBy as string"
                :onChange="(val) => setURLQuery({ sortBy: val as string })"
                placeholder="Sort By"
            />

            <Button :buttonText="'Add Task'" :onClick="addTask" />
            <Button :buttonText="'Reset Filter'" variant="secondary" :onClick="clearFilter" />
        </div>
    </div>
</template>

<style scoped></style>
