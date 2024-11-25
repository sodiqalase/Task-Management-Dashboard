<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";

interface Props {
    onClose: () => void;
}

const { onClose } = defineProps<Props>();
</script>

<template>
    <div
        class="h-screen w-[100%] fixed top-0 left-0 z-50 bg-[#00000090] flex justify-center mb-20 overflow-y-auto backdrop-blur-sm"
    >
        <div class="absolute sm:px-0 px-5 top-[10%] mx-auto pb-20">
            <div
                className="bg-white relative rounded-[20px] p-4 sm:min-w-[395px] min-w-auto sm:w-auto w-[92vw]"
            >
                <div class="flex justify-end">
                    <XMarkIcon @click="onClose" class="w-5 cursor-pointer" />
                </div>

                <div class="sm:px-5 px-2 pt-4 pb-8">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
