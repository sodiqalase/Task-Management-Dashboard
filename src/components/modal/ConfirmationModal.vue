<script setup lang="ts">
import { TaskService } from "../../services/task.service";
import Button from "../Button.vue";
import CenterModal from "./CenterModal.vue";



interface Props {
    onClose: () => void;
    id:string|null
}

const {isLoading,makeRequest}= TaskService.deleteTask()

const { onClose,id } = defineProps<Props>();

const deleteTask = () => { 
    makeRequest({},{},{taskId:id}).then(() =>{
        onClose();
    })
 }
</script>

<template>
    <CenterModal :onClose="onClose" >
            <section className="sm:w-[400px] w-full">
                <div className="p-5 text-center">
                    <h6 className="font-semibold text-[24px] text-red-500">
                        Delete Task??
                    </h6>
                    <p className="my-3 font-medium text-blueGray">
                       Are you sure you want to delete this task? This action is irreversible.
                    </p>
                </div>

                <div className="border-t border-lightGray grid grid-cols-2 gap-x-4 py-5">
                    <Button
                    :buttonText="'Cancel'"
                    variant="secondary"
                    :disabled="isLoading"
                    :onClick="onClose"
                    />
                    <Button
                    :style="'!bg-red-500'"
                    :disabled="isLoading"
                    :loading="isLoading"
                    :buttonText="'Proceed'"
                    :onClick="deleteTask"
                    />
                </div>
            </section>
        </CenterModal>
</template>

<style scoped></style>
