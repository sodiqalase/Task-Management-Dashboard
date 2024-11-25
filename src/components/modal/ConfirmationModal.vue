<script setup lang="ts">
import Button from "../Button.vue";
import CenterModal from "./CenterModal.vue";



interface Props {
    onClose: () => void;
    id:number|null
}

const { onClose,id } = defineProps<Props>();
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

                <div className="border-t border-lightGray grid grid-cols-2 gap-x-4 p-5">
                    <Button
                    :buttonText="'Cancel'"
                    variant="secondary"
                    :onClick="()=>{}"
                    />
                    <Button
                    :style="'!bg-red-500'"
                    :buttonText="'Proceed'"
                    :onClick="()=>{}"
                    />
                </div>
            </section>
        </CenterModal>
</template>

<style scoped></style>
