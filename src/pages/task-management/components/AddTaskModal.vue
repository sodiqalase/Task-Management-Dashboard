<script setup lang="ts">
import Button from "../../../components/Button.vue";
import CenterModal from "../../../components/modal/CenterModal.vue";

interface Props {
    onClose: () => void;
    data: ITask | null;
}

import { ref, reactive, watch, computed } from "vue";

import InputField from "../../../components/form/InputField.vue";
import DateField from "../../../components/form/DateField.vue";
import SelectField from "../../../components/form/SelectField.vue";
import { TaskPriorityEnum, TaskStatusEnum } from "../../../enums/task.enum";
import TextAreaField from "../../../components/form/TextAreaField.vue";
import { ITask } from "../../../interface/task.interface";
import { TaskService } from "../../../services/task.service";
import dayjs from "dayjs";

const { onClose, data } = defineProps<Props>();

const { isLoading, makeRequest } = TaskService.createTask();
const { isLoading:editLoading, makeRequest:editRequest } = TaskService.editTask();

const formData = reactive({
    title: data?.title ?? "",
    description: data?.description ?? "",
    due_date: data?.due_date ?? "",
    status: data?.status ?? "",
    priority: data?.priority ?? "",
});

const formState = reactive({
    errors: {
        title: "",
        description: "",
        due_date: "",
        status: "",
        priority: "",
    },
    touched: {
        title: false,
        description: false,
        due_date: false,
        status: false,
        priority: false,
    },
});

const validateField = (field: keyof typeof formData) => {
    if (field === "title") {
        formState.errors.title = formData.title.trim()
            ? ""
            : "Title is required.";
    } else if (field === "description") {
        formState.errors.description = formData.description.trim()
            ? ""
            : "Description is required.";
    } else if (field === "due_date") {
        formState.errors.due_date = formData.due_date.trim()
            ? ""
            : "Due date is required.";
    } else if (field === "status") {
        formState.errors.status = formData.status.trim()
            ? ""
            : "Status is required.";
    } else if (field === "priority") {
        formState.errors.priority = formData.priority.trim()
            ? ""
            : "Priority is required.";
    }
};

watch(
    () => formData,
    () => {
        Object.keys(formData).forEach((field) => {
            const fieldName = field as keyof typeof formData;
            if (formState.touched[fieldName]) {
                validateField(fieldName);
            }
        });
    },
    { deep: true }
);

const handleBlur = (field: keyof typeof formData) => {
    formState.touched[field] = true;
    validateField(field);
};

const isInValid = computed(() =>
    Object.values(formData).some((val) => !val?.trim())
);

const handleSubmit = () => {
    const {due_date,...rest}= formData;
    const payload = {
        ...rest,
        due_date: dayjs(formData.due_date).toISOString()
    }

    if(!data){
        makeRequest(payload).then(() => { 
        onClose()
     })
    }else {
        editRequest(payload,{},{taskId: data._id}).then(() => { 
        onClose()
     })
    }
    
    
};

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

// const onSubmit = (values: TaskPayload) => {
//     makeRequest(values)
// };
</script>

<template>
    <CenterModal :onClose="onClose">
        <form @submit.prevent="handleSubmit" className="sm:w-[500px] w-full">
            <div className="py-5">
                <h6
                    className="font-semibold text-centertext-[24px] text-center text-dbGray"
                >
                    {{ data ? "Edit" : "Add" }} Task
                </h6>
                <div class="flex flex-col gap-y-4 mt-3">
                    <InputField
                        id="title"
                        label="Title"
                        v-model="formData.title"
                        :error="
                            formState.touched.title
                                ? formState.errors.title
                                : ''
                        "
                        placeholder="Enter title"
                        :onBlur="() => handleBlur('title')"
                    />

                    <TextAreaField
                        id="description"
                        label="Description"
                        v-model="formData.description"
                        :error="
                            formState.touched.description
                                ? formState.errors.description
                                : ''
                        "
                        placeholder="Enter description"
                        :onBlur="() => handleBlur('description')"
                    />

                    <DateField
                        id="due_date"
                        label="Due Date"
                        v-model="formData.due_date"
                        :error="
                            formState.touched.due_date
                                ? formState.errors.due_date
                                : ''
                        "
                        placeholder="Enter Date"
                        :onBlur="() => handleBlur('due_date')"
                    />

                    <SelectField
                        name="status"
                        :options="statusOptions"
                        label="Status"
                        v-model="formData.status"
                        :error="
                            formState.touched.status
                                ? formState.errors.status
                                : ''
                        "
                        placeholder="Choose status"
                        :onBlur="() => handleBlur('status')"
                    />
                    <SelectField
                        name="priority"
                        :options="priorityOptions"
                        label="Priority"
                        v-model="formData.priority"
                        :error="
                            formState.touched.priority
                                ? formState.errors.priority
                                : ''
                        "
                        placeholder="Choose priority"
                        :onBlur="() => handleBlur('priority')"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 mt-2">
                <Button
                    :buttonText="'Cancel'"
                    variant="secondary"
                    :onClick="onClose"
                />
                <Button
                    :disabled="isInValid || isLoading|| editLoading"
                    :loading="isLoading||editLoading"
                    type="submit"
                    :buttonText="'Submit'"
                    :onClick="() => {}"
                />
            </div>
        </form>
    </CenterModal>
</template>
