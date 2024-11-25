<script setup lang="ts">
import Button from "../../../components/Button.vue";
import CenterModal from "../../../components/modal/CenterModal.vue";

interface Props {
    onClose: () => void;
}

import { ref, watch } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

// Custom components
import InputField from "../../../components/form/InputField.vue";
// import CustomSelect from './CustomSelect.vue';

// Define validation schema
const schema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    status: yup.string().required("Status is required"),
});

// Options for the status select
const statusOptions = ref([
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
]);

// Initialize the form
const { handleSubmit, values, errors, } = useForm({
    validationSchema: schema,
    initialValues: {
        title: "",
        description: "",
        status: null,
    },
});

// Form submission handler
const onSubmit = (values: any) => {
    console.log("Form submitted with:", values);
}

watch(errors, (newErrors) => {
    console.log("Errors updated:", newErrors);
});

watch(values, (newValues) => {
    console.log("Values updated:", newValues);
});

const { onClose } = defineProps<Props>();
</script>

<template>
    <CenterModal :onClose="onClose">
        <section className="sm:w-[500px] w-full">
            <div className="p-5 text-center">
                <h6 className="font-semibold text-[24px] text-blueGray">
                    Add Task
                </h6>
                <form @submit.prevent="handleSubmit(onSubmit)">
                    <InputField
                        v-model="values.title"
                        id="'title'"
                        label="Title"
                        placeholder="Enter title"
                        :error="
                            errors.title
                        "
                  
                    />

                    <InputField
                        v-model="values.description"
                        label="Description"
                        placeholder="Enter description"
                        :error="
                            errors.description
                                ? errors.description
                                : ''
                        "
                    
                    />

                    <!-- <CustomSelect
      v-model="values.status"
      :options="statusOptions"
      label="Status"
      placeholder="Select status"
      :error="errors.status && touched.status ? errors.status : ''"
      @blur="setFieldTouched('status')"
    /> -->

                    <button type="submit">Submit</button>
                </form>
            </div>

            <div
                className="border-t border-lightGray grid grid-cols-2 gap-x-4 p-5"
            >
                <Button
                    :buttonText="'Cancel'"
                    variant="secondary"
                    :onClick="() => {}"
                />
                <Button :buttonText="'Create Task'" :onClick="() => {}" />
            </div>
        </section>
    </CenterModal>
</template>

<style scoped></style>
