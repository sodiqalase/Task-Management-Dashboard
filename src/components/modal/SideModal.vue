<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";

interface Props {
  onClose:()=>void
}

const {onClose}= defineProps<Props>();
</script>

<template>
    <div
        class="h-screen w-screen fixed top-0 bottom-0 right-0 left-0 z-[1000] bg-[#00000090] backdrop-blur-sm"
    >
        <div
            className="h-dvh overflow-hidden p-4 sm:p-6 flex flex-col bg-white w-full sm:w-[530px] absolute right-0"
        >
        <div class="flex justify-end">
            <XMarkIcon @click="onClose" class="w-5 cursor-pointer"/>
        </div>
        <div class="h-full flex-1 overflow-hidden flex flex-col">
            <div class="flex h-full flex-col flex-1 overflow-auto">
                <slot name="body"></slot>
            </div>
        </div>
        <slot name="footer"></slot>
          
        </div>
    </div>
</template>
