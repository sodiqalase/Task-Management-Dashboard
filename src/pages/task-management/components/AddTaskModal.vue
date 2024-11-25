<script setup lang="ts">
import Button from "../../../components/Button.vue";
import CenterModal from "../../../components/modal/CenterModal.vue";

interface Props {
    onClose: () => void;
    data: ITask|null
}
import { ref, reactive, watch, computed } from "vue";


import InputField from "../../../components/form/InputField.vue";
import DateField from "../../../components/form/DateField.vue";
import SelectField from "../../../components/form/SelectField.vue";
import { TaskPriorityEnum, TaskStatusEnum } from "../../../enums/task.enum";
import TextAreaField from "../../../components/form/TextAreaField.vue";
import { ITask } from "../../../interface/task.interface";

const { onClose,data } = defineProps<Props>();

const formData = reactive({
    title: data?.title?? "",
    description: data?.description?? "",
    dueDate:data?.dueDate?? "",
    status: data?.status??"",
    priority:data?.priority??""
});


const formState = reactive({
    errors: {
        title: "",
        description: "",
        dueDate: "",
        status: "",
        priority:""
    },
    touched: {
        title: false,
        description: false,
        dueDate: false,
        status: false,
        priority:false
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
    } else if (field === "dueDate") {
        formState.errors.dueDate = formData.dueDate.trim()
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
        console.log(formData,'formData');
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

const isInValid = computed(() => Object.values(formData).some((val) => !val?.trim()))


const handleSubmit = () => {
   
    Object.keys(formData).forEach((field) => {
        formState.touched[field as keyof typeof formData] = true;
        validateField(field as keyof typeof formData);
    });

   
    const hasErrors = Object.values(formData).some((val) => !val?.trim());
    if (!hasErrors) {
        console.log("Form submitted:", formData);
    } else {
        console.log("Validation errors:", formState.errors);
    }
};


const statusOptions = ref(Object.values(TaskStatusEnum).map((val) => { 
    return {key:val,label:val}
 }));
const priorityOptions = ref(Object.values(TaskPriorityEnum).map((val) => { 
    return {key:val,label:val}
 }));


const onSubmit = (values: any) => {
    console.log("Form submitted with:", values);
};


</script>

<template>
    <CenterModal :onClose="onClose">
        <form
                 @submit.prevent="handleSubmit"
        className="sm:w-[500px] w-full">
            <div className="py-5">
                <h6
                    className="font-semibold text-centertext-[24px] text-center text-dbGray"
                >
                    {{data?'Edit':'Add'}} Task
                </h6>
                <div
                    class="flex flex-col gap-y-4 mt-3"
           
                >
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
                        id="dueDate"
                        label="Due Date"
                        v-model="formData.dueDate"
                        :error="
                            formState.touched.dueDate
                                ? formState.errors.dueDate
                                : ''
                        "
                        placeholder="Enter Date"
                        :onBlur="() => handleBlur('dueDate')"
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

            <div
                className="grid grid-cols-2 gap-x-4 mt-2"
            >
                <Button
                    :buttonText="'Cancel'"
                    variant="secondary"
                    :onClick="() => {}"
                />
                <Button
                :disabled="isInValid"
                type="submit"
                :buttonText="'Submit'" :onClick="() => {}" />
            </div>
        </form>
    </CenterModal>
</template>


